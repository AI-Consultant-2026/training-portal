// Single source of truth for the referral / ambassador programme. A referral "qualifies"
// (and both sides earn a reward) only when the referred student's FIRST course payment is
// confirmed -- see referral.service.ts's handleQualifyingPayment. Rewards are recorded as
// pending and paid out manually by an admin from /admin/referrals: there is no automated
// airtime/data disbursement, the same way bank transfers are verified by hand.

export const REFERRAL_REWARD_TYPES = ["airtime", "data", "discount"] as const;
export type ReferralRewardType = (typeof REFERRAL_REWARD_TYPES)[number];

// What the ambassador (referrer) earns per qualified referral, and the welcome reward the
// new student (referee) earns on their first paid enrolment. Naira, matching
// coursePricing.ts's currency. Deliberately plain constants, not env-configurable: a
// change to the reward is a deliberate commercial decision worth shipping as a code
// change and a note in the changelog, not a silent env tweak.
export const REFERRER_REWARD_NGN = 5_000;
export const REFEREE_REWARD_NGN = 3_000;

export const DEFAULT_REWARD_TYPE: ReferralRewardType = "airtime";

// Ambassador code: 6 chars from an unambiguous alphabet (no 0/O/1/I/5/S/2/Z) so it
// survives being read aloud, handwritten, or typed on a phone. Prefixed for the brand.
export const REFERRAL_CODE_PREFIX = "PLN";
export const REFERRAL_CODE_ALPHABET = "ABCDEFGHJKMNPQRTUVWXY346789";
export const REFERRAL_CODE_BODY_LENGTH = 6;

export const REFERRAL_LEADERBOARD_SIZE = 10;
