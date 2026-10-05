// Personalised ambassador videos for /refer/me: a Paleon promo video whose last 3 seconds
// (the end card) carry the ambassador's own name and referral code.
//
// Only the end card is encoded per request. The stock video was encoded with a keyframe
// exactly where its end card starts (backend/scripts/ambassador-videos/build.py), so its
// first part is joined to the new end card with a stream copy: about a second of work on
// the server, not a full re-encode. Results are cached in the temp dir.
//
// The name and code come from the user record, never the request, so nobody can put
// arbitrary text on a Paleon-branded video.

import { spawn } from "child_process";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { REFEREE_REWARD_NGN } from "../constants/referral";
import { User } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { ensureReferralCode } from "./referral.service";

const VIDEO_DIR = path.join(__dirname, "..", "marketing", "videos", "ambassador");
const FONT_DIR = path.join(__dirname, "..", "marketing", "fonts", "pdf");
const CACHE_DIR = path.join(os.tmpdir(), "paleon-ambassador-videos");
const CACHE_MAX_FILES = 200; // ~2.5MB each
const FFMPEG_TIMEOUT_MS = 60_000;
// Bump when the end-card text or layout changes, so cached videos aren't reused.
const TEMPLATE_VERSION = 1;

// Must match ENCODE in build.py: a mismatch makes the joined file glitch at the cut.
// No B-frames (-bf 0), so timestamps stay in order across the join.
const ENCODE = [
  "-c:v", "libx264", "-preset", "medium", "-crf", "27", "-profile:v", "high", "-bf", "0", "-pix_fmt", "yuv420p",
  "-r", "30", "-video_track_timescale", "15360",
  "-c:a", "aac", "-b:a", "96k", "-ar", "44100", "-ac", "2",
];

interface Slot {
  y: number;
  size: number;
  color: string;
  font: string;
}

interface Manifest {
  version: number;
  endCardSeconds: number;
  slots: { name: Slot; code: Slot; reward: Slot };
  videos: Record<string, { endStart: number }>;
}

let manifest: Manifest | null = null;

function getManifest(): Manifest {
  if (!manifest) {
    manifest = JSON.parse(fs.readFileSync(path.join(VIDEO_DIR, "manifest.json"), "utf8")) as Manifest;
  }
  return manifest;
}

export function isAmbassadorVideo(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(getManifest().videos, slug);
}

export interface EndCardText {
  code: string;
  firstName: string | null;
  welcomeBonusNgn: number;
}

function naira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

