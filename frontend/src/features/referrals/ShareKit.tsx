import { useEffect, useRef, useState } from "react";
import { MyReferralSummary } from "../../types/api";
import {
  AMBASSADOR_VIDEOS,
  AmbassadorVideo,
  buildCaption,
  CaptionContext,
  CaptionPlatform,
  posterUrl,
  videoDownloadUrl,
  videoUrl,
} from "./ambassadorVideos";
import {
  canvasToPngBlob,
  drawShareCard,
  loadShareCardFonts,
  SHARE_CARD_SIZE,
  shareCardFilename,
  ShareCardDesign,
  ShareCardFormat,
} from "./shareCard";

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function captionContext(summary: MyReferralSummary): CaptionContext {
  return {
    code: summary.code,
    shareUrl: summary.shareUrl,
    welcomeBonus: formatNgn(summary.welcomeBonusNgn),
    referrerReward: formatNgn(summary.rewardPerReferralNgn),
  };
}

// The phone's own share sheet (WhatsApp, Status, Instagram...) with the file attached.
// Desktop browsers mostly can't share files, so callers fall back to download + copy.
function canShareFiles(): boolean {
  if (typeof navigator === "undefined" || typeof navigator.canShare !== "function") return false;
  try {
    return navigator.canShare({ files: [new File([""], "probe.png", { type: "image/png" })] });
  } catch {
    return false;
  }
}

// The browser's share sheet only helps on a phone. On a Mac or PC it lists the computer's
// own apps (AirDrop, Messages, Notes...), not WhatsApp, Facebook or Instagram (reported
// 2026-10-05), so computers get the per-platform buttons below instead.
function isPhone(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches === true;
}

function canUseShareSheet(): boolean {
  return isPhone() && canShareFiles();
}

type ShareOutcome = "shared" | "cancelled" | "needs-tap" | "unsupported";

async function shareFile(file: File, text: string): Promise<ShareOutcome> {
  if (!canShareFiles() || !navigator.canShare({ files: [file] })) return "unsupported";
  try {
    await navigator.share({ files: [file], text });
    return "shared";
  } catch (err) {
    const name = (err as DOMException)?.name;
    if (name === "AbortError") return "cancelled";
    // The tap "expires" if preparing the file took a few seconds; a second tap works.
    if (name === "NotAllowedError") return "needs-tap";
    return "unsupported";
  }
}

function saveBlob(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-gray-900">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                selected
                  ? "border-blue-500 bg-blue-50 font-medium text-blue-800 ring-1 ring-blue-500"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// Shown above the buttons because people expect the file to arrive already attached, and
// from a website it can't (raised by the owner 2026-10-05).
function HowToShare({ media }: { media: "image" | "video" }) {
  const phone = canUseShareSheet();
  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
      <p className="font-semibold">How the share buttons work</p>
      <ol className="mt-1 list-decimal space-y-0.5 pl-4">
        <li>Tap WhatsApp, Facebook, Instagram, LinkedIn or X. Your {media} saves to your device and the app opens with your message.</li>
        <li>In the app, attach the saved {media} (look in Downloads, or Photos/Gallery on a phone).</li>
        <li>For Facebook, LinkedIn and Instagram, paste the message too: it&apos;s already copied.</li>
      </ol>
      <p className="mt-1">
        Social apps don&apos;t let websites attach files for you.{" "}
        {phone
          ? `To skip step 2, use “Share to Status & other apps”: it attaches the ${media} for you.`
          : `On your phone, “Share to Status & other apps” attaches the ${media} for you.`}
      </p>
    </div>
  );
}

interface PlatformTexts {
  whatsapp: string; // also used for Facebook and LinkedIn, which only take a link
  instagram: string;
  short: string; // X
}

// Websites can't attach an image or video to a WhatsApp, Facebook, LinkedIn or X post, and
// Instagram has no web share link at all. So each button saves the file, copies the
// caption where the platform can't take text, and opens the platform: the ambassador then
// attaches the saved file.
function PlatformButtons({
  texts,
  shareUrl,
  media,
  onSave,
  onNote,
  disabled = false,
}: {
  texts: PlatformTexts;
  shareUrl: string;
  media: "image" | "video";
  onSave: () => void;
  onNote: (note: string) => void;
  disabled?: boolean;
}) {
  const Media = media === "image" ? "Image" : "Video";
  const url = encodeURIComponent(shareUrl);
  const link = "rounded-md px-3 py-1.5 text-sm font-medium text-white";
  const off = disabled ? "pointer-events-none opacity-50" : "";

  function opened(platform: string, captionCopied: boolean) {
    onSave();
    onNote(
      captionCopied
        ? `${Media} saved and caption copied. In ${platform}, add the ${media} and paste the caption.`
        : `${Media} saved. Attach it to your ${platform} message; the caption is already filled in.`,
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(texts.whatsapp)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => opened("WhatsApp", false)}
        className={`${link} ${off} bg-green-600 hover:bg-green-700`}
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          void copyText(texts.whatsapp);
          opened("Facebook", true);
        }}
        className={`${link} ${off} bg-[#1877F2] hover:bg-[#1462c8]`}
      >
        Facebook
      </a>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          void copyText(texts.instagram);
          onSave();
          onNote(
            `${Media} saved and caption copied. Instagram can't be opened from a website: open the Instagram app, add the ${media} and paste the caption.`,
          );
        }}
        className={`${link} bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 disabled:opacity-50`}
      >
        Instagram
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          void copyText(texts.whatsapp);
          opened("LinkedIn", true);
        }}
        className={`${link} ${off} bg-[#0A66C2] hover:bg-[#08528f]`}
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(texts.short)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => opened("X", false)}
        className={`${link} ${off} bg-gray-900 hover:bg-black`}
      >
        X
      </a>
    </div>
  );
}

