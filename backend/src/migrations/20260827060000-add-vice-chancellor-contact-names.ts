import { QueryInterface } from "sequelize";

// Populates contact_name (added in 20260827050000) with the current Vice-Chancellor's
// name for as many "University Career Centre" rows as could be confirmed -- so the
// draft generator's "Hi [Name]," greeting can address a real person instead of a
// placeholder. VC names turned out far easier to verify than emails (widely reported in
// Nigerian news and on each institution's own site), landing 52 of 57.
//
// 5 are deliberately left unpopulated because sources genuinely conflicted and neither
// could be confirmed as current: African Aviation and Aerospace University, Adeyemi
// Federal University of Education, Federal University Gusau, Nigerian Maritime
// University, and University of Port Harcourt (only a first-name fragment was ever
// found for the latter, never a confirmed full name).
//
// A few of these VCs took office as recently as Jan-Jun 2026 -- Nigerian federal
// university leadership turns over often, so these names are a snapshot, not a
// permanent fact; re-verify periodically rather than assuming they stay current.
//
// Guarded with \`AND contact_name IS NULL\`, and appends to the existing \`notes\` (the
// contact-email research from 20260827030000/040000) rather than overwriting it.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Folasade Tolulope Ogunsola", noteAddition: " | Vice-Chancellor: Prof. Folasade Tolulope Ogunsola -- VC confirmed via official VC office page + Wikipedia (in office since Nov 2022).", name: "University of Lagos -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Kayode Adebowale", noteAddition: " | Vice-Chancellor: Prof. Kayode Adebowale -- VC confirmed as of Aug 2026; tenure ends 31 Oct 2026 with Peter Olamakinde Olapegba already named as successor -- re-check after that date.", name: "University of Ibadan -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Adamu Ahmed", noteAddition: " | Vice-Chancellor: Prof. Adamu Ahmed -- VC confirmed via ABU's own site (took office 1 May 2025).", name: "Ahmadu Bello University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Adebayo Simeon Bamire", noteAddition: " | Vice-Chancellor: Prof. Adebayo Simeon Bamire -- VC confirmed via Apr 2026 news coverage and OAU's own principal-officers page.", name: "Obafemi Awolowo University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Simon Uchenna Ortuanya", noteAddition: " | Vice-Chancellor: Prof. Simon Uchenna Ortuanya -- VC confirmed (assumed office 11 Aug 2025, first Nsukka-indigenous VC, widely reported).", name: "University of Nigeria, Nsukka -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ibrahim Hassan Garba", noteAddition: " | Vice-Chancellor: Prof. Ibrahim Hassan Garba -- VC confirmed via announcement (Oct 2024), still current as of latest reporting.", name: "Abubakar Tafawa Balewa University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Christopher Bankole Ndubisi Ogbogbo", noteAddition: " | Vice-Chancellor: Prof. Christopher Bankole Ndubisi Ogbogbo -- VC confirmed as substantive VC via multiple sources incl. the university's own site (~May 2025).", name: "Admiralty University Ibusa -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Air Vice Marshal Sani Labaran Rabe", noteAddition: " | Vice-Chancellor: Air Vice Marshal Sani Labaran Rabe -- No Vice-Chancellor role by structure -- this is the 13th Commandant, the equivalent office-holder, confirmed via the institution's own site.", name: "Air Force Institute of Technology -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Daniel Nwachukwu", noteAddition: " | Vice-Chancellor: Prof. Daniel Nwachukwu -- VC confirmed as newly appointed 4th VC (announced 20 Dec 2025) -- very recent, worth a live re-check.", name: "Alex Ekwueme Federal University Ndufu Alike Ikwo -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Haruna Musa", noteAddition: " | Vice-Chancellor: Prof. Haruna Musa -- VC confirmed via BUK's own VC page (appointed 18 Aug 2025, 12th VC).", name: "Bayero University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Muhammad Zaiyan-Umar", noteAddition: " | Vice-Chancellor: Prof. Muhammad Zaiyan-Umar -- VC confirmed via Wikipedia (in office since Nov 2022), no newer transition reported.", name: "Federal University Birnin Kebbi -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ahmad Muhammad Gumel", noteAddition: " | Vice-Chancellor: Prof. Ahmad Muhammad Gumel -- VC confirmed via ~Feb 2026 news; predecessor's tenure ended 10 Feb 2026.", name: "Federal University Dutse -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Mohammed Khalid Othman", noteAddition: " | Vice-Chancellor: Prof. Mohammed Khalid Othman -- VC confirmed via Governing Council appointment announcement (2026).", name: "Federal University Dutsin-Ma -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Yaqub Ahmed Geidam", noteAddition: " | Vice-Chancellor: Prof. Yaqub Ahmed Geidam -- VC confirmed via Jan 2026 appointment announcement, succeeding Maimuna Waziri.", name: "Federal University Gashua -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Muhammad Inuwa Ja'afaru", noteAddition: " | Vice-Chancellor: Prof. Muhammad Inuwa Ja'afaru -- VC confirmed via appointment article, effective 11 Feb 2026, succeeding Umaru Pate.", name: "Federal University Kashere -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Gbenga Ibileye", noteAddition: " | Vice-Chancellor: Prof. Gbenga Ibileye -- VC confirmed via appointment announcement as 4th VC, effective 15 Feb 2026.", name: "Federal University Lokoja -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Mohammed Isa Kida", noteAddition: " | Vice-Chancellor: Prof. Mohammed Isa Kida -- VC confirmed via the university's own official page (multiple 2026-dated posts), assumed office 11 Feb 2026.", name: "Federal University Lafia -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Olusola Kehinde", noteAddition: " | Vice-Chancellor: Prof. Olusola Kehinde -- VC confirmed via Wikipedia (in office since 2023); one source styles the name slightly differently (\"Babatunde Kehinde\"), likely the same person.", name: "Federal University of Agriculture Abeokuta -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Bala Muhammad Audu", noteAddition: " | Vice-Chancellor: Prof. Bala Muhammad Audu -- Medium confidence: site-derived, not independently cross-confirmed by a dated news article.", name: "Federal University of Health Sciences Azare -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ezekiel Oghenyerhovwo Agbalagba", noteAddition: " | Vice-Chancellor: Prof. Ezekiel Oghenyerhovwo Agbalagba -- VC confirmed via Guardian Nigeria coverage (marked 1st anniversary in office, May 2026).", name: "Federal University of Petroleum Resources Effurun -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Faruk Adamu Kuta", noteAddition: " | Vice-Chancellor: Prof. Faruk Adamu Kuta -- VC confirmed via 2026 news coverage.", name: "Federal University of Technology Minna -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Joshua Olalekan Ogunwole", noteAddition: " | Vice-Chancellor: Prof. Joshua Olalekan Ogunwole -- VC confirmed via inauguration coverage as 5th substantive VC (11 Feb 2026).", name: "Federal University Oye-Ekiti -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Isaac Itodo", noteAddition: " | Vice-Chancellor: Prof. Isaac Itodo -- VC confirmed via recent (Aug 2026) coverage of a 100th inaugural lecture at the university.", name: "Joseph Sarwuan Tarka University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "AIG Auwal Musa Mohammed", noteAddition: " | Vice-Chancellor: AIG Auwal Musa Mohammed -- Commandant confirmed via Police Service Commission appointment announcement (5 Aug 2026).", name: "Nigeria Police Academy Wudil -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Lawan Bala Buratai", noteAddition: " | Vice-Chancellor: Prof. Lawan Bala Buratai -- VC confirmed via the university's own site (appointed 16 Apr 2025).", name: "Nigerian Army University Biu -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Major General Oluyemi Olatoye", noteAddition: " | Vice-Chancellor: Major General Oluyemi Olatoye -- Commandant confirmed via appointment coverage (Oct 2025 handover).", name: "Nigerian Defence Academy -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Hakeem Babatunde Fawehinmi", noteAddition: " | Vice-Chancellor: Prof. Hakeem Babatunde Fawehinmi -- VC confirmed via Guardian/Legit.ng (Dec 2025) -- note the institution has had unusually high leadership turnover (4 VCs in one year per ICIR), worth re-checking before relying on this.", name: "University of Abuja -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Wahab Olasupo Egbewole, SAN", noteAddition: " | Vice-Chancellor: Prof. Wahab Olasupo Egbewole, SAN -- VC confirmed, in office since Oct 2022 -- longer-tenured and stable.", name: "University of Ilorin -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Tanko Ishaya", noteAddition: " | Vice-Chancellor: Prof. Tanko Ishaya -- VC confirmed via the university's own site, including a 2026 New Year message confirming he is still serving (in office since Dec 2021).", name: "University of Jos -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Christopher Nyong Ekong", noteAddition: " | Vice-Chancellor: Prof. Christopher Nyong Ekong -- VC confirmed via multiple news sources as 9th substantive VC, effective 16 June 2026 -- very recent appointment.", name: "University of Uyo -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Abdullahi Kodage", noteAddition: " | Vice-Chancellor: Prof. Abdullahi Kodage -- VC confirmed via Sept 2025 presidential appointment coverage. Do not confuse with the separately-appointed VC of Northwest University Kano (a distinct, Kano-state-owned institution).", name: "Yusuf Maitama Sule Federal University of Education Kano -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Stella Ngozi Lemchi", noteAddition: " | Vice-Chancellor: Prof. Stella Ngozi Lemchi -- VC name confirmed via a Guardian Nigeria article.", name: "Alvan Ikoku Federal University of Education -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Bitrus Dawi Tarfa", noteAddition: " | Vice-Chancellor: Prof. Bitrus Dawi Tarfa -- VC name confirmed directly on the university's own VC-profile page.", name: "Federal University of Agriculture Mubi -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ibrahim Rakson Muhammad", noteAddition: " | Vice-Chancellor: Prof. Ibrahim Rakson Muhammad -- VC name confirmed via news coverage (Vanguard/Whistler).", name: "Federal University of Agriculture Zuru -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. William Barnabas Qurix", noteAddition: " | Vice-Chancellor: Prof. William Barnabas Qurix -- VC name confirmed; his own Google Scholar profile lists his previous institution's email, not FUASK's, so deliberately not used as a contact address.", name: "Federal University of Applied Sciences Kachia -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Christiana Zumyil", noteAddition: " | Vice-Chancellor: Christiana Zumyil -- VC name confirmed via Wikipedia.", name: "Federal University of Education Pankshi -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Yahaya Isa Bunkure", noteAddition: " | Vice-Chancellor: Prof. Yahaya Isa Bunkure -- VC name confirmed.", name: "Federal University of Education Zaria -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Adenike Temidayo Oladiji", noteAddition: " | Vice-Chancellor: Prof. Adenike Temidayo Oladiji -- VC name confirmed.", name: "Federal University of Technology Akure -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Leo Daniel", noteAddition: " | Vice-Chancellor: Prof. Leo Daniel -- VC name confirmed via multiple independent sources.", name: "Federal University of Technology Ikot Abasi -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ikechukwu Nosike Simplicius Dozie", noteAddition: " | Vice-Chancellor: Prof. Ikechukwu Nosike Simplicius Dozie -- VC name confirmed.", name: "Federal University of Technology Owerri -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Umar Adam Katsayal", noteAddition: " | Vice-Chancellor: Prof. Umar Adam Katsayal -- VC name confirmed.", name: "Federal University of Transportation Daura -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Promise Mebine", noteAddition: " | Vice-Chancellor: Prof. Promise Mebine -- VC name confirmed.", name: "Federal University Otuoke -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Benjamin Kefas Ate", noteAddition: " | Vice-Chancellor: Prof. Benjamin Kefas Ate -- VC name confirmed.", name: "Federal University Wukari -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ursula Ngozi Akanwa", noteAddition: " | Vice-Chancellor: Prof. Ursula Ngozi Akanwa -- VC name confirmed -- 7th VC and first female VC of the university.", name: "Michael Okpara University of Agriculture Umudike -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ibrahim Umar", noteAddition: " | Vice-Chancellor: Prof. Ibrahim Umar -- VC name confirmed; institution's current official domain is mautech.edu.ng.", name: "Modibbo Adama University Yola -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Uduma Oji Uduma", noteAddition: " | Vice-Chancellor: Prof. Uduma Oji Uduma -- VC name confirmed (appointed Oct 2025, assumed office 11 Feb 2026, succeeding Olufemi Ayinde Peters).", name: "National Open University of Nigeria -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Ugochukwu Bond Anyaehie", noteAddition: " | Vice-Chancellor: Prof. Ugochukwu Bond Anyaehie -- VC name confirmed (appointed substantive VC effective 18 Nov 2025).", name: "Nnamdi Azikiwe University -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Samuel Ekundayo Oladipo", noteAddition: " | Vice-Chancellor: Prof. Samuel Ekundayo Oladipo -- VC name confirmed; his Google Scholar profile shows only a domain-level verified email (tasu.edu.ng), not a full address.", name: "Tai Solarin Federal University of Education -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Edoba Bright Omoregie", noteAddition: " | Vice-Chancellor: Prof. Edoba Bright Omoregie -- VC name confirmed.", name: "University of Benin -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Offiong Efanga Offiong", noteAddition: " | Vice-Chancellor: Prof. Offiong Efanga Offiong -- VC name confirmed.", name: "University of Calabar -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Mohammed Laminu Mele", noteAddition: " | Vice-Chancellor: Prof. Mohammed Laminu Mele -- VC name confirmed.", name: "University of Maiduguri -- Careers/Alumni Office" } },
    );
    await queryInterface.sequelize.query(
      `UPDATE partners SET contact_name = :contactName, notes = COALESCE(notes, '') || :noteAddition, updated_at = now()
       WHERE name = :name AND category = 'University Career Centre' AND contact_name IS NULL`,
      { replacements: { contactName: "Prof. Bashir Garba", noteAddition: " | Vice-Chancellor: Prof. Bashir Garba -- VC name confirmed.", name: "Usmanu Danfodiyo University -- Careers/Alumni Office" } },
    );
  },

  down: async (_queryInterface: QueryInterface) => {
    // Deliberately a no-op -- same reasoning as the earlier contact-fill migrations.
  },
};