// Names go through drawtext's textfile (expansion off), so no escaping is needed; this
// only keeps a very long name from running off the card.
function displayName(firstName: string | null): string | null {
  const name = firstName?.trim().replace(/\s+/g, " ") ?? "";
  if (!name) return null;
  return name.length > 24 ? `${name.slice(0, 23)}…` : name;
}

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.env.FFMPEG_PATH || "ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args]);
    let stderr = "";
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    const timer = setTimeout(() => child.kill("SIGKILL"), FFMPEG_TIMEOUT_MS);
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with ${code}: ${stderr.slice(-500)}`));
    });
  });
}

// One encode at a time: the Render instance is small, and a burst of ambassadors
// tapping Share shouldn't starve the API.
let queue: Promise<unknown> = Promise.resolve();
function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = queue.then(job, job);
  queue = run.catch(() => undefined);
  return run;
}

const inFlight = new Map<string, Promise<string>>();

function pruneCache(): void {
  try {
    const files = fs
      .readdirSync(CACHE_DIR)
      .filter((f) => f.endsWith(".mp4"))
      .map((f) => ({ f, t: fs.statSync(path.join(CACHE_DIR, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);
    for (const { f } of files.slice(CACHE_MAX_FILES)) fs.rmSync(path.join(CACHE_DIR, f), { force: true });
  } catch (err) {
    logger.warn("ambassador video cache prune failed", { error: (err as Error).message });
  }
}

async function render(slug: string, text: EndCardText, outPath: string): Promise<void> {
  const m = getManifest();
  const { endStart } = m.videos[slug];
  const work = fs.mkdtempSync(path.join(os.tmpdir(), "paleon-endcard-"));
  try {
    const lines: { slot: Slot; value: string }[] = [
      { slot: m.slots.code, value: text.code },
      { slot: m.slots.reward, value: `${naira(text.welcomeBonusNgn)} airtime for you` },
    ];
    const name = displayName(text.firstName);
    if (name) lines.push({ slot: m.slots.name, value: `Recommended by ${name}` });

    const filters = lines.map(({ slot, value }, i) => {
      const file = path.join(work, `line${i}.txt`);
      fs.writeFileSync(file, value, "utf8");
      return [
        `drawtext=fontfile=${path.join(FONT_DIR, slot.font)}`,
        `textfile=${file}`,
        "expansion=none",
        `fontsize=${slot.size}`,
        `fontcolor=${slot.color}`,
        "x=(w-text_w)/2",
        `y=${slot.y}`,
      ].join(":");
    });
    filters.push("fade=t=in:st=0:d=0.4", "format=yuv420p");

    const endPath = path.join(work, "end.mp4");
    await runFfmpeg([
      "-loop", "1", "-framerate", "30", "-t", String(m.endCardSeconds), "-i", path.join(VIDEO_DIR, `${slug}-end.png`),
      "-f", "lavfi", "-t", String(m.endCardSeconds), "-i", "anullsrc=r=44100:cl=stereo",
      "-vf", filters.join(","),
      ...ENCODE,
      "-shortest",
      endPath,
    ]);

    const listPath = path.join(work, "list.txt");
    fs.writeFileSync(
      listPath,
      [`file '${path.join(VIDEO_DIR, `${slug}.mp4`)}'`, `outpoint ${endStart.toFixed(4)}`, `file '${endPath}'`, ""].join("\n"),
    );
    const partial = `${outPath}.part.mp4`;
    await runFfmpeg(["-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", "-movflags", "+faststart", partial]);
    fs.renameSync(partial, outPath);
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
}

// Returns the path of the personalised mp4, rendering it on first request.
export async function getPersonalisedVideo(slug: string, text: EndCardText): Promise<string> {
  if (!isAmbassadorVideo(slug)) throw ApiError.notFound("Video not found");
  const key = crypto
    .createHash("sha256")
    .update(JSON.stringify([TEMPLATE_VERSION, getManifest().version, slug, text.code, displayName(text.firstName), text.welcomeBonusNgn]))
    .digest("hex")
    .slice(0, 20);
  const outPath = path.join(CACHE_DIR, `${slug}-${key}.mp4`);
  if (fs.existsSync(outPath)) {
    const now = new Date();
    fs.utimesSync(outPath, now, now);
    return outPath;
  }
  const pending = inFlight.get(key);
  if (pending) return pending;

  const job = enqueue(async () => {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    if (!fs.existsSync(outPath)) await render(slug, text, outPath);
    pruneCache();
    return outPath;
  })
    .catch((err: Error) => {
      logger.error("personalised ambassador video failed", { slug, error: err.message });
      throw new ApiError(503, "We couldn't add your name and code to this video right now. Please try again.");
    })
    .finally(() => inFlight.delete(key));
  inFlight.set(key, job);
  return job;
}

export async function getPersonalisedVideoForUser(
  userId: string,
  slug: string,
  showName: boolean,
): Promise<{ filePath: string; filename: string }> {
  if (!isAmbassadorVideo(slug)) throw ApiError.notFound("Video not found");
  const user = await User.findByPk(userId);
  if (!user) throw ApiError.notFound("User not found");
  const code = await ensureReferralCode(user);
  const filePath = await getPersonalisedVideo(slug, {
    code,
    firstName: showName ? user.firstName : null,
    welcomeBonusNgn: REFEREE_REWARD_NGN,
  });
  return { filePath, filename: `paleon-${slug}-${code}.mp4` };
}
