import { config } from "../../config";
import { coursePriceNgn, findPublicCourseByTitle, PublicCourse } from "../../constants/publicCourses";
import { leadUnsubscribeUrl } from "../../services/leadUnsubscribe.service";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

// Lead nurture emails (2026-09-25): a welcome plus three follow-ups, built around the
// lead's matched course and its free first lesson. Replaced the old countdown to a
// shared "intake deadline", which no longer fits self-paced, start-anytime courses.

export type FollowUpStep = 1 | 2 | 3;

interface LeadFields {
  id: string;
  name: string;
  email: string;
  course: string;
  sector?: string | null;
}

const WHATSAPP = "+44 7508 823495";

function site(path: string): string {
  return `${config.corsOrigin.replace(/\/$/, "")}${path}`;
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

function links(course: PublicCourse) {
  return {
    preview: site(`/preview/${course.slug}`),
    page: site(`/${course.slug}-course`),
    enrol: site(`/register?course=${course.slug}`),
  };
}

function facts(course: PublicCourse): string {
  const price = coursePriceNgn(course);
  const fee = price !== null ? `, ₦${price.toLocaleString("en-NG")}` : "";
  return `${course.days} days, ${course.lessons} illustrated video lessons${fee} — self-paced, with lifetime access and a certificate of completion.`;
}

// Every lead email ends with why they're getting it and a one-click unsubscribe link,
// and carries List-Unsubscribe headers so mail apps can show their own button.
function message(lead: LeadFields, subject: string, lines: string[]): EmailMessage {
  const unsubscribe = leadUnsubscribeUrl(lead.id);
  const all = [
    ...lines,
    "\u2014",
    "You're receiving this because you asked about a Paleon Training course on paleontraining.com. To stop these emails, unsubscribe here:",
    unsubscribe,
  ];
  return {
    to: lead.email,
    subject,
    text: all.join("\n\n"),
    html: wrapHtml(all),
    headers: {
      "List-Unsubscribe": `<${unsubscribe}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

// Leads whose course isn't one of the four live courses (e.g. "Not sure yet" from the
// older form) get pointed at the Career Match and the course list instead.
function genericWelcome(lead: LeadFields): EmailMessage {
  return message(lead, "Welcome to Paleon Training — find the right course for you", [
    `Hi ${firstName(lead.name)},`,
    "Thanks for your interest in Paleon Training. We run four practical, self-paced courses for careers in Oil & Gas, Banking and Telecoms: Cyber Security Fundamentals, GIS and Drone Mapping, Digital Marketing and HSE Fundamentals.",
    "Not sure which one fits? Our free Career Match recommends one in 2 minutes:",
    site("/welcome#career-match"),
    "Every course has a free first lesson you can open without an account, so you can see exactly how it's taught before you decide.",
    `Questions? Just reply to this email, or WhatsApp us on ${WHATSAPP}.`,
  ]);
}

export function buildLeadWelcomeEmail(lead: LeadFields): EmailMessage {
  const course = findPublicCourseByTitle(lead.course);
  if (!course) return genericWelcome(lead);
  const l = links(course);
  const fromMatch = Boolean(lead.sector);
  return message(lead, fromMatch ? `Your Career Match: ${course.title}` : `Welcome to Paleon Training — ${course.title}`, [
    `Hi ${firstName(lead.name)},`,
    fromMatch
      ? `Thanks for using the Paleon Training Career Match. Your match is ${course.title}.`
      : `Thanks for your interest in ${course.title} at Paleon Training.`,
    "The best way to see if it's right for you is to try it. The first lesson is free — the full text, illustration and video, exactly as enrolled students see it, with no account needed:",
    l.preview,
    `The course: ${facts(course)}`,
    `Full course details: ${l.page}`,
    `When you're ready, create your account and enrol here: ${l.enrol}`,
    `Questions? Just reply to this email, or WhatsApp us on ${WHATSAPP}.`,
  ]);
}

export function buildLeadFollowUpEmail(lead: LeadFields, step: FollowUpStep): EmailMessage | null {
  const course = findPublicCourseByTitle(lead.course);
  if (!course) return null; // generic leads only get the welcome
  const l = links(course);
  const hi = `Hi ${firstName(lead.name)},`;

  if (step === 1) {
    return message(lead, `Have you tried the free ${course.title} lesson?`, [
      hi,
      `A quick reminder that the first lesson of ${course.title} is free to open — it takes about 20–30 minutes and shows you exactly how the course is taught:`,
      l.preview,
      "After that, here's some of what the course covers:",
      ...course.highlights.map((h) => `• ${h}`),
      "Every course ends in a capstone project you can show to employers.",
      `See the full day-by-day curriculum: ${l.page}`,
    ]);
  }

  if (step === 2) {
    return message(lead, `How ${course.title} works`, [
      hi,
      `If you're weighing up ${course.title}, here's exactly how it works:`,
      "• Create your free account and choose the course.",
      "• Follow the payment instructions shown when you enrol. Your lessons unlock once your payment is confirmed.",
      "• Study at your own pace, on your phone or laptop — start any time, and keep access for life.",
      "• Finish every lesson to download your certificate of completion.",
      "• Stuck? Use \"Report a problem\" inside the portal and we reply within 1 working day.",
      `The course: ${facts(course)}`,
      `Enrol here: ${l.enrol}`,
      `Or try the free first lesson first: ${l.preview}`,
    ]);
  }

  return message(lead, `Still thinking about ${course.title}?`, [
    hi,
    `This is our last email about ${course.title}. If the timing isn't right, no problem — the course is self-paced, so you can start whenever you're ready.`,
    `The free first lesson is always there: ${l.preview}`,
    `And when you're ready to enrol: ${l.enrol}`,
    `If ${course.title} isn't quite the right fit, the free Career Match can suggest another course: ${site("/welcome#career-match")}`,
    `Any questions at all, just reply to this email or WhatsApp us on ${WHATSAPP}. We read every message.`,
  ]);
}
