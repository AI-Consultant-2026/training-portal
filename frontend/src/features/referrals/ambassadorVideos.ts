// The ambassador video pack on /refer/me: the 10 Paleon promo videos (made 2026-10-04)
// with ready-to-post captions that carry the ambassador's own code and link.
//
// Files live in backend/src/marketing/videos/ambassador/ and are served by the backend at
// /videos/ambassador/<file>. Caption rules match the original scripts: promise skills,
// never jobs; no course prices; reward amounts come from the referral summary, never
// hard-coded here.

export type CaptionPlatform = "whatsapp" | "instagram" | "short";

export interface AmbassadorVideo {
  file: string; // basename without extension; .mp4 and .jpg (poster) both exist
  title: string;
  course: string;
  // One or two sentences, used as the opening of every platform's caption.
  body: string;
  // A shorter opener for TikTok / X, where space is tight.
  hook: string;
  hashtags: string[];
  // The ambassador-recruitment video talks about the ambassador's reward, not the friend's.
  recruitsAmbassadors?: boolean;
}

export const AMBASSADOR_VIDEOS: AmbassadorVideo[] = [
  {
    file: "01-gis-good-cgpa",
    title: "Good CGPA, but what can you do?",
    course: "GIS & Drone Mapping",
    body: "Your degree opens the door. A practical skill keeps the conversation going. GIS & Drone Mapping for oil & gas, and Day 1 is free to try.",
    hook: "Degree ✔ Skill? GIS & Drone Mapping, Day 1 free.",
    hashtags: ["#NigerianGraduates", "#OilAndGasNigeria", "#GIS"],
  },
  {
    file: "02-hse-spot-the-hazard",
    title: "Spot the hazard first",
    course: "HSE Fundamentals",
    body: "Oil & gas sites run on safety culture. HSE Fundamentals covers risk assessment, permits and incident reporting, at your own pace. First lesson free.",
    hook: "Spot the hazard before it spots you. HSE Fundamentals, first lesson free.",
    hashtags: ["#HSE", "#OilAndGas", "#Warri"],
  },
  {
    file: "03-cyber-one-click-bank",
    title: "One click can cost a bank millions",
    course: "Cyber Security",
    body: "Phishing is the No.1 way in, and banks need staff who can spot it. Cyber Security Fundamentals: Day 1 is free.",
    hook: "Would you have clicked? Learn to spot phishing. Day 1 free.",
    hashtags: ["#CyberSecurity", "#BankingNigeria", "#Lagos"],
  },
  {
    file: "04-cyber-telecoms-mast",
    title: "Climb the mast, protect the network",
    course: "Cyber Security",
    body: "Telecoms is going digital fast, and so are the threats. Build network-security basics at your own pace.",
    hook: "Climbing mast na one thing. Protecting the network na another.",
    hashtags: ["#TelecomsNigeria", "#CyberSecurity", "#Abuja"],
  },
  {
    file: "05-digital-marketing-nysc",
    title: "Learning digital marketing during NYSC",
    course: "Digital Marketing",
    body: "Use your service year to build a skill you can show. Digital Marketing: self-paced, lifetime access, first lesson free.",
    hook: "Who said service year na holiday? Learn digital marketing during NYSC.",
    hashtags: ["#NYSC", "#DigitalMarketing", "#CorpsMember"],
  },
  {
    file: "06-self-paced-lagos-traffic",
    title: "Lagos traffic? I dey learn",
    course: "All courses",
    body: "No time? Your commute is a classroom. Self-paced courses with lifetime access, and the first lesson is free.",
    hook: "Third Mainland traffic? I dey learn. Self-paced, lifetime access.",
    hashtags: ["#Lagos", "#LagosTraffic", "#DigitalSkills"],
  },
  {
    file: "07-mummy-certificate",
    title: "When Mummy sees your certificate",
    course: "Certificate",
    body: "Tag someone whose mum needs to see this 😂 Finish a course and get your certificate.",
    hook: "When Mummy sees your certificate 😂",
    hashtags: ["#NaijaMum", "#Warri", "#NigerianGraduates"],
  },
  {
    file: "08-gis-niger-delta-drone",
    title: "Who maps the Niger Delta?",
    course: "GIS & Drone Mapping",
    body: "GIS and drones are changing how oil & gas monitors land and the environment. Start with Day 1, free.",
    hook: "Pipelines. Land. Environment. Someone has to map it. Why not you?",
    hashtags: ["#NigerDelta", "#DroneMapping", "#GIS"],
  },
  {
    file: "09-career-match-campus",
    title: "Which skill would you pick?",
    course: "Career Match",
    body: "Not sure which skill suits you? The free 2-minute Career Match tells you, and the first lesson of every course is free.",
    hook: "Not sure which skill fits you? Take the free 2-minute Career Match.",
    hashtags: ["#CareerAdvice", "#NigerianStudents", "#UniPort"],
  },
  {
    file: "10-ambassador-airtime",
    title: "Airtime for every friend who joins",
    course: "Student Ambassador",
    body: "Become a Paleon Student Ambassador. It's free to join: share your code and get rewarded when friends join and pay.",
    hook: "Share your code, collect airtime. Become a Paleon Student Ambassador.",
    hashtags: ["#StudentAmbassador", "#Naija", "#NigerianStudents"],
    recruitsAmbassadors: true,
  },
];

// VITE_API_BASE_URL is "http://localhost:4000/api" in local dev and same-origin in
// production; the videos are served by the backend next to /api, not under it.
const SITE_ORIGIN = String(import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/api\/?$/, "");

export function videoUrl(video: AmbassadorVideo): string {
  return `${SITE_ORIGIN}/videos/ambassador/${video.file}.mp4`;
}

export function posterUrl(video: AmbassadorVideo): string {
  return `${SITE_ORIGIN}/videos/ambassador/${video.file}.jpg`;
}

export interface CaptionContext {
  code: string;
  shareUrl: string;
  welcomeBonus: string; // formatted, e.g. "₦3,000"
  referrerReward: string; // formatted, e.g. "₦5,000"
}

function rewardLine(video: AmbassadorVideo, ctx: CaptionContext): string {
  return video.recruitsAmbassadors
    ? `Sign up with my code ${ctx.code}. You'll get ${ctx.welcomeBonus} airtime once your first course payment is confirmed, plus your own code to earn ${ctx.referrerReward} per friend.`
    : `Sign up with my code ${ctx.code} and you'll get ${ctx.welcomeBonus} airtime once your first course payment is confirmed.`;
}

export function buildCaption(video: AmbassadorVideo, platform: CaptionPlatform, ctx: CaptionContext): string {
  const tags = video.hashtags.join(" ");
  switch (platform) {
    case "whatsapp":
      return `${video.body}\n\n${rewardLine(video, ctx)} 👇\n${ctx.shareUrl}`;
    case "instagram":
      // Links in Instagram captions aren't clickable, so the code does the work and the
      // short address is easy to type.
      return `${video.body}\n\n${rewardLine(video, ctx)}\nSign up at paleontraining.com/register (code ${ctx.code}), or DM me for the link.\n\n${tags} #PaleonTraining`;
    case "short":
      // TikTok and X: short enough for X's 280 characters (a link counts as 23).
      return `${video.hook} Use my code ${ctx.code} 👉 ${ctx.shareUrl} ${video.hashtags.slice(0, 2).join(" ")}`;
  }
}
