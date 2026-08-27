import { QueryInterface } from "sequelize";

// Fills in a real contact for as many "University Career Centre" partner rows as could
// be verified: a dedicated career centre where one exists, else the Vice-Chancellor's
// Office, else a general institutional inbox (info@/registrar@) confirmed directly on
// the university's own official site -- see each row's updated `notes` for which kind
// and the source URL. Universities where nothing verifiable could be found keep their
// existing placeholder note untouched.
//
// Guarded with `AND contact IS NULL` throughout so this never overwrites a contact
// someone has since entered by hand on the live admin page -- idempotent and safe to
// re-run.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vc@unilag.edu.ng", notes: "Contact: VC Office -- verified directly on official leadership page. Source: https://unilag.edu.ng/leadership-officers-and-dean/", name: "University of Lagos -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vc@ui.edu.ng", notes: "Contact: VC Office -- verified directly on official principal-officers page. Source: https://ui.edu.ng/content/principal-officers", name: "University of Ibadan -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "recruitmentoffice@abu.edu.ng", notes: "Contact: Recruitment Office (career-adjacent) -- verified directly on official contact page. Source: https://abu.edu.ng/contact-us/", name: "Ahmadu Bello University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@oauife.edu.ng", notes: "Contact: General institutional -- verified directly; site notes it is also used for employment inquiries. Source: https://oauife.edu.ng/contact-us/", name: "Obafemi Awolowo University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vc.office@unn.edu.ng", notes: "Contact: VC Office -- verified directly on the VC office's own site. Source: https://vcoffice.unn.edu.ng/", name: "University of Nigeria, Nsukka -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@uniport.edu.ng", notes: "Contact: General institutional (Registrar) -- verified directly; role-based address preferred over a named VC's personal email for durability. Source: https://www.uniport.edu.ng/principal-officers/", name: "University of Port Harcourt -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vc@aaau.edu.ng", notes: "Contact: VC Office -- verified directly on official leadership page. Source: https://aaau.edu.ng/about-us/university-leadership/", name: "African Aviation and Aerospace University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@afued.edu.ng", notes: "Contact: General institutional -- verified directly on official homepage. Source: https://afued.edu.ng/", name: "Adeyemi Federal University of Education -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "admin@adun.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://adun.edu.ng/contact", name: "Admiralty University Ibusa -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@afit.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://afit.edu.ng/home/about-us/principal-officers/", name: "Air Force Institute of Technology -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "pro@funai.edu.ng", notes: "Contact: General institutional (Public Relations Office) -- verified directly in site footer. Source: https://funai.edu.ng", name: "Alex Ekwueme Federal University Ndufu Alike Ikwo -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "bukinfo@buk.edu.ng", notes: "Contact: General institutional -- verified directly; the VC office page's own mailto link is broken, this is the working alternative. Source: https://www.buk.edu.ng/node/98", name: "Bayero University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fubk.edu.ng", notes: "Contact: General institutional -- verified directly, listed under the Vice-Chancellor's contact section. Source: https://fubk.edu.ng/about/", name: "Federal University Birnin Kebbi -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@fud.edu.ng", notes: "Contact: General institutional (Registrar) -- medium confidence: attributed to this official page via search index, a direct re-fetch returned an empty body. Source: https://fud.edu.ng/index.php/contact/", name: "Federal University Dutse -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fudutsinma.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://fudutsinma.edu.ng/?page_id=236", name: "Federal University Dutsin-Ma -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fugashua.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://fugashua.edu.ng/index.php/contact/", name: "Federal University Gashua -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fugusau.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://fugusau.edu.ng", name: "Federal University Gusau -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fukashere.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://fukashere.edu.ng/contact-us/", name: "Federal University Kashere -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fulafia.edu.ng", notes: "Contact: General institutional -- verified directly (dedicated contact-us page 404s). Source: https://fulafia.edu.ng/", name: "Federal University Lafia -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@funaab.edu.ng", notes: "Contact: General institutional -- a Career Services and Linkages Unit page exists but lists no unit-specific email; registrar@ confirmed directly. Source: https://funaab.edu.ng/section/career-services-and-linkages-unit/", name: "Federal University of Agriculture Abeokuta -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fuhsa.edu.ng", notes: "Contact: General institutional -- verified directly; a vc@fuhsa.edu.ng claim elsewhere could not be confirmed on-site. Source: https://fuhsa.edu.ng/", name: "Federal University of Health Sciences Azare -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@fupre.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://fupre.edu.ng/contact-us/", name: "Federal University of Petroleum Resources Effurun -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@futminna.edu.ng", notes: "Contact: General institutional (Registrar) -- verified directly. Source: https://futminna.edu.ng/contact/", name: "Federal University of Technology Minna -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vc@fuoye.edu.ng", notes: "Contact: VC Office -- verified directly on the Vice-Chancellor's own official contact page -- highest confidence result of the whole search. Source: https://vc.fuoye.edu.ng/contact/", name: "Federal University Oye-Ekiti -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@uam.edu.ng", notes: "Contact: General institutional (Registrar) -- medium confidence: search-index-sourced from this official page; a direct re-fetch got connection-refused at check time. Source: https://uam.edu.ng/contact-us/", name: "Joseph Sarwuan Tarka University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@mouau.edu.ng", notes: "Contact: General institutional (Registrar) -- verified directly in site footer. Source: https://mouau.edu.ng/", name: "Michael Okpara University of Agriculture Umudike -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "vc@noun.edu.ng", notes: "Contact: VC Office -- verified directly on the VC office's own directory page. Source: https://nou.edu.ng/vice-chancellors-office/", name: "National Open University of Nigeria -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "admin@polac.edu.ng", notes: "Contact: General institutional -- medium confidence: search-index-sourced from this official contact page; a direct re-fetch returned 403. Source: https://polac.edu.ng/contact/", name: "Nigeria Police Academy Wudil -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@naub.edu.ng", notes: "Contact: General institutional -- medium confidence: search-index-sourced from the official site; direct fetch confirmed a webmail portal exists but not this exact address. Source: https://naub.edu.ng/", name: "Nigerian Army University Biu -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "academyregistrar@nda.edu.ng", notes: "Contact: General institutional (Registrar) -- medium confidence: search-index-sourced from the official site; direct fetch timed out at check time. Source: https://nda.edu.ng/", name: "Nigerian Defence Academy -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "admin@nmu.edu.ng", notes: "Contact: General institutional -- verified directly in site footer. Source: https://www.nmu.edu.ng/", name: "Nigerian Maritime University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "info@uniabuja.edu.ng", notes: "Contact: General institutional -- verified directly. Source: https://www.uniabuja.edu.ng/contact-us/", name: "University of Abuja -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "csu@unilorin.edu.ng", notes: "Contact: Career Centre -- verified directly -- a genuine, dedicated Career Services Unit, the best-fit result of the whole search. Source: https://csu.unilorin.edu.ng/", name: "University of Ilorin -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@unijos.edu.ng", notes: "Contact: General institutional (Registrar) -- verified directly on the VC office page; a past VC's personal email also found but stale, not used. Source: https://www.unijos.edu.ng/vice-chancellor", name: "University of Jos -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact = :contact, notes = :notes, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact IS NULL`,
      { replacements: { contact: "registrar@uniuyo.edu.ng", notes: "Contact: General institutional (Registrar) -- verified directly on the VC page. Source: https://uniuyo.edu.ng/vice-chancellor/", name: "University of Uyo -- Careers/Alumni Office" } },
    );
  },

  down: async (_queryInterface: QueryInterface) => {
    // Deliberately a no-op: reverting would mean blanking out contact info that may
    // since have been verified further or edited by hand on the live admin page, and
    // the `contact IS NULL` guard above means we can't tell which rows we actually set.
  },
};
