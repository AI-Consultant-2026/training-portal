// Commission sales reps (2026-10-17). These match the Independent Sales Representative
// Agreement, section 4; change them only together with the agreement (it gives reps 14
// days' notice, and a change never applies to sales that already qualified).

// 10% of the course fee for each qualifying sale; 12.5% from the 16th qualifying sale in a
// calendar month (Nigeria time), plus a flat bonus in any month with 10 or more.
export const REP_COMMISSION_RATE = 0.1;
export const REP_HIGH_COMMISSION_RATE = 0.125;
export const REP_HIGH_RATE_FROM_SALE = 16;
export const REP_MONTHLY_BONUS_NGN = 30_000;
export const REP_MONTHLY_BONUS_MIN_SALES = 10;

// After a rep's agreement ends, sales by students they brought in still qualify for this long.
export const REP_TAIL_DAYS = 30;

// "REP" + 5 characters from the ambassador-code alphabet, so the two kinds of code can
// never clash (ambassador codes start PLN) and read the same aloud.
export const REP_CODE_PREFIX = "REP";
export const REP_CODE_BODY_LENGTH = 5;
