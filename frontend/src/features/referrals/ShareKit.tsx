import { useEffect, useRef, useState } from "react";
import { fetchPersonalisedVideo } from "../../api/referrals.api";
import { MyReferralSummary } from "../../types/api";
import {
  AMBASSADOR_VIDEOS,
  AmbassadorVideo,
  buildCaption,
  CaptionContext,
  CaptionPlatform,
  posterUrl,
  videoUrl,
} from "./ambassadorVideos";
import {
  cardShareLink,
  SHARE_CARD_SIZE,
  shareCardFilename,
  shareCardImageUrl,
  ShareCardDesign,
  ShareCardFormat,
  videoShareLink,
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

// Shown above the buttons so people know what to expect in each app.
function HowToShare({ media }: { media: "image" | "video" }) {
  const phone = canUseShareSheet();
  const what = media === "image" ? "your card" : "the video's picture";
  return (
    <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900">
      <p className="font-semibold">How sharing works</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-4">
        <li>
          <strong>WhatsApp, LinkedIn and X:</strong> the app opens with your message and your link. {what[0].toUpperCase() + what.slice(1)} shows up
          in the post by itself (give it a second to load). Press Send or Post.
        </li>
        <li>
          <strong>Facebook:</strong> opens with {what} in the post. Your message is copied, so paste it in, then press Post.
        </li>
        <li>
          <strong>Instagram:</strong>{" "}
          {phone
            ? `pick Instagram from the menu that opens; the ${media} is attached and your caption is copied to paste.`
            : `the ${media} saves to your computer, your caption is copied and Instagram opens. Click Create (+), choose the saved file and paste the caption.`}
        </li>
      </ul>
      {media === "video" && <p className="mt-1">Friends tap the picture to watch the video, then sign up with your code.</p>}
    </div>
  );
}

interface PlatformTexts {
  message: string; // WhatsApp, Facebook and LinkedIn; ends with the share link
  instagram: string; // Instagram captions can't hold a working link
  short: string; // X, ends with the share link
}

// WhatsApp, Facebook, LinkedIn and X get the share link, whose preview image is the card,
// so the picture is in the post without attaching anything (websites can't attach files
// to those apps). Instagram has no web share link and doesn't show link previews, so it
// gets the file itself: from the phone's share menu, or saved for instagram.com.
function PlatformButtons({
  texts,
  link,
  media,
  getFile,
  onNote,
  disabled = false,
}: {
  texts: PlatformTexts;
  link: string;
  media: "image" | "video";
  getFile: () => Promise<File>;
  onNote: (note: string) => void;
  disabled?: boolean;
}) {
  const what = media === "image" ? "your card" : "the video's picture";
  const style = "rounded-md px-3 py-1.5 text-sm font-medium text-white";
  const off = disabled ? "pointer-events-none opacity-50" : "";

  async function instagram() {
    await copyText(texts.instagram);
    if (canUseShareSheet()) {
      onNote(`Preparing your ${media}…`);
      try {
        const outcome = await shareFile(await getFile(), texts.instagram);
        if (outcome === "needs-tap") onNote(`Your ${media} is ready. Tap Instagram again and pick Instagram from the menu.`);
        else if (outcome === "shared") onNote("Shared. Your caption is copied: paste it if Instagram didn't keep it.");
        else if (outcome === "cancelled") onNote("");
        else onNote(`Sharing isn't available here. Use Download, then post it from the Instagram app.`);
      } catch {
        onNote(`Couldn't prepare the ${media}. Check your connection and try again.`);
      }
      return;
    }
    // Open Instagram straight away (a tab opened after a download is often blocked),
    // then save the file.
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    try {
      const file = await getFile();
      saveBlob(file, file.name);
      onNote(`${media === "image" ? "Image" : "Video"} saved and caption copied. On Instagram click Create (+), choose the saved file, then paste the caption.`);
    } catch {
      onNote(`Couldn't prepare the ${media}. Check your connection and try again.`);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(texts.message)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onNote(`WhatsApp is opening with your message. ${what[0].toUpperCase() + what.slice(1)} appears under the link after a second. Choose a chat or group and press Send.`)}
        className={`${style} ${off} bg-green-600 hover:bg-green-700`}
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          void copyText(texts.message);
          onNote(`Facebook is opening with ${what} in the post. Your message is copied: paste it in the post box, then press Post.`);
        }}
        className={`${style} ${off} bg-[#1877F2] hover:bg-[#1462c8]`}
      >
        Facebook
      </a>
      <button
        type="button"
        disabled={disabled}
        onClick={() => void instagram()}
        className={`${style} bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 disabled:opacity-50`}
      >
        Instagram
      </button>
      <a
        href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(texts.message)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          void copyText(texts.message);
          onNote(`LinkedIn is opening with your message and ${what}. Press Post. (If the text is missing, paste it: it's copied.)`);
        }}
        className={`${style} ${off} bg-[#0A66C2] hover:bg-[#08528f]`}
      >
        LinkedIn
      </a>
      <a
        href={`https://x.com/intent/post?text=${encodeURIComponent(texts.short)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onNote(`X is opening with your message. ${what[0].toUpperCase() + what.slice(1)} appears under the link. Press Post.`)}
        className={`${style} ${off} bg-gray-900 hover:bg-black`}
      >
        X
      </a>
    </div>
  );
}

function ShareLinkBox({ link, onNote }: { link: string; onNote: (note: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
      <span>Your share link:</span>
      <code className="break-all rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">{link}</code>
      <button
        type="button"
        onClick={async () => onNote((await copyText(link)) ? "Link copied. Paste it anywhere: the picture shows with it." : "")}
        className="font-medium text-blue-600 hover:underline"
      >
        Copy link
      </button>
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
  const [design, setDesign] = useState<ShareCardDesign>("friend");
  const [format, setFormat] = useState<ShareCardFormat>("status");
  const [showName, setShowName] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Image files by URL, fetched as soon as a card is chosen so the phone's share menu
  // opens straight away when tapped (it refuses if the tap was a few seconds ago).
  const filesRef = useRef(new Map<string, Promise<File>>());

  const withName = showName && !!firstName?.trim();
  const imageUrl = shareCardImageUrl(summary.code, design, format, withName);
  const link = cardShareLink(summary.code, design, withName);
  const welcomeBonus = formatNgn(summary.welcomeBonusNgn);
  const texts: PlatformTexts = {
    message: `Use my code ${summary.code} when you sign up and you'll get ${welcomeBonus} airtime once your first course payment is confirmed. First lesson free 👇\n${link}`,
    instagram: `Use my code ${summary.code} when you sign up at paleontraining.com/register and you'll get ${welcomeBonus} airtime once your first course payment is confirmed. First lesson free.`,
    short: `${welcomeBonus} airtime for you when you join with my code ${summary.code} and pay for your first course. First lesson free 👉 ${link}`,
  };
  const phone = canUseShareSheet();

  function getFile(): Promise<File> {
    let file = filesRef.current.get(imageUrl);
    if (!file) {
      const name = shareCardFilename(summary.code, design, format);
      file = fetch(imageUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then((blob) => new File([blob], name, { type: "image/png" }));
      file.catch(() => filesRef.current.delete(imageUrl));
      filesRef.current.set(imageUrl, file);
    }
    return file;
  }

  useEffect(() => {
    setLoaded(false);
    void getFile().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  async function shareToApps() {
    setBusy(true);
    setMessage(null);
    try {
      await copyText(texts.message);
      const outcome = await shareFile(await getFile(), texts.message);
      if (outcome === "needs-tap") setMessage("Tap again to open your apps.");
      else if (outcome === "shared") setMessage("Shared. Your message is also copied, in case the app dropped it.");
      else if (outcome === "unsupported") setMessage("Sharing isn't available here. Use Download image instead.");
    } catch {
      setMessage("That didn't work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function download() {
    try {
      const file = await getFile();
      saveBlob(file, file.name);
    } catch {
      setMessage("Couldn't prepare the image. Check your connection and try again.");
    }
  }

  const { width, height } = SHARE_CARD_SIZE[format];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">Share cards</h2>
      <p className="mt-1 text-sm text-gray-600">
        Images with your code on them, for your WhatsApp chats, Status and social feeds. The first card leads with
        what your friend gets, which people are far more likely to pass on.
      </p>

      <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <Chips label="Card" options={CARD_DESIGNS} value={design} onChange={setDesign} />
          <Chips label="Size (for Status, Instagram and downloads)" options={CARD_FORMATS} value={format} onChange={setFormat} />
          {firstName?.trim() && (
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showName}
                onChange={(e) => setShowName(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show my first name on the card
            </label>
          )}

          <HowToShare media="image" />
          <PlatformButtons texts={texts} link={link} media="image" getFile={getFile} onNote={setMessage} />
          <div className="flex flex-wrap gap-2">
            {phone && (
              <button
                type="button"
                onClick={shareToApps}
                disabled={busy}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? "Preparing…" : "Share to Status & other apps"}
              </button>
            )}
            <button
              type="button"
              onClick={download}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Download image
            </button>
          </div>
          <ShareLinkBox link={link} onNote={setMessage} />
          {message && <p className="text-sm text-blue-800">{message}</p>}
        </div>

        <div className="flex justify-center md:block">
          <img
            src={imageUrl}
            width={width}
            height={height}
            onLoad={() => setLoaded(true)}
            alt="Preview of your share card"
            className={`h-auto rounded-lg border border-gray-200 bg-gray-900 shadow-sm transition-opacity ${loaded ? "" : "opacity-60"}`}
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
  const [personalise, setPersonalise] = useState(true);
  const [showName, setShowName] = useState(true);
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

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={personalise}
            onChange={(e) => setPersonalise(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Put my code on the last 3 seconds of the video
        </label>
        {personalise && (
          <label className="ml-6 flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showName}
              onChange={(e) => setShowName(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Show my first name too (&ldquo;Recommended by &hellip;&rdquo;)
          </label>
        )}
      </div>

      <div className="mt-4">
        <HowToShare media="video" />
      </div>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {videos.map((video) => {
          // Captions point at the video's own share link, whose preview is its picture.
          const link = videoShareLink(summary.code, video.file, personalise && showName);
          const videoCtx = { ...ctx, shareUrl: link };
          return (
            <VideoCard
              key={video.file}
              video={video}
              caption={buildCaption(video, platform, videoCtx)}
              texts={{
                message: buildCaption(video, "whatsapp", videoCtx),
                instagram: buildCaption(video, "instagram", videoCtx),
                short: buildCaption(video, "short", videoCtx),
              }}
              link={link}
              personalised={personalise ? { showName, code: summary.code } : null}
            />
          );
        })}
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
  link,
  personalised,
}: {
  video: AmbassadorVideo;
  caption: string;
  texts: PlatformTexts;
  link: string;
  // null = the stock video; otherwise the server adds the ambassador's code (and name).
  personalised: { showName: boolean; code: string } | null;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  // Fetched files by variant, so switching the checkboxes back and forth doesn't refetch.
  const filesRef = useRef(new Map<string, File>());
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const shareable = canUseShareSheet();
  const variant = personalised ? (personalised.showName ? "named" : "code") : "stock";

  useEffect(() => {
    // The player shows the ambassador's own version once it has been fetched.
    const file = filesRef.current.get(variant);
    setPreviewSrc((old) => {
      if (old) URL.revokeObjectURL(old);
      return file && variant !== "stock" ? URL.createObjectURL(file) : null;
    });
  }, [variant]);

  useEffect(
    () => () => {
      setPreviewSrc((old) => {
        if (old) URL.revokeObjectURL(old);
        return null;
      });
    },
    [],
  );

  async function getFile(): Promise<File> {
    const cached = filesRef.current.get(variant);
    if (cached) return cached;
    let blob: Blob;
    let name: string;
    if (personalised) {
      blob = await fetchPersonalisedVideo(video.file, personalised.showName);
      name = `paleon-${video.file}-${personalised.code}.mp4`;
    } else {
      const res = await fetch(videoUrl(video));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      blob = await res.blob();
      name = `paleon-${video.file}.mp4`;
    }
    const file = new File([blob], name, { type: "video/mp4" });
    filesRef.current.set(variant, file);
    if (variant !== "stock") {
      setPreviewSrc((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(file);
      });
    }
    return file;
  }

  async function saveVideo() {
    setBusy(true);
    try {
      const file = await getFile();
      saveBlob(file, file.name);
    } catch {
      setNote("Couldn't prepare the video. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
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
      const outcome = await shareFile(await getFile(), caption);
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
        src={previewSrc ?? videoUrl(video)}
        poster={previewSrc ? undefined : posterUrl(video)}
        controls
        playsInline
        preload="none"
        className="mx-auto aspect-[9/16] w-full max-w-[220px] rounded-md bg-gray-900"
      />
      <p className="mt-3 font-medium text-gray-900">{video.title}</p>
      <p className="text-xs text-gray-500">{video.course}</p>
      {personalised && !previewSrc && (
        <button
          type="button"
          onClick={() => {
            setNote(null);
            getFile().catch(() => setNote("Couldn't prepare the video. Check your connection and try again."));
          }}
          className="mt-1 self-start text-xs font-medium text-blue-600 hover:underline"
        >
          Preview my version (code at the end)
        </button>
      )}
      <textarea
        readOnly
        value={caption}
        rows={6}
        aria-label={`Caption for ${video.title}`}
        className="mt-2 w-full flex-1 resize-none rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-700"
      />
      <div className="mt-2">
        <PlatformButtons texts={texts} link={link} media="video" getFile={getFile} onNote={setNote} />
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
        <button
          type="button"
          onClick={saveVideo}
          disabled={busy}
          className="rounded-md border border-blue-300 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
        >
          {busy ? "Preparing…" : "Download video"}
        </button>
      </div>
      {note && <p className="mt-2 text-xs text-blue-800">{note}</p>}
    </li>
  );
}
