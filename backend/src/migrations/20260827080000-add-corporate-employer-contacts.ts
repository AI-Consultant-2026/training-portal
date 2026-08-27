import { QueryInterface } from "sequelize";

// Populates contact_name (and contact, where a real email exists) for the 20
// "Corporate Employer" rows seeded in 20260827070000, from research across
// Oil & Gas, Banking, and Telecom.
//
// Unlike the university VC pass (52/57 hit rate), private corporations do not
// publish executive/HR contact details for public accountability the way public
// universities do, so this landed far fewer results: 9 of 20 companies yielded a
// named HR/People contact, and NOT ONE yielded a verifiable email address --
// every email lead found was either a generic/global mailbox (not HR-specific),
// a pattern-guessed address from an aggregator, or unavailable outright. Per the
// "no guessed emails" rule applied throughout this directory, contact (email) is
// left NULL for all 20 rows; only contact_name is populated, and only where a
// name/title could be confirmed with medium confidence or better.
//
// The 11 companies with nothing populated (NNPC, TotalEnergies, ExxonMobil,
// Seplat, Oando, Nigeria LNG, GTCO, Zenith Bank, Access Holdings, Ecobank
// Nigeria, MTN Nigeria) either had no named HR/People leader findable via public
// sources, or only conflicting/unconfirmed leads that didn't clear the
// verification bar -- left blank rather than guessing.
//
// Guarded with `AND category = 'Corporate Employer' AND contact_name IS NULL`,
// and appends to the existing `notes` rather than overwriting it, matching
// 20260827060000-add-vice-chancellor-contact-names.ts's pattern.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Charles Ugwu",
          noteAddition:
            " | HR contact: Charles Ugwu, Director, Professional Development, Nigeria Human Resources -- medium confidence: sourced from a third-party aggregator (ZoomInfo/LeadIQ-type listing), not Shell's own site, not independently re-confirmed. No verifiable email (aggregator's suggested pattern-guessed address was rejected per the no-guessed-email rule).",
          name: "Shell Petroleum Development Company of Nigeria",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Owolabi Olusegun",
          noteAddition:
            " | HR contact: Owolabi Olusegun, Human Resources Manager -- medium confidence: sourced from a business-directory listing (businesslist.com.ng) with a phone number, no email. A second, conflicting name (Babatunde Ajayi) also surfaced via RocketReach with no verifiable email either -- not used, to avoid picking arbitrarily between conflicting leads.",
          name: "Chevron Nigeria Limited",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Modupe Akindele",
          noteAddition:
            " | HR contact: Modupe Akindele, Group Head, Human Resources -- medium confidence: named in credible 2026 news coverage (Premium Times / Vanguard) of UBA graduate/youth employment programmes, not an official org-chart page. No email found.",
          name: "United Bank for Africa (UBA)",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Olumuyiwa David Olulaja",
          noteAddition:
            " | HR contact: Olumuyiwa David Olulaja, Group Head, Human Capital Management & Development -- high confidence: confirmed directly on the bank's own official leadership page (firstbanknigeria.com). No email found.",
          name: "FBN Holdings (First Bank of Nigeria)",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Tope Popoola",
          noteAddition:
            " | HR contact: Tope Popoola, Human Resources Manager -- low-medium confidence: self-reported LinkedIn title only (Manager level, not Head/Director); the bank's official leadership page did not list an HR role. No email found.",
          name: "Stanbic IBTC Holdings",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Charles Nwachukwu",
          noteAddition:
            " | HR contact: Charles Nwachukwu, Deputy General Manager & Chief Human Resources Officer -- high confidence: name and exact title independently corroborated across LinkedIn, Bloomberg, and MarketScreener. No email found.",
          name: "Fidelity Bank",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Adebimpe Ayo-Elias",
          noteAddition:
            " | HR contact: Adebimpe Ayo-Elias, Director of Human Resources and Administration -- low-medium confidence: a conflicting, undated alternate name (Gbemiga Owolabi) also surfaced elsewhere and could not be resolved. No email found.",
          name: "Airtel Nigeria (Airtel Networks Limited)",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Wole Ayanleke",
          noteAddition:
            " | HR contact: Wole Ayanleke, Head of Human Resources -- medium confidence: self-reported via his own LinkedIn profile, not independently corroborated. No email found.",
          name: "Globacom (Glo)",
        },
      },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'Corporate Employer' AND contact_name IS NULL`,
      {
        replacements: {
          contactName: "Dorothy Tunde-Ajala",
          noteAddition:
            " | HR contact: Dorothy Tunde-Ajala, Chief Human Resources Officer -- high confidence: sourced from a same-day (27 Aug 2026) company announcement. No email found.",
          name: "9mobile (Emerging Markets Telecommunication Services)",
        },
      },
    );
  },

  down: async (_queryInterface: QueryInterface) => {
    // Deliberately a no-op -- same reasoning as the earlier contact-fill migrations.
  },
};