/* --------------------------------- share cards -------------------------------- */

const CARD_DESIGNS: { value: ShareCardDesign; label: string }[] = [
  { value: "friend", label: "Airtime for your friend" },
  { value: "cyber-security-fundamentals", label: "Cyber Security" },
  { value: "gis-and-drone-mapping", label: "GIS & Drone Mapping" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "hse-fundamentals", label: "HSE" },
];

const CARD_FORMATS: { value: ShareCardFormat; label: string }[] = [
  { value: "status", label: "WhatsApp Status / Story (tall)" },
  { value: "square", label: "Chats and feed posts (square)" },
];

export function ShareCardMaker({ summary, firstName }: { summary: MyReferralSummary; firstName: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [design, setDesign] = useState<ShareCardDesign>("friend");
  const [format, setFormat] = useState<ShareCardFormat>("status");
  const [showName, setShowName] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const input = {
    design,
    format,
    firstName: showName ? firstName?.trim() || null : null,
    code: summary.code,
    welcomeBonus: formatNgn(summary.welcomeBonusNgn),
  };
  const shareText = `Use my code ${summary.code} when you sign up and you'll get ${input.welcomeBonus} airtime once your first course payment is confirmed. First lesson free: ${summary.shareUrl}`;
  const platformTexts: PlatformTexts = {
    whatsapp: shareText,
    instagram: `Use my code ${summary.code} when you sign up at paleontraining.com/register and you'll get ${input.welcomeBonus} airtime once your first course payment is confirmed. First lesson free.`,
    short: `${input.welcomeBonus} airtime for you when you join with my code ${summary.code} and pay for your first course. First lesson free 👉 ${summary.shareUrl}`,
  };
  const phone = canUseShareSheet();

  useEffect(() => {
    let cancelled = false;
    loadShareCardFonts()
      .catch(() => undefined) // falls back to system fonts rather than showing nothing
      .then(() => !cancelled && setFontsLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded && canvasRef.current) drawShareCard(canvasRef.current, input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontsLoaded, design, format, showName, summary.code]);

  async function share() {
    if (!canvasRef.current) return;
    setBusy(true);
    setMessage(null);
    try {
      const blob = await canvasToPngBlob(canvasRef.current);
      const file = new File([blob], shareCardFilename(input), { type: "image/png" });
      await copyText(shareText);
      const outcome = await shareFile(file, shareText);
      if (outcome === "unsupported") {
        saveBlob(blob, file.name);
        setMessage("Image saved and your message copied. Post the image, then paste the message with it.");
      } else if (outcome === "needs-tap") {
        setMessage("Tap Share again to open your apps.");
      } else if (outcome === "shared") {
        setMessage("Shared. Your message is also copied, in case the app dropped it.");
      }
    } catch {
      setMessage("That didn't work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function download() {
    if (!canvasRef.current) return;
    const blob = await canvasToPngBlob(canvasRef.current);
    saveBlob(blob, shareCardFilename(input));
  }

  async function copyMessage() {
    setMessage((await copyText(shareText)) ? "Message copied. Paste it with the image." : null);
  }

  const { width, height } = SHARE_CARD_SIZE[format];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">Share cards</h2>
      <p className="mt-1 text-sm text-gray-600">
        Images with your code on them, for your WhatsApp Status, chats and social feeds. The first card leads with
        what your friend gets, which people are far more likely to pass on.
      </p>

      <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <Chips label="Card" options={CARD_DESIGNS} value={design} onChange={setDesign} />
          <Chips label="Size" options={CARD_FORMATS} value={format} onChange={setFormat} />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showName}
              onChange={(e) => setShowName(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Show my first name on the card
          </label>

          <HowToShare media="image" />
          <PlatformButtons
            texts={platformTexts}
            shareUrl={summary.shareUrl}
            media="image"
            onSave={download}
            onNote={setMessage}
            disabled={!fontsLoaded}
          />
          <div className="flex flex-wrap gap-2">
            {phone && (
              <button
                type="button"
                onClick={share}
                disabled={!fontsLoaded || busy}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? "Preparing…" : "Share to Status & other apps"}
              </button>
            )}
            <button
              type="button"
              onClick={download}
              disabled={!fontsLoaded}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download image
            </button>
            <button
              type="button"
              onClick={copyMessage}
              className="rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
            >
              Copy message
            </button>
          </div>
          {message && <p className="text-sm text-blue-800">{message}</p>}
        </div>

        <div className="flex justify-center md:block">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            aria-label="Preview of your share card"
            className="h-auto rounded-lg border border-gray-200 shadow-sm"
            style={{ width: format === "status" ? 225 : 300 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- video pack --------------------------------- */

const CAPTION_PLATFORMS: { value: CaptionPlatform; label: string }[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "short", label: "TikTok & X" },
];

const INITIAL_VIDEOS = 4;

export function VideoPack({ summary }: { summary: MyReferralSummary }) {
  const [platform, setPlatform] = useState<CaptionPlatform>("whatsapp");
  const [showAll, setShowAll] = useState(false);
  const ctx = captionContext(summary);
  const videos = showAll ? AMBASSADOR_VIDEOS : AMBASSADOR_VIDEOS.slice(0, INITIAL_VIDEOS);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">Video pack</h2>
      <p className="mt-1 text-sm text-gray-600">
        Ten short Paleon videos made for WhatsApp Status, Reels and TikTok, each with a caption that already has
        your code <strong>{summary.code}</strong> and your link.
      </p>

      <div className="mt-4">
        <Chips label="Caption for" options={CAPTION_PLATFORMS} value={platform} onChange={setPlatform} />
      </div>

      <div className="mt-4">
        <HowToShare media="video" />
      </div>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {videos.map((video) => (
          <VideoCard
            key={video.file}
            video={video}
            caption={buildCaption(video, platform, ctx)}
            texts={{
              whatsapp: buildCaption(video, "whatsapp", ctx),
              instagram: buildCaption(video, "instagram", ctx),
              short: buildCaption(video, "short", ctx),
            }}
            shareUrl={summary.shareUrl}
          />
        ))}
      </ul>

      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Show all {AMBASSADOR_VIDEOS.length} videos
        </button>
      )}

      <p className="mt-3 text-xs text-gray-500">
        Post one a day for the best reach. WhatsApp Status keeps videos up to a minute, so these fit whole.
      </p>
    </div>
  );
}

function VideoCard({
  video,
  caption,
  texts,
  shareUrl,
}: {
  video: AmbassadorVideo;
  caption: string;
  texts: PlatformTexts;
  shareUrl: string;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const fileRef = useRef<File | null>(null);
  const shareable = canUseShareSheet();

  function saveVideo() {
    const link = document.createElement("a");
    link.href = videoDownloadUrl(video);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function copyCaption() {
    if (await copyText(caption)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  async function share() {
    setBusy(true);
    setNote(null);
    try {
      await copyText(caption);
      if (!fileRef.current) {
        const res = await fetch(videoUrl(video));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        fileRef.current = new File([blob], `paleon-${video.file}.mp4`, { type: "video/mp4" });
      }
      const outcome = await shareFile(fileRef.current, caption);
      if (outcome === "needs-tap") setNote("Video ready. Tap Share again to open your apps.");
      else if (outcome === "unsupported") setNote("Sharing isn't available here. Use Download, then post it.");
      else if (outcome === "shared") setNote("Shared. The caption is also copied, in case the app dropped it.");
    } catch {
      setNote("Couldn't load the video. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="flex flex-col rounded-lg border border-gray-200 bg-white p-3">
      <video
        src={videoUrl(video)}
        poster={posterUrl(video)}
        controls
        playsInline
        preload="none"
        className="mx-auto aspect-[9/16] w-full max-w-[220px] rounded-md bg-gray-900"
      />
      <p className="mt-3 font-medium text-gray-900">{video.title}</p>
      <p className="text-xs text-gray-500">{video.course}</p>
      <textarea
        readOnly
        value={caption}
        rows={6}
        aria-label={`Caption for ${video.title}`}
        className="mt-2 w-full flex-1 resize-none rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-700"
      />
      <div className="mt-2">
        <PlatformButtons texts={texts} shareUrl={shareUrl} media="video" onSave={saveVideo} onNote={setNote} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {shareable && (
          <button
            type="button"
            onClick={share}
            disabled={busy}
            className="rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
          >
            {busy ? "Preparing…" : "Share to Status & other apps"}
          </button>
        )}
        <button
          type="button"
          onClick={copyCaption}
          className="rounded-md border border-blue-300 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          {copied ? "Copied!" : "Copy caption"}
        </button>
        <a
          href={videoDownloadUrl(video)}
          className="rounded-md border border-blue-300 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
        >
          Download video
        </a>
      </div>
      {note && <p className="mt-2 text-xs text-blue-800">{note}</p>}
    </li>
  );
}
