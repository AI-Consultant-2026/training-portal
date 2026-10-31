import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchCoursePreview } from "../../api/courses.api";
import { useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { extractYouTubeId, YouTubePlayer } from "../../components/ui/YouTubePlayer";
import { track } from "../../lib/analytics";
import { CoursePreview } from "../../types/api";
import { formatPrice, isFlutterwave } from "../payments/checkout";
import { PaymentTrustStrip } from "../payments/PaymentTrustStrip";
import { LessonContent } from "./LessonContent";

const WHATSAPP_URL = "https://wa.me/447508823495";

// The visitor's country: their account's, or the one they picked on a country homepage
// (country-home.js stores it under this key).
function visitorCountry(accountCountry: string | null | undefined): string | null {
  if (accountCountry) return accountCountry;
  try {
    return window.localStorage.getItem("paleon_country");
  } catch {
    return null;
  }
}

// Public "Try Day 1 free" page (2026-09-25): the first lesson of a course, readable
// without an account, so people can see the real lesson format -- text, illustration
// and video -- before paying. Linked from the course pages and homepage.
export function PreviewLessonPage() {
  const { slug } = useParams<{ slug: string }>();
  // An ambassador's free-lesson post links here with ?ref=<code>; sign-up keeps it.
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref")?.trim() ?? "";
  const { user } = useAppSelector((state) => state.auth);
  const [preview, setPreview] = useState<CoursePreview | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setPreview(null);
    setFailed(false);
    fetchCoursePreview(slug)
      .then((data) => {
        setPreview(data);
        document.title = `Free lesson: ${data.lesson.title} | ${data.course.title} | Paleon Training`;
        track("preview_lesson_view", { course: data.course.slug });
      })
      .catch(() => setFailed(true));
  }, [slug]);

  if (failed) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Alert message="We couldn't find that course preview." />
        <a href="/#courses" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
          See all courses
        </a>
      </div>
    );
  }

  if (!preview) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  const { course, module, lesson } = preview;
  const youtubeVideoId = lesson.videoUrl ? extractYouTubeId(lesson.videoUrl) : null;
  const remaining = Math.max(course.lessonCount - 1, 0);
  // A visitor from a live Ghana, Kenya or South Africa sees their own currency (2026-10-30).
  const country = visitorCountry(user?.country);
  const local = country ? preview.localPrices?.[country] : undefined;
  const checkout = local?.checkout;
  const priceAmount = local ? local.price : course.priceNgn;
  const depositAmount = local ? local.deposit : course.depositNgn;
  const price = priceAmount !== null ? formatPrice(checkout, priceAmount) : null;
  const deposit = depositAmount !== null ? formatPrice(checkout, depositAmount) : null;
  const flutterwave = isFlutterwave(checkout);
  // Logged-in students go straight to the course page to pay; everyone else creates a
  // free account first, with this course pre-selected.
  const enrolHref = user
    ? `/courses/${course.slug}`
    : `/register?course=${encodeURIComponent(course.slug)}${ref ? `&ref=${encodeURIComponent(ref)}` : ""}`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        <strong>Free preview.</strong> This is the first lesson of {course.title}, exactly as enrolled students see it.
        No account needed.
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-gray-500">
        {course.title} &middot; Day {module.weekNumber}: {module.title}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">{lesson.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{lesson.durationMinutes} min</p>

      <LessonContent content={lesson.content} images={lesson.images ?? []} />

      {youtubeVideoId && lesson.videoUrl && (
        <div className="mt-6">
          <YouTubePlayer videoId={youtubeVideoId} videoUrl={lesson.videoUrl} title={lesson.title} />
        </div>
      )}

      <div className="mt-10 rounded-lg border-2 border-blue-600 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-gray-900">Enjoyed this? Lesson 2 is waiting.</h2>
        <p className="mt-2 text-sm text-gray-700">
          {remaining > 0 ? `${remaining} more lessons` : "The full course"} across {course.dayCount} days, each with an
          illustration and a video, plus assignments, quizzes, a capstone project and a certificate of completion.
          Self-paced, with lifetime access.
        </p>
        <ol className="mt-4 grid gap-2 text-sm text-gray-800 sm:grid-cols-3">
          <li className="rounded-md bg-white px-3 py-2">
            <span className="font-semibold text-blue-700">1.</span>{" "}
            {user ? "Open the course" : "Create your free account (1 minute)"}
          </li>
          <li className="rounded-md bg-white px-3 py-2">
            <span className="font-semibold text-blue-700">2.</span>{" "}
            {deposit
              ? `Pay ${deposit}${flutterwave ? "" : " by card"} to unlock Days 1\u20132`
              : flutterwave
                ? "Pay on Flutterwave"
                : "Pay by card on Paystack"}
          </li>
          <li className="rounded-md bg-white px-3 py-2">
            <span className="font-semibold text-blue-700">3.</span> Carry on with lesson 2 straight away
          </li>
        </ol>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to={enrolHref}
            onClick={() => track("preview_enrol_click", { course: course.slug })}
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {deposit ? `Start for ${deposit}` : price ? `Enrol for ${price}` : "Enrol now"}
          </Link>
          <a
            href={checkout?.whatsappLink ?? WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            Questions? Chat on WhatsApp
          </a>
        </div>
        {deposit && price && (
          <p className="mt-3 text-xs text-gray-600">
            Pay the balance whenever you&rsquo;re ready, or pay {price} in full. Same total price, no extra fees.
          </p>
        )}
        {!user && (
          <p className="mt-2 text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>{" "}
            to enrol.
          </p>
        )}
      </div>

      <PaymentTrustStrip courseSlug={course.slug} checkout={checkout} className="mt-4" />

      <p className="mt-6 text-sm">
        <a href={`/${course.slug}-course`} className="text-blue-600 hover:underline">
          Visit the {course.title} course page
        </a>
      </p>
    </div>
  );
}
