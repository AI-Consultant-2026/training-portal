import { QueryInterface } from "sequelize";

// Second research pass on the "University Career Centre" rows that came up empty in
// 20260827030000: this time using named-VC + academic-profile lookups (Google Scholar /
// ResearchGate / journal bylines) as a deeper fallback, not just each institution's own
// contact page. That approach didn't surface any new personal VC emails -- Nigerian
// academics' published institutional addresses turned out to be as hard to find as the
// sites' own contact pages -- but it did turn up 10 more general institutional inboxes
// (registrar@/info@), one genuine VC-specific address (Usmanu Danfodiyo University), and
// a naming correction for Yusuf Maitama Sule Federal University of Education Kano (a
// distinct institution from the Kano-state-owned Northwest University, not a rename of
// it as briefly assumed mid-research).
//
// 11 of the 21 rows this pass targeted still have no verifiable email after two research
// passes and are intentionally left untouched: Alvan Ikoku Federal University of
// Education, Federal University Lokoja, Federal University of Agriculture Mubi, Federal
// University of Agriculture Zuru, Federal University of Education Pankshi, Federal
// University Otuoke, Nnamdi Azikiwe University, Tai Solarin Federal University of
// Education, University of Benin, University of Calabar, and University of Maiduguri --
// their official sites either 403/404 every contact path or Cloudflare-obfuscate the
// address in a way that can't be decoded from fetched text.
//
// Guarded with `AND contact IS NULL`, same as 20260827030000, so this never overwrites a
// contact entered by hand on the live admin page.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@fuask.edu.ng", notes: "Contact: General institutional -- verified directly on official site; VC (William Barnabas Qurix) has no current-institution email on any academic profile. Source: https://www.fuask.edu.ng/", name: "Federal University of Applied Sciences Kachia -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fuez.edu.ng", notes: "Contact: General institutional -- verified directly in page header/footer; VC is Yahaya Isa Bunkure. Source: https://www.fuez.edu.ng/home/about", name: "Federal University of Education Zaria -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@futa.edu.ng", notes: "Contact: General institutional -- medium confidence: search-indexed from FUTA's own registry site; a direct re-fetch returned 403. Source: https://registry.futa.edu.ng/home/contact", name: "Federal University of Technology Akure -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@futia.edu.ng", notes: "Contact: General institutional -- medium confidence: cited across multiple independent sources as FUTIA's official contact; direct fetch 403'd. Source: https://futia.edu.ng/contact/", name: "Federal University of Technology Ikot Abasi -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@futo.edu.ng", notes: "Contact: General institutional -- verified directly on FUTO's own Contact Us page. Source: https://legacy.futo.edu.ng/contact-us/", name: "Federal University of Technology Owerri -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@futd.edu.ng", notes: "Contact: General institutional -- verified directly on the official homepage. Source: https://www.futd.edu.ng/", name: "Federal University of Transportation Daura -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fuwukari.edu.ng", notes: "Contact: General institutional -- medium confidence: search-indexed from the official contact page; a direct re-fetch returned HTTP 421. Source: https://fuwukari.edu.ng/contact-us/", name: "Federal University Wukari -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@mautech.edu.ng", notes: "Contact: General institutional -- medium confidence: the institution's current official domain is mautech.edu.ng (not mau.edu.ng, which appears to be a legacy/unrelated site); search-indexed, direct fetch unreachable. Source: https://www.mautech.edu.ng/", name: "Modibbo Adama University Yola -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vchancellor@udusok.edu.ng", notes: "Contact: VC Office -- medium confidence: a genuine VC-specific address attributed to this official page via search index (part of a structured role-address set); direct fetch failed with connection-refused. Source: https://www.udusok.edu.ng/contact-us/", name: "Usmanu Danfodiyo University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@ymsfuek.edu.ng", notes: "Contact: General institutional -- verified directly in site footer. Correction: this is a distinct federal institution from the Kano-state-owned Northwest University -- do not conflate the two. Source: https://ymsfuek.edu.ng/", name: "Yusuf Maitama Sule Federal University of Education Kano -- Careers/Alumni Office" } },
    );
  },

  down: async (_queryInterface: QueryInterface) => {
    // Deliberately a no-op -- same reasoning as 20260827030000's down().
  },
};
