"""Builds the ambassador video pack assets in backend/src/marketing/videos/ambassador/.

Run on a Mac with Pillow and ffmpeg:  python3 backend/scripts/ambassador-videos/build.py
Source: the finished 1080x1920 videos in ~/Desktop/Paleon Viral Video Scripts/Final/
(15s clip + 3s branded end card, made by make_final.py in that folder).

Writes, per video:
  NN-slug.mp4      720p, played and shared as-is. Encoded with a keyframe exactly where
                   the 3s end card starts, so the server can cut there without
                   re-encoding (ambassadorVideo.service.ts).
  NN-slug.jpg      poster frame.
  NN-slug-end.png  background for the PERSONALISED end card: everything except the
                   ambassador's name, code and the reward amount, which the server draws
                   with ffmpeg drawtext at the positions in manifest.json.
and manifest.json (end-card start times and the drawtext slots).

The server's end-card encode must use the same settings as ENCODE below, or the joined
file can glitch at the cut. Change both together. B-frames are off (-bf 0) in both: with
them, the end card's first timestamps overlap the main video's last ones at the join.
"""
import json, os, subprocess, glob
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(BACKEND, "src", "marketing", "videos", "ambassador")
FONTS = os.path.join(BACKEND, "src", "marketing", "fonts", "pdf")
SRC = os.path.expanduser("~/Desktop/Paleon Viral Video Scripts/Final")

SANS = os.path.join(FONTS, "SourceSans3-Regular.ttf")
SANS_B = os.path.join(FONTS, "SourceSans3-Bold.ttf")
SERIF_B = os.path.join(FONTS, "SourceSerif4-Bold.ttf")

# Designed at 1080x1920 and scaled to the 720x1280 video.
W, H = 1080, 1920
OW, OH = 720, 1280
S = OW / W
PAPER, INK, BRASS, BRASS_D, MUTED = "#F7F4EC", "#211D17", "#E8863C", "#C96A26", "#6B6252"

FPS = 30
END_CARD_SECONDS = 3
ENCODE = ["-c:v", "libx264", "-preset", "medium", "-crf", "27", "-profile:v", "high", "-bf", "0", "-pix_fmt", "yuv420p",
          "-r", str(FPS), "-video_track_timescale", "15360",
          "-c:a", "aac", "-b:a", "96k", "-ar", "44100", "-ac", "2"]

ALL4 = "Cyber Security · Digital Marketing\nGIS & Drone Mapping · HSE"
CTA = "Try the first lesson free"
# slug: (source number, end-card headline, sub, url)
VIDEOS = {
    "01-gis-good-cgpa": ("01", CTA, "GIS & Drone Mapping", "paleontraining.com"),
    "02-hse-spot-the-hazard": ("02", CTA, "HSE Fundamentals", "paleontraining.com"),
    "03-cyber-one-click-bank": ("03", CTA, "Cyber Security Fundamentals", "paleontraining.com"),
    "04-cyber-telecoms-mast": ("04", CTA, "Cyber Security Fundamentals", "paleontraining.com"),
    "05-digital-marketing-nysc": ("05", CTA, "Digital Marketing", "paleontraining.com"),
    "06-self-paced-lagos-traffic": ("06", CTA, ALL4, "paleontraining.com"),
    "07-mummy-certificate": ("07", CTA, ALL4, "paleontraining.com"),
    "08-gis-niger-delta-drone": ("08", CTA, "GIS & Drone Mapping", "paleontraining.com"),
    "09-career-match-campus": ("09", "Not sure which skill fits?", "Take the free 2-minute\nCareer Match", "paleontraining.com"),
    "10-ambassador-airtime": ("10", "Become a Paleon\nStudent Ambassador", "Join with my code, then get\nyour own code to share", "paleontraining.com/ambassadors"),
}

# drawtext slots, in 1080x1920 design units (converted to video pixels in the manifest).
# Each is horizontally centred; y is the top of the text.
NAME_Y, NAME_SIZE = 985, 46
PANEL_TOP, PANEL_BOTTOM = 1060, 1350
CODE_Y, CODE_SIZE = 1185, 124
REWARD_Y, REWARD_SIZE = 1385, 56


def fit(d, text, path, max_w, size):
    while size > 30:
        f = ImageFont.truetype(path, size)
        if all(d.textlength(l, font=f) <= max_w for l in text.split("\n")):
            return f
        size -= 2
    return ImageFont.truetype(path, size)


def centred(d, text, y, font, fill, spacing=0):
    if spacing:
        tw = sum(d.textlength(c, font=font) for c in text) + spacing * (len(text) - 1)
        x = (W - tw) / 2
        for c in text:
            d.text((x, y), c, font=font, fill=fill)
            x += d.textlength(c, font=font) + spacing
    else:
        d.text(((W - d.textlength(text, font=font)) / 2, y), text, font=font, fill=fill)


