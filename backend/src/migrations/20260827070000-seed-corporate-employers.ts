import { randomUUID } from "crypto";
import { QueryInterface } from "sequelize";

// Seeds the initial "Corporate Employer" partner directory across the three sectors
// this outreach targets -- Oil & Gas, Banking, Telecom -- for pitching companies to
// nominate and sponsor their own employees for digital-skills training, distinct from
// the job-board/university/NYSC lead-gen partners already in this table. Contact
// name/email are deliberately left blank here; a follow-up migration fills in only
// what could be independently verified on the company's own site or a named
// leadership/press source, per the "no guessed emails" rule applied throughout this
// directory.
//
// Idempotent by category, matching 20260827020000-seed-partners.ts's pattern: skips
// entirely if any Corporate Employer rows already exist, so this never duplicates rows
// on a second deploy or clobbers changes made through the admin UI after the first.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [existing] = (await queryInterface.sequelize.query(
      "SELECT id FROM partners WHERE category = 'Corporate Employer' LIMIT 1",
    )) as [Array<{ id: string }>, unknown];
    if (existing.length > 0) {
      return;
    }

    const now = new Date();
    const row = (name: string, sector: string, url: string) => ({
      id: randomUUID(),
      name,
      category: "Corporate Employer",
      sector,
      url,
      contact: null,
      contact_name: null,
      cost: null,
      status: "not-started",
      last_contacted: null,
      renewal_date: null,
      notes: "Contact not yet verified -- see follow-up migration for what could be independently confirmed.",
      created_at: now,
      updated_at: now,
    });

    await queryInterface.bulkInsert("partners", [
      row("NNPC Limited", "Oil & Gas", "nnpcgroup.com"),
      row("Shell Petroleum Development Company of Nigeria", "Oil & Gas", "shell.com.ng"),
      row("Chevron Nigeria Limited", "Oil & Gas", "chevron.com"),
      row("TotalEnergies Nigeria", "Oil & Gas", "totalenergies.com"),
      row("ExxonMobil (Mobil Producing Nigeria)", "Oil & Gas", "corporate.exxonmobil.com"),
      row("Seplat Energy", "Oil & Gas", "seplatenergy.com"),
      row("Oando PLC", "Oil & Gas", "oandoplc.com"),
      row("Nigeria LNG Limited", "Oil & Gas", "nlng.com"),

      row("Guaranty Trust Holding Company (GTCO)", "Banking", "gtcoplc.com"),
      row("Zenith Bank", "Banking", "zenithbank.com"),
      row("Access Holdings (Access Bank)", "Banking", "accessbankplc.com"),
      row("United Bank for Africa (UBA)", "Banking", "ubagroup.com"),
      row("FBN Holdings (First Bank of Nigeria)", "Banking", "firstbanknigeria.com"),
      row("Stanbic IBTC Holdings", "Banking", "stanbicibtcbank.com"),
      row("Fidelity Bank", "Banking", "fidelitybank.ng"),
      row("Ecobank Nigeria", "Banking", "ecobank.com"),

      row("MTN Nigeria", "Telecom", "mtn.ng"),
      row("Airtel Nigeria (Airtel Networks Limited)", "Telecom", "airtel.com.ng"),
      row("Globacom (Glo)", "Telecom", "gloworld.com"),
      row("9mobile (Emerging Markets Telecommunication Services)", "Telecom", "9mobile.com.ng"),
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("partners", { category: "Corporate Employer" });
  },
};