def logo(d, x, y, s):
    k = s / 40
    d.rounded_rectangle([x + k, y + k, x + 39 * k, y + 39 * k], radius=4 * k, outline=INK, width=max(2, int(1.4 * k)))
    pts = [(8, 27), (15, 14), (20, 21), (25, 11), (32, 27)]
    d.line([(x + px * k, y + py * k) for px, py in pts], fill=BRASS, width=int(2.2 * k), joint="curve")
    for cx, cy in [(15, 14), (25, 11)]:
        r = 1.8 * k
        d.ellipse([x + cx * k - r, y + cy * k - r, x + cx * k + r, y + cy * k + r], fill=INK)


def end_card(head, sub, url, path):
    img = Image.new("RGB", (W, H), PAPER)
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    for i in range(60, 0, -1):
        r = 14 * i
        hd.ellipse([W - 80 - r, 120 - r, W - 80 + r, 120 + r], fill=(232, 134, 60, int(3 + (60 - i) * 0.25)))
    img.paste(halo, (0, 0), halo)
    d = ImageDraw.Draw(img)

    logo(d, (W - 150) / 2, 150, 150)
    centred(d, "PALEON TRAINING", 330, ImageFont.truetype(SERIF_B, 62), INK, spacing=8)
    centred(d, "Digital Skills, Built to Last", 410, ImageFont.truetype(SANS, 38), MUTED)
    d.line([(W / 2 - 90, 480), (W / 2 + 90, 480)], fill=BRASS, width=5)

    y = 530
    hf = fit(d, head, SERIF_B, W - 140, 78)
    for line in head.split("\n"):
        centred(d, line, y, hf, INK)
        y += hf.size + 16
    y += 22
    sf = fit(d, sub, SANS_B, W - 160, 48)
    for line in sub.split("\n"):
        centred(d, line, y, sf, BRASS_D)
        y += sf.size + 12
    assert y < NAME_Y - 20, f"headline block runs into the name line ({y})"

    # Code panel; the label is static, the code itself is drawn by the server.
    d.rounded_rectangle([80, PANEL_TOP, W - 80, PANEL_BOTTOM], radius=36, fill=INK)
    centred(d, "USE MY CODE WHEN YOU SIGN UP", PANEL_TOP + 34, ImageFont.truetype(SANS_B, 34), BRASS, spacing=3)
    # Reward amount line (server) sits at REWARD_Y; its condition is static:
    centred(d, "once your first course payment is confirmed", REWARD_Y + REWARD_SIZE + 18, ImageFont.truetype(SANS, 40), MUTED)

    uf = fit(d, url, SANS_B, W - 260, 54)
    uw = d.textlength(url, font=uf)
    py = 1570
    d.rounded_rectangle([(W - uw) / 2 - 50, py, (W + uw) / 2 + 50, py + uf.size + 52], radius=50, fill=INK)
    d.text(((W - uw) / 2, py + 22), url, font=uf, fill="white")
    centred(d, "Self-paced · Lifetime access · Certificate", 1740, ImageFont.truetype(SANS_B, 36), MUTED)

    img.resize((OW, OH), Image.LANCZOS).save(path, optimize=True)


def probe_duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True, check=True).stdout
    return float(out)


def main():
    manifest = {
        "version": 1,
        "width": OW,
        "height": OH,
        "fps": FPS,
        "endCardSeconds": END_CARD_SECONDS,
        "slots": {
            "name": {"y": round(NAME_Y * S), "size": round(NAME_SIZE * S), "color": MUTED, "font": "SourceSans3-Bold.ttf"},
            "code": {"y": round(CODE_Y * S), "size": round(CODE_SIZE * S), "color": "#FFFFFF", "font": "SourceSans3-Bold.ttf"},
            "reward": {"y": round(REWARD_Y * S), "size": round(REWARD_SIZE * S), "color": BRASS_D, "font": "SourceSans3-Bold.ttf"},
        },
        "videos": {},
    }
    for slug, (num, head, sub, url) in VIDEOS.items():
        src = glob.glob(os.path.join(SRC, f"Paleon {num} - *.mp4"))[0]
        dur = probe_duration(src)
        # Whole frames, so the cut lands on a frame boundary.
        end_start = round((dur - END_CARD_SECONDS) * FPS) / FPS
        out = os.path.join(OUT, f"{slug}.mp4")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-vf", f"scale={OW}:{OH}",
                        "-force_key_frames", f"{end_start:.4f}", *ENCODE, "-movflags", "+faststart", out], check=True)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", "2.0", "-i", out, "-frames:v", "1",
                        "-vf", "scale=360:640", "-q:v", "4", os.path.join(OUT, f"{slug}.jpg")], check=True)
        end_card(head, sub, url, os.path.join(OUT, f"{slug}-end.png"))
        manifest["videos"][slug] = {"endStart": end_start}
        print(slug, f"end card at {end_start:.3f}s", f"{os.path.getsize(out) / 1e6:.1f}MB")
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
