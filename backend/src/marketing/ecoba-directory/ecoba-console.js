// ---------- Emblem ----------
const PLACEHOLDER = `<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" aria-label="Placeholder crest"><path d="M100 6 L188 34 V112 C188 168 148 204 100 224 C52 204 12 168 12 112 V34 Z" fill="#0F2340" stroke="#C29A3B" stroke-width="7"/><text x="100" y="118" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#F3E7C8">ECOBA</text></svg>`;
(function(){const img=new Image();
  img.onload=()=>{document.getElementById('wm').innerHTML='<img src="ecoba-logo.svg" alt="">';document.getElementById('mark').innerHTML='<img src="ecoba-logo.svg" alt="ECOBA emblem">';if(typeof S!=='undefined'&&!S.user)render();};
  img.onerror=()=>{document.getElementById('wm').innerHTML=PLACEHOLDER;document.getElementById('mark').innerHTML=PLACEHOLDER;if(typeof S!=='undefined'&&!S.user)render();};
  img.src='ecoba-logo.svg';})();

// ---------- Helpers ----------
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = n => n.split(' ').map(p=>p[0]).slice(0,2).join('');
const fmt = n => n.toLocaleString('en-GB');
const ago = d => d<1?`${Math.max(1,Math.round(d*24))}h ago`:d<2?'1 day ago':`${Math.round(d)} days ago`;
const TIER = {T1:['b-t1','Tier 1 · archive'],T2:['b-t2','Tier 2 · peer review'],T3:['b-t3','Tier 3 · admin'],UN:['b-un','Unverified']};
const badge = t => `<span class="badge ${TIER[t][0]}">${TIER[t][1]}</span>`;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600);}
function openModal(html){$('#modalBox').innerHTML=html;$('#modal').classList.add('open');}
function closeModal(){$('#modal').classList.remove('open');}

// ---------- Sample data (fictional) ----------
const EXEC_SETS=[1975,2003,2010];
const ARCHIVE_GAPS=[1967,1968,1975,1983];
const DIR_URL='directory.html';
const ROLES={
 super:{name:'Super Admin',grp:'System administrators',user:'National Secretariat',email:'superadmin@example.org',scope:'Whole platform',
   can:['Everything a Data Coordinator can do','Decide Tier 3 disputes (two people claiming one record)','Change the match threshold, vouch rule, privacy and safety settings','Add, remove and hand over admins and officers; require MFA','See and export the full audit log'],
   cannot:['Delete audit log entries (nobody can)']},
 admin:{name:'Data Coordinator',grp:'System administrators',user:'Digital Engagement & Data Coordinator',email:'coordinator@example.org',scope:'Whole platform, day to day',
   can:['Work the verification queue, including override approvals (logged)','Digitise registers: OCR/HTR batches and double-key reconciliation','Manage members: view, suspend, reinstate, export with a reason','Approve business listings, run events, check-in and announcements','Handle reports and scraping alerts; watch system health and backups','Prepare evidence for disputes; update the 2026 roadmap'],
   cannot:['Decide Tier 3 disputes','Change settings and thresholds','Add or remove admins']},
 exec:{name:'Class Set / Regional Exec',grp:'Class Set & Regional Executives',user:'Ikponmwosa Ugiagbe',email:'set2003.exec@example.org',scope:'Sets 1975, 2003 and 2010',
   can:['Review claims from your own sets: vouch, approve (after 2 vouches), reject, ask for information','View and flag members of your sets','Create set or regional events and check people in','Send announcements to your sets','See audit entries for your sets'],
   cannot:['See other sets or regions','Suspend or export members','Override the vouch rule']},
 champion:{name:'ECOBA Champion',grp:'Portfolio officers',user:'ECOBA Champion',email:'champion@example.org',scope:'Read-only oversight',
   can:['See the overview and the 5-Pillar figures','Read Insights and download the board report','Follow the 2026 roadmap and testing progress'],
   cannot:['Change any record','See individual verification cases']},
 secretary:{name:'Secretary',grp:'Portfolio officers',user:'National Secretary',email:'secretary@example.org',scope:'Membership register',
   can:['Read the official membership register and flag records','Read the audit log, including verification decisions','Send meeting notices and announcements'],
   cannot:['Approve, suspend or edit members','Change settings']},
 comms:{name:'Communications Officer',grp:'Portfolio officers',user:'Communications Officer',email:'comms@example.org',scope:'Announcements and events',
   can:['Send announcements to any segment by email, WhatsApp or in-app','Use and edit templates; see open rates','Send event reminders and view attendee lists'],
   cannot:['See member contact details','Change members or verification']},
 biz:{name:'Business Network Lead',grp:'Portfolio officers',user:'Business Network Lead',email:'business@example.org',scope:'Business showcase',
   can:['Approve, reject, feature or take down business listings','Manage the category taxonomy and referral / partnership directories'],
   cannot:['Change members, verification or settings']},
 mentor:{name:'Mentorship Lead',grp:'Portfolio officers',user:'Mentorship Lead',email:'mentorship@example.org',scope:'Mentorship',
   can:['Approve automated mentor pairings','Nudge mentors and suggest other mentors','Track acceptance and reply times'],
   cannot:['Change members, verification or settings']},
 diaspora:{name:'Diaspora Relations Officer',grp:'Portfolio officers',user:'Diaspora Relations Officer',email:'diaspora@example.org',scope:'Chapters and events',
   can:['Manage chapters and assign chapter coordinators','Create diaspora events, send reminders, check people in'],
   cannot:['Change members, verification or settings']},
};
const ROLE_NAME=Object.fromEntries(Object.entries(ROLES).map(([k,v])=>[k,v.name]));
const S = {
  role:'super', view:'overview', user:null, login:{role:'super',step:1},
  threshold:85, vouchesNeeded:2,
  totals:{members:4812, verified:3967, countries:31, chapters:14, newWeek:96},
  settings:{guestIndustry:true, guestSet:true, defPhone:false, defEmail:false, defSocial:true, maskContacts:true, msgLimit:20, viewThrottle:150, waReminders:true, mentorAuto:true, retention:24},
  memberFilter:{q:'',tier:'',status:'',decade:''},
  regYear:2003, auditFilter:'', aud:{decades:new Set(),countries:new Set(),mentors:false,verifiedOnly:true}, channel:'Email',
  queue:[
    {id:'q1',who:'Osahon Okundaye',set:2003,email:'o.okundaye@example.com',record:'OKUNDAYE Osahon',score:100,vouches:0,age:.2,status:'pending',city:'Lagos'},
    {id:'q2',who:'Itohan Aghedo',set:2003,email:'itohan.a@example.com',record:'AGHEDO Itohan',score:92,vouches:0,age:.5,status:'pending',city:'Houston'},
    {id:'q3',who:'Nosakhare Egharevba',set:2010,email:'nosa.e@example.com',record:'EGHAREVBA Nosakhare',score:88,vouches:0,age:1.1,status:'pending',city:'Benin City'},
    {id:'q4',who:'Eghosa Osagie Jnr',set:1997,email:'eghosa.jnr@example.com',record:'OSAGIE Eghosa',score:83,vouches:1,age:2.4,status:'pending',city:'London'},
    {id:'q5',who:'Ikpomwosa Obasuyi',set:1990,email:'ik.obasuyi@example.com',record:'OBASUYI Ikponmwosa',score:80,vouches:2,age:3.2,status:'pending',city:'Abuja'},
    {id:'q6',who:'Victor Omoruyi Idahosa',set:2010,email:'v.idahosa@example.com',record:'IDAHOSA Omoruyi',score:71,vouches:1,age:4.8,status:'pending',city:'Toronto'},
    {id:'q7',who:'Ehigie Osemwota',set:1975,email:'ehigie.o@example.com',record:'(no register for 1975)',score:0,gap:true,vouches:2,age:6.0,status:'pending',city:'Benin City'},
    {id:'q8',who:'Edosa Iyoha',set:1968,email:'edosa.iyoha@example.com',record:'(no register for 1968)',score:0,gap:true,vouches:0,age:9.5,status:'pending',city:'Atlanta'},
    {id:'q9',who:'Aimuan Ogbebor',set:2003,email:'aimuan.o@example.com',record:'OGBEBOR Aimuamwosa',score:64,vouches:0,age:11.0,status:'pending',city:'Dubai'},
  ],
  disputes:[
    {id:'d1',record:'EBOHON Osaze',set:1986,age:5,status:'open',
     a:{name:'Osaze Ebohon',city:'London, UK',joined:'12 Sep 2026',ev:['2 classmates vouched (Set 1986)','Uploaded set photo, 1986','Email matches 2019 reunion list']},
     b:{name:'Osaze K. Ebohon',city:'Lagos, Nigeria',joined:'3 Oct 2026',ev:['WAEC certificate uploaded (1986)','1 classmate vouched','Phone number new to the platform']}},
    {id:'d2',record:'IGBINEDION Osayuki',set:1999,age:2,status:'open',
     a:{name:'Osayuki Igbinedion',city:'Abuja, Nigeria',joined:'1 Oct 2026',ev:['Exact name match (100%)','House captain listed in 1999 magazine']},
     b:{name:'Osayuki Igbinedion',city:'Manchester, UK',joined:'18 Oct 2026',ev:['Exact name match (100%)','No vouches yet','Uploaded school ID card']}},
  ],
  members:[
    {id:1,name:"Osaro Igbinoba",set:1988,city:"Lagos",country:"Nigeria",industry:"Banking & Finance",tier:"T1",status:"Active",last:1,mentor:true},
    {id:2,name:"Efosa Ogiemwonyi",set:1995,city:"London",country:"United Kingdom",industry:"Technology",tier:"T1",status:"Active",last:0.3,mentor:true},
    {id:3,name:"Nosa Aiyevbekpen",set:2004,city:"Benin City",country:"Nigeria",industry:"Health",tier:"T2",status:"Active",last:4,mentor:true},
    {id:4,name:"Idemudia Ehigiator",set:1979,city:"Houston",country:"United States",industry:"Oil & Gas",tier:"T1",status:"Active",last:12,mentor:true},
    {id:5,name:"Ehis Okhuoya",set:2012,city:"Abuja",country:"Nigeria",industry:"Law",tier:"T2",status:"Active",last:2,mentor:false},
    {id:6,name:"Osagie Edokpolo",set:2001,city:"Toronto",country:"Canada",industry:"Technology",tier:"T1",status:"Active",last:1,mentor:true},
    {id:7,name:"Uyi Omoregbee",set:1992,city:"Lagos",country:"Nigeria",industry:"Real Estate",tier:"T3",status:"Active",last:30,mentor:false},
    {id:8,name:"Imuetinyan Osayande",set:2016,city:"Benin City",country:"Nigeria",industry:"Education",tier:"T1",status:"Active",last:6,mentor:false},
    {id:9,name:"Aisosa Erhabor",set:2009,city:"Dubai",country:"UAE",industry:"Oil & Gas",tier:"T2",status:"Active",last:3,mentor:true},
    {id:10,name:"Ofure Iyamu",set:1985,city:"Port Harcourt",country:"Nigeria",industry:"Engineering",tier:"T1",status:"Active",last:8,mentor:true},
    {id:11,name:"Ekhator Uwaifo",set:2019,city:"Lagos",country:"Nigeria",industry:"Media & Marketing",tier:"UN",status:"Unverified",last:40,mentor:false},
    {id:12,name:"Izevbekhai Osemwegie",set:1998,city:"Manchester",country:"United Kingdom",industry:"Health",tier:"T1",status:"Active",last:2,mentor:true},
    {id:13,name:"Omosigho Ize-Iyamu",set:2007,city:"Abuja",country:"Nigeria",industry:"Public Service",tier:"T2",status:"Active",last:15,mentor:false},
    {id:14,name:"Osamudiamen Eweka",set:1990,city:"Atlanta",country:"United States",industry:"Banking & Finance",tier:"T1",status:"Active",last:5,mentor:true},
    {id:15,name:"Ikponmwosa Ugiagbe",set:2003,city:"Benin City",country:"Nigeria",industry:"Agriculture",tier:"T1",status:"Active",last:1,mentor:false},
    {id:16,name:"Osayi Imafidon",set:2010,city:"Lagos",country:"Nigeria",industry:"Technology",tier:"T2",status:"Suspended",last:22,mentor:false,flag:'Bulk profile viewing (scraping alert)'},
    {id:17,name:"Eseosa Ekhaguere",set:1975,city:"Benin City",country:"Nigeria",industry:"Education",tier:"T2",status:"Active",last:9,mentor:true},
    {id:18,name:"Iyobosa Okoro",set:2003,city:"Washington DC",country:"United States",industry:"Public Service",tier:"UN",status:"Unverified",last:60,mentor:false},
  ],
  businesses:[
    {id:'b1',type:'Partnership',name:"(Sample) Ikpoba Agro Processing",owner:"Uyi Omoregbee (Set '92)",cat:"Agriculture",city:"Benin City",offer:"10% partner rate for ECOBITEs",status:"Approved",featured:true,age:40},
    {id:'b2',type:'Referral partner',name:"(Sample) Ogba Data Labs",owner:"Osagie Edokpolo (Set '01)",cat:"Technology",city:"Toronto / Lagos",offer:"Free data-strategy call",status:"Approved",featured:false,age:21},
    {id:'b3',type:'Business',name:"(Sample) Ring Road Legal",owner:"Ehis Okhuoya (Set '12)",cat:"Legal",city:"Abuja",offer:"Discounted company registration",status:"Approved",featured:false,age:18},
    {id:'b4',type:'Partnership',name:"(Sample) Sapele Road Solar",owner:"Ofure Iyamu (Set '85)",cat:"Energy",city:"Port Harcourt",offer:"Site survey at cost",status:"Pending",featured:false,age:3},
    {id:'b5',type:'Business',name:"(Sample) Oba Market Logistics",owner:"Ikponmwosa Ugiagbe (Set '03)",cat:"Logistics",city:"Benin City",offer:"Free first delivery",status:"Pending",featured:false,age:1},
    {id:'b6',type:'Business',name:"(Sample) QuickCash Investments",owner:"Unverified member",cat:"Finance",city:"Lagos",offer:"Guaranteed 40% monthly returns",status:"Pending",featured:false,age:1,risk:'Unrealistic returns claim; owner unverified'},
  ],
  mentor:[
    {id:'m1',mentee:"Imuetinyan Osayande (2016)",mentor:"Efosa Ogiemwonyi (1995)",area:"Technology",age:2,status:"Pending"},
    {id:'m2',mentee:"Ekhator Uwaifo (2019)",mentor:"Osaro Igbinoba (1988)",area:"Banking & Finance",age:17,status:"Pending"},
    {id:'m3',mentee:"Ehis Okhuoya (2012)",mentor:"Idemudia Ehigiator (1979)",area:"Oil & Gas",age:9,status:"Accepted"},
    {id:'m4',mentee:"Ikponmwosa Ugiagbe (2003)",mentor:"Ofure Iyamu (1985)",area:"Engineering",age:25,status:"Accepted"},
    {id:'m5',mentee:"Osayi Imafidon (2010)",mentor:"Osagie Edokpolo (2001)",area:"Technology",age:20,status:"Declined"},
    {id:'m6',mentee:"Omosigho Ize-Iyamu (2007)",mentor:"Izevbekhai Osemwegie (1998)",area:"Health",age:15,status:"Pending"},
  ],
  events:[
    {id:'e1',title:"ECOBA Professional Forum: Careers in Energy Transition",date:"2026-11-14",mode:"Zoom",place:"Online",seats:300,taken:212,checked:0,set:null,link:'Zoom webinar'},
    {id:'e2',title:"Diaspora Chapters Mixer (UK)",date:"2026-11-28",mode:"In person",place:"London",seats:120,taken:74,checked:0,set:null,link:''},
    {id:'e3',title:"ECOBA Annual Summit 2026",date:"2026-12-19",mode:"In person + live stream",place:"Edo College, Benin City",seats:1500,taken:931,checked:0,set:null,link:'Microsoft Teams live event'},
    {id:'e4',title:"Set of 2003: 23rd Anniversary Dinner",date:"2026-11-07",mode:"In person",place:"Benin City",seats:90,taken:61,checked:0,set:2003,link:''},
  ],
  reports:[
    {id:'r1',type:'Fake identity',target:'Iyobosa Okoro (2003)',by:'Ikponmwosa Ugiagbe (2003)',detail:'"Nobody in our set knows this person; the photo is a stock image."',age:1,status:'Open'},
    {id:'r2',type:'Scraping alert',target:'Osayi Imafidon (2010)',by:'System',detail:'Viewed 340 profiles in 52 minutes. Automatically throttled and suspended pending review.',age:2,status:'Open'},
    {id:'r3',type:'Spam message',target:'Ekhator Uwaifo (2019)',by:'Osaro Igbinoba (1988)',detail:'Sent the same investment pitch to 28 members.',age:3,status:'Open'},
    {id:'r4',type:'Misleading listing',target:'QuickCash Investments',by:'Ehis Okhuoya (2012)',detail:'Listing promises guaranteed 40% monthly returns.',age:1,status:'Open'},
    {id:'r5',type:'Offensive comment',target:'Event chat: Annual Summit',by:'Aisosa Erhabor (2009)',detail:'Political insult in event discussion thread.',age:8,status:'Resolved'},
  ],
  dsar:[
    {who:'Uyi Omoregbee (1992)',type:'Download my data',age:3,due:27},
    {who:'Former member (2014)',type:'Delete my account',age:12,due:18},
  ],
  chapters:[
    {name:'Benin City (Home)',country:'Nigeria',coord:'Eseosa Ekhaguere',members:1290,last:'12 Oct 2026'},
    {name:'Lagos',country:'Nigeria',coord:'Osaro Igbinoba',members:1104,last:'4 Oct 2026'},
    {name:'Abuja',country:'Nigeria',coord:'Omosigho Ize-Iyamu',members:512,last:'20 Sep 2026'},
    {name:'Port Harcourt',country:'Nigeria',coord:'Ofure Iyamu',members:288,last:'2 Aug 2026'},
    {name:'United Kingdom',country:'United Kingdom',coord:'Izevbekhai Osemwegie',members:596,last:'10 Oct 2026'},
    {name:'USA (East)',country:'United States',coord:'Osamudiamen Eweka',members:341,last:'27 Sep 2026'},
    {name:'USA (South)',country:'United States',coord:'Idemudia Ehigiator',members:219,last:'5 Jul 2026'},
    {name:'Canada',country:'Canada',coord:'Osagie Edokpolo',members:174,last:'14 Sep 2026'},
    {name:'Middle East',country:'UAE',coord:'',members:96,last:'none yet'},
  ],
  sets:[
    {set:1975,exec:'Eseosa Ekhaguere',members:41,verified:38},{set:1985,exec:'Ofure Iyamu',members:118,verified:109},
    {set:1990,exec:'Osamudiamen Eweka',members:131,verified:122},{set:1997,exec:'',members:96,verified:71},
    {set:2003,exec:'Ikponmwosa Ugiagbe',members:164,verified:149},{set:2010,exec:'Osayi Imafidon',members:152,verified:120,note:'Executive suspended'},
    {set:2016,exec:'',members:88,verified:52},{set:2019,exec:'',members:63,verified:30},
  ],
  admins:[
    {name:'Super Admin (ECOBA National Secretariat)',role:'super',scope:'Everything',twofa:true,last:'Today 09:12'},
    {name:'Digital Engagement & Data Coordinator',role:'admin',scope:'Directory Engine, Engagement Infrastructure, Security, Analytics',twofa:true,last:'Today 08:40'},
    {name:'Deputy Data Coordinator',role:'admin',scope:'Registers and verification',twofa:false,last:'Yesterday 17:03'},
    {name:'Ikponmwosa Ugiagbe',role:'exec',scope:'Set of 2003',twofa:true,last:'Today 07:55'},
    {name:'Eseosa Ekhaguere',role:'exec',scope:'Set of 1975',twofa:false,last:'3 days ago'},
    {name:'Lagos Regional Exec (sample)',role:'exec',scope:'Lagos region',twofa:true,last:'2 days ago'},
  ],
  batches:[
    {id:'g1',year:1948,src:'Admission register',pages:34,kind:'Handwritten, fragile',method:'Double-key entry',stage:0,conf:'n/a'},
    {id:'g2',year:1953,src:'Graduation list',pages:12,kind:'Faded typescript',method:'OCR, then double-key',stage:1,conf:'OCR 74%'},
    {id:'g3',year:1994,src:'Admission register',pages:58,kind:'Handwritten, water-damaged',method:'Double-key entry',stage:2,conf:'Keyers agree 96.4%'},
    {id:'g4',year:1991,src:'Admission register',pages:61,kind:'Handwritten',method:'HTR',stage:3,conf:'HTR 88%'},
    {id:'g5',year:2008,src:'Yearbook',pages:120,kind:'Printed',method:'OCR',stage:4,conf:'OCR 98%'},
    {id:'g6',year:2009,src:'Graduation list',pages:9,kind:'Printed',method:'OCR',stage:5,conf:'OCR 99%'},
  ],
  recon:[
    {id:'x1',batch:'g3',line:'p.14 line 7',field:'Surname',a:'OMORODION',b:'OMORODIAN',status:'open'},
    {id:'x2',batch:'g3',line:'p.14 line 9',field:'First name',a:'Nosakhare',b:'Nosakhore',status:'open'},
    {id:'x3',batch:'g3',line:'p.22 line 3',field:'Admission no.',a:'7714',b:'7741',status:'open'},
    {id:'x4',batch:'g3',line:'p.31 line 12',field:'Year left',a:'1994',b:'1999',status:'open'},
  ],
  pairs:[
    {id:'p1',mentee:'Imuetinyan Osayande (2016)',mentor:'Osagie Edokpolo (2001)',area:'Technology',why:'Profession: EdTech / data · Interest: machine learning · Goal: research career',score:91},
    {id:'p2',mentee:'Nosakhare Egharevba (2010)',mentor:'Aisosa Erhabor (2009)',area:'Oil & Gas',why:'Profession: HSE · Goal: move to the Gulf · Location: Dubai',score:86},
    {id:'p3',mentee:'Omosigho Ize-Iyamu (2007)',mentor:'Osaro Igbinoba (1988)',area:'Banking & Finance',why:'Interest: development finance · Goal: board roles',score:78},
  ],
  taxonomy:{Agriculture:6,Energy:5,Legal:4,Technology:11,Health:7,Finance:5,Logistics:3,'Real Estate':4,Education:2},
  roadmap:[
    {q:'Q1 2026',phase:'Phase 1 · Digital Foundation',items:[['Deploy database schemas','Done'],['Launch intake portals','Done'],['Run OCR/HTR on archive registers','In progress'],['Establish the 3-Tier Verification Engine','Done']]},
    {q:'Q2 2026',phase:'Phase 2',items:[['Launch the Professional / Business Directory','Done'],['Launch the Mentorship Matching System','Done']]},
    {q:'Q3 2026',phase:'Phase 3',items:[['Deploy the Event Professional Forum','Done'],['Webinar registration and reminders','In progress']]},
    {q:'Q4 2026',phase:'Phase 4 · Intelligence Platform',items:[['Annual Summit QR check-in','In progress'],['Executive Power BI dashboards','Not started']]},
  ],
  qa:[
    ['Unit tests: matching engine (exact, fuzzy 85%, name order, within-year)','48 of 48 passing','b-ok'],
    ['User Acceptance Testing with Class Set Executives','2 of 3 sessions done','b-warn'],
    ['Security penetration test','Booked: 30 Nov 2026, before the Summit','b-info'],
    ['Load test: Summit peak traffic','Passed at 3,400 concurrent users','b-ok'],
  ],
  broadcasts:[
    {when:'21 Oct 2026',title:'Annual Summit: registration open',aud:'All verified members',ch:'Email + WhatsApp',sent:3967,opens:'61%'},
    {when:'14 Oct 2026',title:'UK Mixer: save the date',aud:'Country: United Kingdom',ch:'Email',sent:596,opens:'58%'},
    {when:'2 Oct 2026',title:'Claim your profile reminder',aud:'Unclaimed register records (email known)',ch:'Email',sent:1240,opens:'44%'},
  ],
  audit:[
    {t:'09:14',who:'Data Coordinator',type:'verification',what:'Approved Tier 2 claim: Osaze Imade (Set 2001), 2 vouches'},
    {t:'08:52',who:'System',type:'security',what:'Throttled Osayi Imafidon: 340 profile views in 52 min'},
    {t:'08:30',who:'Ikponmwosa Ugiagbe',type:'verification',what:'Vouched for Itohan Aghedo (Set 2003)'},
    {t:'Yesterday',who:'Super Admin',type:'settings',what:'Changed message limit from 30 to 20 per day'},
    {t:'Yesterday',who:'Deputy Data Coordinator',type:'content',what:'Approved business listing: Ring Road Legal'},
    {t:'2 days ago',who:'Super Admin',type:'registers',what:'Uploaded register CSV for 2009 (184 records)'},
  ],
};
S.members.forEach(m=>{ if(m.status==='Suspended') m.wasStatus='Active'; });

// Register coverage 1937 to 2026 (deterministic sample)
const YEARS=[]; for(let y=1937;y<=2026;y++){
  let st = ARCHIVE_GAPS.includes(y)?'gap' : y<1950?(y%4===0?'part':'none') : y<1962?(y%3===0?'part':'done') : [1991,1994,2008].includes(y)?'part':'done';
  const recs = st==='none'||st==='gap'?0: Math.round(60+((y*37)%90)+(y-1937)*1.3) * (st==='part'?.6:1) |0;
  const claimRate = st==='none'||st==='gap'?0: Math.min(.93, .25+(y-1937)/120 + ((y*13)%10)/100);
  YEARS.push({y,st,recs,claimed:Math.round(recs*claimRate),rebuilt: st==='gap'?[23,31,17,9][ARCHIVE_GAPS.indexOf(y)]:0});
}

// ---------- Permissions ----------
const MODULES=[
  {g:'Dashboard',id:'overview',label:'Overview',roles:['super','admin','exec','champion','secretary','comms','biz','mentor','diaspora']},
  {g:'Pillar 1 · Member Identity',id:'queue',label:'Verification queue',roles:['super','admin','exec'],count:()=>pendingQueue().length},
  {g:'Pillar 1 · Member Identity',id:'disputes',label:'Disputes (Tier 3)',roles:['super','admin'],count:()=>S.disputes.filter(d=>d.status==='open').length},
  {g:'Pillar 1 · Member Identity',id:'registers',label:'Archive registers',roles:['super','admin']},
  {g:'Pillar 1 · Member Identity',id:'digitise',label:'Digitisation (OCR/HTR)',roles:['super','admin'],count:()=>S.recon.filter(x=>x.status==='open').length},
  {g:'Pillar 1 · Member Identity',id:'members',label:'Members',roles:['super','admin','exec','secretary']},
  {g:'Pillar 2 · Engagement',id:'events',label:'Events & check-in',roles:['super','admin','exec','comms','diaspora']},
  {g:'Pillar 2 · Engagement',id:'mentorship',label:'Mentorship',roles:['super','admin','mentor'],count:()=>S.mentor.filter(m=>m.status==='Pending'&&m.age>14).length},
  {g:'Pillar 3 · Collaboration',id:'business',label:'Business showcase',roles:['super','admin','biz'],count:()=>S.businesses.filter(b=>b.status==='Pending').length},
  {g:'Pillar 3 · Collaboration',id:'chapters',label:'Chapters & class sets',roles:['super','admin','diaspora'],count:()=>S.sets.filter(s=>!s.exec||s.note).length+S.chapters.filter(c=>!c.coord).length},
  {g:'Pillar 4 · Communication',id:'comms',label:'Announcements',roles:['super','admin','exec','comms','secretary']},
  {g:'Pillar 5 · Intelligence',id:'insights',label:'Insights',roles:['super','admin','champion']},
  {g:'Security & governance',id:'moderation',label:'Reports & anti-scraping',roles:['super','admin'],count:()=>S.reports.filter(r=>r.status==='Open').length},
  {g:'Security & governance',id:'audit',label:'Audit log',roles:['super','admin','exec','secretary']},
  {g:'Security & governance',id:'settings',label:'Privacy & data governance',roles:['super','admin']},
  {g:'Security & governance',id:'system',label:'System health & recovery',roles:['super','admin']},
  {g:'Programme',id:'roles',label:'Roles & collaboration',roles:['super']},
  {g:'Programme',id:'roadmap',label:'2026 roadmap & testing',roles:['super','admin','champion']},
  {g:'Programme',id:'guide',label:'Feature guide',roles:['super','admin','exec','champion','secretary','comms','biz','mentor','diaspora']},
];
const can = id => MODULES.find(m=>m.id===id).roles.includes(S.role);
const inScope = set => S.role!=='exec' || EXEC_SETS.includes(set);
const routeOf = q => q.gap ? 'T2' : q.score>=S.threshold ? 'T1' : 'T2';
const pendingQueue = () => S.queue.filter(q=>q.status==='pending' && routeOf(q)==='T2' && inScope(q.set));
const autoQueue = () => S.queue.filter(q=>q.status==='pending' && routeOf(q)==='T1' && inScope(q.set));
const scopedMembers = () => S.members.filter(m=>inScope(m.set));
function log(type,what){ const d=new Date(); S.audit.unshift({t:d.toTimeString().slice(0,5),who:S.role==='exec'?'Ikponmwosa Ugiagbe (Set Exec)':ROLES[S.role].user,type,what}); }

// ---------- Sidebar ----------
function side(){
  let html='',g='';
  for(const m of MODULES){
    if(!m.roles.includes(S.role)) continue;
    if(m.g!==g){g=m.g;html+=`<h6>${g}</h6>`;}
    const n=m.count?m.count():0;
    html+=`<button data-view="${m.id}" class="${S.view===m.id?'on':''}">${m.label}<span class="cnt ${n?'':'zero'}">${n}</span></button>`;
  }
  $('#side').innerHTML=html;
}

// ---------- Views ----------
const hero=(t,p,right='')=>`<div class="hero"><div><h1>${t}</h1>${p?`<p>${p}</p>`:''}</div>${right}</div>`;
const kpi=(v,l,trend='',cls='')=>`<div class="kpi ${cls}"><b>${v}</b><span>${l}</span>${trend}</div>`;

function overview(){
  const exec=S.role==='exec';
  const pend=pendingQueue().length, auto=autoQueue().length;
  const disputes=S.disputes.filter(d=>d.status==='open').length;
  const bizP=S.businesses.filter(b=>b.status==='Pending').length;
  const reps=S.reports.filter(r=>r.status==='Open').length;
  const stale=S.mentor.filter(m=>m.status==='Pending'&&m.age>14).length;
  const noExec=S.sets.filter(s=>!s.exec||s.note).length;
  const weeks=[38,44,41,57,63,52,71,66,80,74,88,S.totals.newWeek];
  const max=Math.max(...weeks);
  const wl=['3 Aug','10','17','24','31','7 Sep','14','21','28','5 Oct','12','19 Oct'];
  const todo=[
    [pend,'claims waiting for peer review','queue'],
    ...(exec?[]:[[disputes,'disputed records (two people, one name)','disputes'],[reps,'open reports and safety alerts','moderation'],[bizP,'business listings to approve','business'],[stale,'mentorship requests unanswered 14+ days','mentorship'],[noExec,'class sets or chapters without a leader','chapters'],[S.recon.filter(x=>x.status==='open').length,'double-key mismatches to reconcile','digitise'],[S.dsar.length,'data-protection requests (30-day deadline)','settings']])
  ].filter(x=>x[0]>0&&can(x[2]));
  if(exec){
    const mine=S.sets.filter(s=>EXEC_SETS.includes(s.set));
    const tm=mine.reduce((a,s)=>a+s.members,0), tv=mine.reduce((a,s)=>a+s.verified,0);
    return hero('Good morning, Class Set Executive','Your sets: 1975, 2003 and 2010. You review claims, vouch for classmates and run set events.')+
    `<div class="kpis">${kpi(fmt(tm),'members in your sets')}${kpi(Math.round(tv/tm*100)+'%','verified')}${kpi(pend,'claims need your review','',pend?'alert':'')}${kpi(S.events.filter(e=>e.set&&EXEC_SETS.includes(e.set)).length,'set events coming up')}</div>
    <div class="three"><div class="panel"><h3>Needs your attention</h3>${todoList(todo)}</div>
    <div class="panel"><h3>Your sets</h3>${mine.map(s=>`<div class="hbar"><span>Set of ${s.set}</span><div class="bar"><i style="width:${s.verified/s.members*100}%"></i></div><b>${Math.round(s.verified/s.members*100)}%</b></div>`).join('')}<p class="note">Share of each set's members who are verified.</p></div></div>
    <div class="panel"><h3>Recent activity in your sets</h3>${feed(S.audit.filter(a=>/2003|2010|1975|Set Exec|Ugiagbe/.test(a.what+a.who)).slice(0,6))}</div>`;
  }
  return hero(`Good morning, ${ROLE_NAME[S.role]}`,'Everything that needs a decision today, plus how the network is growing.',can('comms')?`<button class="btn gold" data-view="comms">New announcement</button>`:'')+
  `<div class="kpis">
    ${kpi(fmt(S.totals.members),'registered members','<em class="up">▲ '+S.totals.newWeek+' this week</em>')}
    ${kpi(Math.round(S.totals.verified/S.totals.members*100)+'%','verified ('+fmt(S.totals.verified)+')','<em class="up">▲ 1.2 pts this month</em>')}
    ${kpi(pend+auto,'claims in the last 7 days','<em class="flat">'+auto+' auto-verified · '+pend+' need review</em>',pend?'alert':'')}
    ${kpi(S.totals.countries,'countries','<em class="flat">'+S.totals.chapters+' chapters</em>')}
    ${kpi('62%','monthly active members','<em class="dn">▼ 3 pts vs September</em>')}
    ${kpi(fmt(S.events.reduce((a,e)=>a+e.taken,0)),'event registrations','<em class="up">Summit 62% full</em>')}
  </div>
  <div class="pillars">${pillars()}</div>
  <div class="three">
    <div class="panel"><h3>Needs your attention <span class="sub" style="text-transform:none;letter-spacing:0">${todo.reduce((a,x)=>a+x[0],0)} items</span></h3>${todoList(todo)}</div>
    <div class="panel"><h3>Verification funnel (this month)</h3>
      ${[['Claims started',412],['Matched to a register',318],['Tier 1 auto-verified',271],['Tier 2 peer approved',96],['Tier 3 admin decided',7]].map(([k,v])=>`<div class="hbar"><span>${k}</span><div class="bar navy"><i style="width:${v/412*100}%"></i></div><b>${v}</b></div>`).join('')}
      <p class="note">Most claims verify automatically. Peer review handles weak matches and missing registers.</p></div>
  </div>
  <div class="two">
    <div class="panel"><h3>New members per week</h3><div class="cols">${weeks.map(w=>`<div style="height:${w/max*100}%" title="${w}"><span>${w}</span></div>`).join('')}</div><div class="collabels">${wl.map(l=>`<span>${l}</span>`).join('')}</div></div>
    <div class="panel"><h3>Recent activity ${can('audit')?'<button class="btn sm ghost" data-view="audit">Full audit log</button>':''}</h3>${feed(S.audit.slice(0,6))}</div>
  </div>`;
}
function pillars(){
  const P=[['Member Identity',Math.round(S.totals.verified/S.totals.members*100)+'%','verified: the single source of truth','queue'],
    ['Member Engagement','62%','of members active this month','events'],
    ['Collaboration',S.businesses.filter(b=>b.status==='Approved').length+44+' · 318','business listings · mentor pairs','business'],
    ['Communication','61%','announcement open rate','comms'],
    ['Intelligence','11.2k','directory searches this month','insights']];
  return P.map((p,i)=>`<button class="pillar" data-view="${p[3]}"><small>Pillar ${i+1} · ${p[0]}</small><b>${p[1]}</b><span>${p[2]}</span></button>`).join('');
}
function todoList(items){
  if(!items.length) return '<p class="sub">Nothing waiting. Well done.</p>';
  return `<ul class="todo">${items.map(([n,l,v])=>`<li><span style="display:flex;gap:10px;align-items:center"><span class="n">${n}</span>${l}</span><button class="btn sm ghost" data-view="${v}">Open</button></li>`).join('')}</ul>`;
}
function feed(a){ return a.length?`<ul class="feed">${a.map(x=>`<li><time>${esc(x.t)}</time><span><b>${esc(x.who)}</b> · ${esc(x.what)}</span></li>`).join('')}</ul>`:'<p class="sub">No activity yet.</p>'; }

function queue(){
  const rows=pendingQueue(), auto=autoQueue();
  const done=S.queue.filter(q=>q.status!=='pending'&&inScope(q.set));
  const exec=S.role==='exec';
  return hero('Verification queue',`Claims whose name match is below ${S.threshold}%, or whose year has no surviving register, go to peer review. A claim needs ${S.vouchesNeeded} classmate vouches before a Set Executive can approve it.${exec?' You see your sets only.':' The Data Coordinator and Super Admin can override, and every override is logged.'}`)+
  `<div class="kpis">${kpi(rows.length,'waiting for peer review','',rows.length?'alert':'')}${kpi(rows.filter(q=>q.age>7).length,'waiting over 7 days')}${kpi(auto.length,'auto-verified (Tier 1)')}${kpi(S.threshold+'%','match threshold','<em class="flat">'+(can('settings')?'<a href="#" data-view="settings">Change in Settings</a>':'Set by Super Admin')+'</em>')}</div>
  <div class="panel" style="margin-bottom:16px"><h3>Needs peer review</h3>
  ${rows.length?`<div class="tablewrap"><table><tr><th>Applicant</th><th>Set</th><th>Closest register record</th><th class="num">Match</th><th>Vouches</th><th>Waiting</th><th>Action</th></tr>
  ${rows.map(q=>{const enough=q.vouches>=S.vouchesNeeded;return `<tr><td><b>${esc(q.who)}</b><div class="sub">${esc(q.email)} · ${esc(q.city)}</div></td><td>${q.set}</td><td>${esc(q.record)}${q.gap?'<div class="sub">Archive gap year</div>':''}</td><td class="num">${q.gap?'n/a':q.score+'%'}</td>
  <td><span class="badge ${enough?'b-ok':'b-un'}">${q.vouches} of ${S.vouchesNeeded}</span></td><td>${q.age>7?`<span class="badge b-warn">${ago(q.age)}</span>`:ago(q.age)}</td>
  <td><div class="acts">${exec?`<button class="btn sm ghost" data-act="vouch" data-id="${q.id}">Vouch</button>`:''}<button class="btn sm" data-act="approve" data-id="${q.id}" ${exec&&!enough?'disabled title="Needs more vouches"':''}>${!exec&&!enough?'Override approve':'Approve'}</button><button class="btn sm ghost" data-act="info" data-id="${q.id}">Ask for info</button><button class="btn sm danger" data-act="reject" data-id="${q.id}">Reject</button></div></td></tr>`;}).join('')}</table></div>`:'<p class="sub">No claims waiting.</p>'}</div>
  <div class="two"><div class="panel"><h3>Auto-verified by register match</h3>${auto.length?`<div class="tablewrap"><table><tr><th>Member</th><th>Set</th><th>Record</th><th class="num">Match</th><th></th></tr>${auto.map(q=>`<tr><td>${esc(q.who)}</td><td>${q.set}</td><td>${esc(q.record)}</td><td class="num">${q.score}%</td><td><button class="btn sm ghost" data-act="revoke" data-id="${q.id}">Send to review</button></td></tr>`).join('')}</table></div>`:'<p class="sub">None.</p>'}
  <p class="note">Spot-check these. "Send to review" moves a claim back into peer review.</p></div>
  <div class="panel"><h3>Decided this session</h3>${done.length?`<div class="tablewrap"><table><tr><th>Applicant</th><th>Set</th><th>Outcome</th></tr>${done.map(q=>`<tr><td>${esc(q.who)}</td><td>${q.set}</td><td><span class="badge ${q.status==='approved'?'b-ok':q.status==='info'?'b-info':'b-bad'}">${q.status==='approved'?'Approved':q.status==='info'?'Info requested':'Rejected'}</span></td></tr>`).join('')}</table></div>`:'<p class="sub">Decisions you make appear here and in the audit log.</p>'}</div></div>`;
}

function disputes(){
  const sup=S.role==='super';
  return hero('Disputes (Tier 3)','Two people claim the same register record. Under the Tier 3 procedure only the Super Admin decides; the Data Coordinator prepares the evidence.')+
  S.disputes.map(d=>`<div class="panel" style="margin-bottom:16px"><h3>Record: ${esc(d.record)} · Set of ${d.set} <span>${d.status==='open'?`<span class="badge b-warn">Open ${d.age} days</span>`:`<span class="badge b-ok">${esc(d.status)}</span>`}</span></h3>
   <div class="compare">${['a','b'].map(k=>`<div class="side-c"><b>Claimant ${k.toUpperCase()}: ${esc(d[k].name)}</b><div class="sub">${esc(d[k].city)} · joined ${esc(d[k].joined)}</div><ul style="margin:8px 0 0 18px">${d[k].ev.map(e=>`<li>${esc(e)}</li>`).join('')}</ul></div>`).join('')}</div>
   ${d.status==='open'?`<div class="acts">${sup?`<button class="btn sm" data-act="award" data-id="${d.id}" data-k="a">Award to A</button><button class="btn sm" data-act="award" data-id="${d.id}" data-k="b">Award to B</button><button class="btn sm ghost" data-act="award" data-id="${d.id}" data-k="both">Both genuine: split record</button><button class="btn sm danger" data-act="award" data-id="${d.id}" data-k="none">Neither: lock record</button>`:'<span class="sub">Waiting for the Super Admin to decide.</span>'}<button class="btn sm ghost" data-act="callboth" data-id="${d.id}">Invite both to a video call</button></div>`:''}
  </div>`).join('');
}

function registers(){
  const done=YEARS.filter(y=>y.st==='done').length, part=YEARS.filter(y=>y.st==='part').length;
  const recs=YEARS.reduce((a,y)=>a+y.recs,0), claimed=YEARS.reduce((a,y)=>a+y.claimed,0);
  const y=YEARS.find(x=>x.y===S.regYear);
  return hero('Archive registers','The school\'s admission registers, graduation lists and yearbooks are the Tier 1 ground truth. Track which years are digitised, and rebuild missing years with Anchor &amp; Expand.',`<div class="acts"><button class="btn ghost" data-view="digitise">Digitisation pipeline</button><button class="btn gold" data-act="upload">Upload register CSV</button></div>`)+
  `<div class="kpis">${kpi(done+' of '+YEARS.length,'years fully digitised')}${kpi(part,'years partly digitised')}${kpi(ARCHIVE_GAPS.length,'years missing or damaged','',"alert")}${kpi(fmt(recs),'names in registers')}${kpi(Math.round(claimed/recs*100)+'%','of names claimed by a member')}</div>
  <div class="three"><div class="panel"><h3>Coverage by year (click a year)</h3>
   <div class="legend"><span><i class="y-done"></i>Digitised</span><span><i class="y-part"></i>Partly digitised</span><span><i class="y-gap"></i>Missing / damaged</span><span><i class="y-none"></i>Not started</span></div>
   <div class="years">${YEARS.map(x=>`<button class="y-${x.st} ${x.y===S.regYear?'sel':''}" data-year="${x.y}">${x.y}</button>`).join('')}</div></div>
   <div class="panel"><h3>Set of ${y.y}</h3>
   ${y.st==='gap'?`<div class="result warn"><b>No usable register.</b> Claims for ${y.y} go straight to peer review.</div><p style="margin-top:12px;font-size:14px"><b>Anchor &amp; Expand rebuild:</b> ${y.rebuilt} names confirmed so far from verified classmates' answers.</p><div class="bar" style="margin:8px 0"><i style="width:${Math.min(100,y.rebuilt)}%"></i></div><button class="btn sm" data-act="rebuild" data-year="${y.y}">Review rebuilt names</button>`
   : y.st==='none'?`<p class="sub">Not digitised yet.</p><button class="btn sm" data-act="upload" style="margin-top:10px">Upload ${y.y} register</button>`
   : `<div class="hbar"><span>Names in register</span><span></span><b>${y.recs}</b></div><div class="hbar"><span>Claimed</span><div class="bar"><i style="width:${y.claimed/y.recs*100}%"></i></div><b>${y.claimed}</b></div><div class="hbar"><span>Unclaimed</span><span></span><b>${y.recs-y.claimed}</b></div>${y.st==='part'?'<p class="note">Some pages are still to be typed in.</p>':''}
   <div class="acts" style="margin-top:12px"><button class="btn sm" data-act="nudge" data-year="${y.y}">Invite unclaimed names</button><button class="btn sm ghost" data-act="exportyear" data-year="${y.y}">Download list</button></div>`}
   </div></div>`;
}

function members(){
  const f=S.memberFilter;
  const list=scopedMembers().filter(m=>{
    if(f.q && !(m.name+' '+m.city+' '+m.industry+' '+m.set).toLowerCase().includes(f.q.toLowerCase())) return false;
    if(f.tier && m.tier!==f.tier) return false;
    if(f.status && m.status!==f.status) return false;
    if(f.decade && (m.set<+f.decade||m.set>+f.decade+9)) return false;
    return true;
  });
  const exec=S.role==='exec'||S.role==='secretary';
  return hero('Members',S.role==='secretary'?'The official membership register. Read-only: you can view records and flag problems for the Data Coordinator.':exec?'Members of your sets. You can view profiles and flag problems; suspensions are done by the Data Coordinator.':`Search, edit, suspend and export member records. Showing a sample of ${S.members.length} of ${fmt(S.totals.members)}.`,exec?'':`<button class="btn ghost" data-act="csv">Export CSV</button>`)+
  `<div class="toolbar"><input type="search" id="mq" placeholder="Search name, city, industry or set" value="${esc(f.q)}">
   <select id="mtier"><option value="">All verification</option>${Object.entries(TIER).map(([k,v])=>`<option value="${k}" ${f.tier===k?'selected':''}>${v[1]}</option>`).join('')}</select>
   <select id="mstatus"><option value="">All statuses</option>${['Active','Unverified','Suspended'].map(s=>`<option ${f.status===s?'selected':''}>${s}</option>`).join('')}</select>
   <select id="mdec"><option value="">All sets</option>${[1970,1980,1990,2000,2010].map(d=>`<option value="${d}" ${f.decade==d?'selected':''}>${d}s</option>`).join('')}</select></div>
  <div class="tablewrap"><table><tr><th>Member</th><th>Set</th><th>Location</th><th>Industry</th><th>Verification</th><th>Status</th><th>Last active</th><th>Action</th></tr>
  ${list.map(m=>`<tr><td><div class="namecell"><span class="av">${initials(m.name)}</span><div><b>${esc(m.name)}</b>${m.mentor?' <span class="badge b-gold">Mentor</span>':''}${m.flag?`<div class="sub" style="color:var(--bad)">${esc(m.flag)}</div>`:''}</div></div></td><td>${m.set}</td><td>${esc(m.city)}, ${esc(m.country)}</td><td>${esc(m.industry)}</td><td>${badge(m.tier)}</td>
  <td><span class="badge ${m.status==='Active'?'b-ok':m.status==='Suspended'?'b-bad':'b-un'}">${m.status}</span></td><td>${ago(m.last)}</td>
  <td><div class="acts"><button class="btn sm ghost" data-act="profile" data-id="${m.id}">View</button>${exec?`<button class="btn sm ghost" data-act="flag" data-id="${m.id}">Flag</button>`:m.status==='Suspended'?`<button class="btn sm" data-act="reinstate" data-id="${m.id}">Reinstate</button>`:`<button class="btn sm danger" data-act="suspend" data-id="${m.id}">Suspend</button>`}</div></td></tr>`).join('') || '<tr><td colspan="8" class="sub">No members match.</td></tr>'}
  </table></div><p class="note">Phone numbers and emails stay masked here too. Opening a member's contact details is logged.</p>`;
}

function chapters(){
  return hero('Chapters & class sets','Every set needs a Class Set Executive to review claims, and every chapter needs a coordinator to run events.')+
  `<div class="two"><div class="panel"><h3>Class Set Executives</h3><div class="tablewrap"><table><tr><th>Set</th><th>Executive</th><th class="num">Members</th><th>Verified</th><th></th></tr>
   ${S.sets.map(s=>`<tr><td>${s.set}</td><td>${s.exec?esc(s.exec):'<span class="badge b-warn">No executive</span>'}${s.note?`<div class="sub" style="color:var(--bad)">${esc(s.note)}</div>`:''}</td><td class="num">${s.members}</td><td><div class="bar"><i style="width:${s.verified/s.members*100}%"></i></div><span class="sub">${Math.round(s.verified/s.members*100)}%</span></td><td>${!s.exec||s.note?`<button class="btn sm" data-act="assign" data-set="${s.set}">Assign</button>`:'<button class="btn sm ghost" data-act="assign" data-set="'+s.set+'">Change</button>'}</td></tr>`).join('')}
   </table></div><p class="note">Sample of ${S.sets.length} sets. A set without an executive means its peer-review claims fall back to administrators.</p></div>
   <div class="panel"><h3>Chapters <button class="btn sm ghost" data-act="newchapter">Add chapter</button></h3><div class="tablewrap"><table><tr><th>Chapter</th><th>Coordinator</th><th class="num">Members</th><th>Last event</th></tr>
   ${S.chapters.map(c=>`<tr><td><b>${esc(c.name)}</b><div class="sub">${esc(c.country)}</div></td><td>${c.coord?esc(c.coord):'<span class="badge b-warn">Vacant</span>'}</td><td class="num">${fmt(c.members)}</td><td>${esc(c.last)}</td></tr>`).join('')}</table></div></div></div>`;
}

function mentorship(){
  const acc=S.mentor.filter(m=>m.status==='Accepted').length, decided=S.mentor.filter(m=>m.status!=='Pending').length;
  return hero('Mentorship','Watch requests so younger members are not left waiting. Requests unanswered for 14 days can be nudged or passed to another mentor.')+
  `<div class="kpis">${kpi('612','members open to mentoring')}${kpi(S.mentor.filter(m=>m.status==='Pending').length,'requests waiting')}${kpi(Math.round(acc/decided*100)+'%','acceptance rate')}${kpi('3.4 days','median reply time')}</div>
  <div class="tablewrap"><table><tr><th>Mentee</th><th>Mentor asked</th><th>Area</th><th>Sent</th><th>Status</th><th>Action</th></tr>
  ${S.mentor.map(m=>`<tr><td>${esc(m.mentee)}</td><td>${esc(m.mentor)}</td><td>${esc(m.area)}</td><td>${m.status==='Pending'&&m.age>14?`<span class="badge b-warn">${ago(m.age)}</span>`:ago(m.age)}</td><td><span class="badge ${m.status==='Accepted'?'b-ok':m.status==='Declined'?'b-bad':m.status==='Introduced'?'b-gold':'b-info'}">${m.status}</span></td>
  <td>${m.status==='Pending'?`<div class="acts"><button class="btn sm ghost" data-act="mnudge" data-id="${m.id}">Nudge mentor</button><button class="btn sm ghost" data-act="mreassign" data-id="${m.id}">Suggest another</button></div>`:''}</td></tr>`).join('')}</table></div>
  <p class="note">Settings: ${S.settings.mentorAuto?'automatic reminders to mentors are on':'automatic reminders are off'}.</p>
  <div class="panel" style="margin-top:16px"><h3>Automated pairing suggestions <span class="sub" style="text-transform:none;letter-spacing:0">matched on profession, interest, goals and location</span></h3>
  ${S.pairs.length?`<div class="tablewrap"><table><tr><th>Mentee</th><th>Suggested mentor</th><th>Why they match</th><th class="num">Score</th><th></th></tr>${S.pairs.map(p=>`<tr><td>${esc(p.mentee)}</td><td>${esc(p.mentor)}</td><td class="sub">${esc(p.why)}</td><td class="num">${p.score}%</td><td><button class="btn sm" data-act="pair" data-id="${p.id}">Introduce</button></td></tr>`).join('')}</table></div>`:'<p class="sub">No new suggestions. The engine runs every night.</p>'}</div>`;
}

function business(){
  return hero('Business showcase','Listings go live only after approval. Check that the owner is verified and that the offer is honest. Referral partners and partnerships appear in their own directories.')+
  `<div class="panel" style="margin-bottom:16px"><h3>Category taxonomy <button class="btn sm ghost" data-act="addcat">Add category</button></h3><div class="chips">${Object.entries(S.taxonomy).map(([k,v])=>`<span class="chip">${esc(k)} · ${v}</span>`).join('')}</div></div>
  <div class="tablewrap"><table><tr><th>Business</th><th>Owner</th><th>Category</th><th>Offer to ECOBITEs</th><th>Status</th><th>Action</th></tr>
  ${S.businesses.map(b=>`<tr><td><b>${esc(b.name)}</b><div class="sub">${esc(b.type)} · ${esc(b.city)} · submitted ${ago(b.age)}</div>${b.risk?`<div class="sub" style="color:var(--bad)">⚠ ${esc(b.risk)}</div>`:''}</td><td>${esc(b.owner)}</td><td>${esc(b.cat)}</td><td>${esc(b.offer)}</td>
  <td><span class="badge ${b.status==='Approved'?'b-ok':b.status==='Rejected'?'b-bad':'b-warn'}">${b.status}</span>${b.featured?' <span class="badge b-gold">Featured</span>':''}</td>
  <td><div class="acts">${b.status==='Pending'?`<button class="btn sm" data-act="bok" data-id="${b.id}">Approve</button><button class="btn sm danger" data-act="bno" data-id="${b.id}">Reject</button>`:b.status==='Approved'?`<button class="btn sm ghost" data-act="bfeat" data-id="${b.id}">${b.featured?'Unfeature':'Feature'}</button><button class="btn sm danger" data-act="bno" data-id="${b.id}">Take down</button>`:''}</div></td></tr>`).join('')}</table></div>`;
}

function events(){
  const list=S.events.filter(e=>S.role!=='exec'||(e.set&&EXEC_SETS.includes(e.set))||!e.set);
  const fmtD=d=>new Date(d).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
  return hero('Events & check-in','Create events, watch registrations, send reminders and check people in at the door by scanning their QR pass.',`<button class="btn gold" data-act="newevent">Create event</button>`)+
  `<div class="three"><div class="tablewrap"><table><tr><th>Event</th><th>Date</th><th>Registered</th><th>Automations</th><th class="num">Checked in</th><th>Action</th></tr>
  ${list.map(e=>`<tr><td><b>${esc(e.title)}</b><div class="sub">${esc(e.mode)} · ${esc(e.place)}${e.set?` · Set of ${e.set} only`:''}</div></td><td>${fmtD(e.date)}</td><td><div class="bar"><i style="width:${e.taken/e.seats*100}%"></i></div><span class="sub">${fmt(e.taken)} of ${fmt(e.seats)}</span></td><td><div class="steps">${e.link?`<span class="step done">${esc(e.link)}</span>`:''}<span class="step done">Calendar invite</span><span class="step done">QR passes</span><span class="step done">Reminders 7d · 1d · 1h</span></div></td><td class="num">${e.checked}</td>
  <td><div class="acts"><button class="btn sm ghost" data-act="remind" data-id="${e.id}">Send reminder</button><button class="btn sm ghost" data-act="attendees" data-id="${e.id}">Attendees</button></div></td></tr>`).join('')}</table></div>
  <div class="panel"><h3>Door check-in</h3><p class="sub" style="margin-bottom:10px">On a phone this opens the camera to scan passes. Here, type a pass code.</p>
   <div class="form-row"><select id="ciEvent">${list.map(e=>`<option value="${e.id}">${esc(e.title)}</option>`).join('')}</select></div>
   <div class="form-row"><input type="text" id="ciCode" placeholder="e.g. ECOBA-E3-4821"></div><button class="btn" data-act="checkin">Check in</button><div id="ciOut"></div>
   <p class="note">Reminders go out automatically 7 days, 1 day and 1 hour before${S.settings.waReminders?' by email and WhatsApp':' by email'}.</p></div></div>`;
}

const DECADES=[1970,1980,1990,2000,2010];
function audience(){
  const a=S.aud; let pool=scopedMembers();
  if(a.verifiedOnly) pool=pool.filter(m=>m.tier!=='UN');
  if(a.decades.size) pool=pool.filter(m=>[...a.decades].some(d=>m.set>=d&&m.set<=d+9));
  if(a.countries.size) pool=pool.filter(m=>a.countries.has(m.country));
  if(a.mentors) pool=pool.filter(m=>m.mentor);
  const base=S.role==='exec'?357:S.totals.members;
  return Math.round(pool.length/scopedMembers().length*base);
}
function comms(){
  const a=S.aud, exec=S.role==='exec';
  const countries=[...new Set(S.members.map(m=>m.country))].sort();
  return hero('Announcements',exec?'Message the members of your sets.':'Send news to everyone, or to a set, decade, country or group. Members who opted out are skipped automatically.')+
  `<div class="three"><div class="panel"><h3>New announcement</h3>
   <div class="form-row"><label>Who should get it</label>
    <div class="chips" style="margin-bottom:8px">${DECADES.map(d=>`<button class="chip ${a.decades.has(d)?'on':''}" data-aud="dec" data-v="${d}">${d}s sets</button>`).join('')}</div>
    ${exec?'':`<div class="chips" style="margin-bottom:8px">${countries.map(c=>`<button class="chip ${a.countries.has(c)?'on':''}" data-aud="cty" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>`}
    <div class="chips"><button class="chip ${a.verifiedOnly?'on':''}" data-aud="ver">Verified only</button><button class="chip ${a.mentors?'on':''}" data-aud="men">Mentors only</button></div></div>
   <div class="form-row"><label>Send by</label><div class="chips">${['Email','WhatsApp','In-app','Email + WhatsApp'].map(c=>`<button class="chip ${S.channel===c?'on':''}" data-chan="${c}">${c}</button>`).join('')}</div></div>
   <div class="form-row"><label>Subject</label><input type="text" id="bSub" placeholder="e.g. Annual Summit: final call"></div>
   <div class="form-row"><label>Message</label><textarea id="bBody" placeholder="Dear ECOBITEs…"></textarea></div>
   <div class="grid2"><div class="form-row"><label>When</label><select id="bWhen"><option>Send now</option><option>Tomorrow 9:00 WAT</option><option>Pick a date and time</option></select></div>
   <div class="form-row"><label>About</label><div class="result info" style="margin:0;padding:9px 12px">≈ <b>${fmt(audience())}</b> members will receive this</div></div></div>
   <div class="acts"><button class="btn gold" data-act="send">Send announcement</button><button class="btn ghost" data-act="testsend">Send a test to me</button></div></div>
   <div class="panel"><h3>Templates</h3>${['Event invitation','Claim-your-profile reminder','Dues reminder','Condolence notice','Set reunion save-the-date'].map(t=>`<div class="switch"><span>${t}</span><button class="btn sm ghost" data-act="tpl" data-v="${t}">Use</button></div>`).join('')}</div></div>
  <div class="panel"><h3>Sent recently</h3><div class="tablewrap"><table><tr><th>Date</th><th>Title</th><th>Audience</th><th>Channel</th><th class="num">Sent</th><th class="num">Opened</th></tr>
  ${S.broadcasts.map(b=>`<tr><td>${esc(b.when)}</td><td>${esc(b.title)}</td><td>${esc(b.aud)}</td><td>${esc(b.ch)}</td><td class="num">${fmt(b.sent)}</td><td class="num">${esc(b.opens)}</td></tr>`).join('')}</table></div></div>`;
}

function moderation(){
  return hero('Reports & anti-scraping','Reports from members, plus automatic alerts such as someone viewing hundreds of profiles quickly (a sign of data scraping).')+
  `<div class="tablewrap"><table><tr><th>Type</th><th>About</th><th>Reported by</th><th>Detail</th><th>When</th><th>Action</th></tr>
  ${S.reports.map(r=>`<tr class="${r.status!=='Open'?'done':''}"><td><span class="badge ${r.type==='Scraping alert'?'b-bad':r.type==='Fake identity'?'b-warn':'b-info'}">${esc(r.type)}</span></td><td><b>${esc(r.target)}</b></td><td>${esc(r.by)}</td><td style="max-width:300px">${esc(r.detail)}</td><td>${ago(r.age)}</td>
  <td>${r.status==='Open'?`<div class="acts"><button class="btn sm ghost" data-act="rdismiss" data-id="${r.id}">Dismiss</button><button class="btn sm ghost" data-act="rwarn" data-id="${r.id}">Warn</button><button class="btn sm danger" data-act="rsusp" data-id="${r.id}">Suspend / remove</button></div>`:`<span class="sub">${esc(r.status)}</span>`}</td></tr>`).join('')}</table></div>`;
}

function audit(){
  const types=[...new Set(S.audit.map(a=>a.type))];
  let rows=S.audit.filter(a=>!S.auditFilter||a.type===S.auditFilter);
  if(S.role==='exec') rows=rows.filter(a=>/2003|2010|1975|Set Exec|Ugiagbe/.test(a.what+a.who));
  return hero('Audit log','Every verification decision, setting change, suspension and export, with who did it and when. Verification decisions are stored in verification_logs. Entries cannot be edited or deleted.',S.role==='exec'?'':`<button class="btn ghost" data-act="csvaudit">Export</button>`)+
  `<div class="toolbar"><div class="chips"><button class="chip ${!S.auditFilter?'on':''}" data-afilter="">All</button>${types.map(t=>`<button class="chip ${S.auditFilter===t?'on':''}" data-afilter="${t}">${t}</button>`).join('')}</div></div>
  <div class="tablewrap"><table><tr><th>When</th><th>Who</th><th>Area</th><th>What happened</th></tr>${rows.map(a=>`<tr><td>${esc(a.t)}</td><td>${esc(a.who)}</td><td><span class="badge b-un">${esc(a.type)}</span></td><td>${esc(a.what)}</td></tr>`).join('')}</table></div>`;
}

function insights(){
  const by=k=>Object.entries(S.members.reduce((a,m)=>(a[m[k]]=(a[m[k]]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]);
  const bars=arr=>{const t=S.members.length;return arr.map(([k,v])=>`<div class="hbar"><span>${esc(k)}</span><div class="bar navy"><i style="width:${v/arr[0][1]*100}%"></i></div><b>${Math.round(v/t*100)}%</b></div>`).join('');};
  return hero('Insights','How the network is made up and how members use it. In the live build these come from the reporting database (Metabase or Power BI).',`<button class="btn ghost" data-act="report">Download board report (PDF)</button>`)+
  `<div class="kpis">${kpi('62%','monthly active')}${kpi('2,140','messages between members this month')}${kpi('318','mentorship pairs made this year')}${kpi('47','business listings live')}${kpi('11.2k','directory searches this month')}</div>
  <div class="two"><div class="panel"><h3>Members by industry</h3>${bars(by('industry'))}</div><div class="panel"><h3>Members by country</h3>${bars(by('country'))}</div></div>
  <div class="panel"><h3>Top searches with few results <span class="sub" style="text-transform:none;letter-spacing:0">gaps to recruit for</span></h3>
  ${[['Cardiologist',3],['Lawyer in Canada',2],['Oil & gas in Norway',1],['Architect, Abuja',4],['Investment banker, New York',2]].map(([k,v])=>`<div class="switch"><span>"${k}"</span><span class="sub">${v} results</span></div>`).join('')}</div>`;
}


const STAGES=['Scanned','Text extracted','Double-keyed','Reconciled','Names standardised','Loaded as UNCLAIMED'];
function digitise(){
  const open=S.recon.filter(x=>x.status==='open');
  return hero('Digitisation (OCR/HTR)','Turn paper registers into the archival_master_roster. Typed pages go through OCR, handwritten pages through HTR, and pages too damaged or faded for either are typed in twice by two different people (double-key entry) and the two versions reconciled.')+
  `<div class="kpis">${kpi(S.batches.length,'batches in progress')}${kpi(S.batches.reduce((a,b)=>a+b.pages,0),'pages in the pipeline')}${kpi(open.length,'double-key mismatches to resolve','',open.length?'alert':'')}${kpi(S.batches.filter(b=>b.stage===5).length,'batches loaded')}</div>
  <div class="panel" style="margin-bottom:16px"><h3>Pipeline</h3><div class="tablewrap"><table><tr><th>Year</th><th>Source</th><th>Condition</th><th>Method</th><th>Quality</th><th>Stage</th><th></th></tr>
  ${S.batches.map(b=>{const blocked=b.stage===2&&S.recon.some(x=>x.batch===b.id&&x.status==='open');return `<tr><td><b>${b.year}</b></td><td>${esc(b.src)}<div class="sub">${b.pages} pages</div></td><td>${esc(b.kind)}</td><td>${esc(b.method)}</td><td>${esc(b.conf)}</td>
  <td><div class="steps">${STAGES.map((st,i)=>`<span class="step ${i<b.stage?'done':i===b.stage?'cur':''}">${st}</span>`).join('')}</div></td>
  <td>${b.stage<5?`<button class="btn sm" data-act="advance" data-id="${b.id}" ${blocked?'disabled title="Resolve the mismatches below first"':''}>${blocked?'Resolve mismatches':'Next step'}</button>`:'<span class="badge b-ok">Live</span>'}</td></tr>`;}).join('')}</table></div>
  <p class="note">The last step creates a placeholder profile for every name with verification_status = UNCLAIMED, ready for members to claim.</p></div>
  <div class="two"><div class="panel"><h3>Double-key reconciliation · 1994 register</h3>
  ${open.length?`<div class="tablewrap"><table><tr><th>Where</th><th>Field</th><th>Keyer A</th><th>Keyer B</th><th>Decide</th></tr>${open.map(x=>`<tr><td>${esc(x.line)}</td><td>${esc(x.field)}</td><td><b>${esc(x.a)}</b></td><td><b>${esc(x.b)}</b></td><td><div class="acts"><button class="btn sm ghost" data-act="keep" data-id="${x.id}" data-k="a">A</button><button class="btn sm ghost" data-act="keep" data-id="${x.id}" data-k="b">B</button><button class="btn sm ghost" data-act="keep" data-id="${x.id}" data-k="scan">Check scan</button></div></td></tr>`).join('')}</table></div>`:'<div class="result ok">All mismatches resolved. The batch can move on.</div>'}
  <p class="note">Where the two keyers typed the same thing, it is accepted automatically. Only the differences come here.</p></div>
  <div class="panel"><h3>Name standardisation</h3><div class="tablewrap"><table><tr><th>As written</th><th>Surname</th><th>First</th><th>Other</th></tr>
  ${[['IGBINOBA, Osaro E.','IGBINOBA','Osaro','E.',''],['Osaro E. Igbinoba','IGBINOBA','Osaro','E.',''],['OGIEMWONYI Efosa (Jnr)','OGIEMWONYI','Efosa','Jnr',''],['Ehigiator Idemudia','?','?','','Order unclear: the matcher ignores name order, so this still matches']].map(r=>`<tr><td>${esc(r[0])}${r[4]?`<div class="sub">${esc(r[4])}</div>`:''}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</table></div>
  <p class="note">Claims are then matched exactly first, and if that fails by fuzzy match (Levenshtein, ${S.threshold}% or more) within the same graduation year.</p></div></div>`;
}

function system(){
  const ints=[['Identity & sign-in','Supabase Auth (magic link) + MFA for admins','ok'],['Central database','PostgreSQL','ok'],['Email','SendGrid','ok'],['WhatsApp & SMS','Twilio / WhatsApp Business API','ok'],['Video events','Zoom and Microsoft Teams','ok'],['Analytics','Metabase now, Power BI in Q4','warn']];
  const tables=[['archival_master_roster','11,906'],['alumni_bio','4,812'],['professional_profile','4,377'],['privacy_preferences','4,812'],['verification_logs','6,240'],['event_registrations','1,278']];
  return hero('System health & recovery','Service levels, connected services, backups and the disaster-recovery plan. Example tools shown; the spec lets ECOBA choose between several.',`<button class="btn ghost" data-act="restore">Run a restore test</button>`)+
  `<div class="kpis">${kpi('99.93%','uptime, last 30 days','<em class="up">Target 99.5%</em>')}${kpi('1.8 s','page load, Lagos (mobile)','<em class="up">Target under 3 s</em>')}${kpi('1.1 s','page load, London','<em class="up">Target under 2 s</em>')}${kpi('3,400','concurrent users tested','<em class="up">Summit peak ready</em>')}</div>
  <div class="two"><div class="panel"><h3>Connected services</h3>${ints.map(i=>`<div class="switch"><span>${i[0]}<div class="sub">${i[1]}</div></span><span class="badge ${i[2]==='ok'?'b-ok':'b-warn'}">${i[2]==='ok'?'Working':'Planned'}</span></div>`).join('')}</div>
  <div class="panel"><h3>Backups & disaster recovery</h3>
   <div class="switch"><span>Full backup</span><span class="sub">Nightly 02:00 WAT, kept 35 days</span></div>
   <div class="switch"><span>Point-in-time recovery</span><span class="sub">Any minute in the last 7 days</span></div>
   <div class="switch"><span>Recovery targets</span><span class="sub">Lose at most 1 hour · back online within 4 hours</span></div>
   <div class="switch"><span>Last restore test</span><span class="sub" id="lastRestore">${esc(S.lastRestore||'12 Oct 2026, passed')}</span></div>
   <div class="switch"><span>Off-site copy</span><span class="sub">Second region, encrypted (AES-256)</span></div></div></div>
  <div class="panel"><h3>Data dictionary (main tables)</h3><div class="tablewrap"><table><tr><th>Table</th><th class="num">Rows</th></tr>${tables.map(t=>`<tr><td><code>${t[0]}</code></td><td class="num">${t[1]}</td></tr>`).join('')}</table></div></div>`;
}

function roadmap(){
  const cls={Done:'b-ok','In progress':'b-warn','Not started':'b-un'};
  return hero('2026 roadmap & testing','The quarter-by-quarter plan from the specification. Click a status to update it.')+
  `<div class="two">${S.roadmap.map((q,qi)=>`<div class="panel"><h3>${q.q} <span class="sub" style="text-transform:none;letter-spacing:0">${esc(q.phase)}</span></h3>${q.items.map((it,ii)=>`<div class="switch"><span>${esc(it[0])}</span><button class="badge ${cls[it[1]]}" style="border:0;cursor:pointer" data-act="rstat" data-q="${qi}" data-i="${ii}">${it[1]}</button></div>`).join('')}</div>`).join('')}</div>
  <div class="panel"><h3>Testing & quality assurance</h3>${S.qa.map(x=>`<div class="switch"><span>${esc(x[0])}</span><span class="badge ${x[2]}">${esc(x[1])}</span></div>`).join('')}</div>`;
}

function roles(){
  if(S.role!=='super') return restricted();
  const caps=[
   ['Search the directory','yes','yes','yes','yes','names, sets, industry'],
   ['See full profiles','yes','yes','yes','yes','no'],
   ['Contact a member (masked inquiry form)','yes','yes','yes','yes','no'],
   ['List a business, request mentoring, register for events','yes','yes','yes','yes','no'],
   ['Vouch for classmates','yes','yes','own sets','own set','no'],
   ['Approve Tier 2 claims','yes','yes','own sets','no','no'],
   ['Override the vouch rule','yes','yes','no','no','no'],
   ['Resolve Tier 3 disputes','yes','no','no','no','no'],
   ['Digitise and reconcile registers','yes','yes','no','no','no'],
   ['Suspend or remove members','yes','yes','no','no','no'],
   ['Approve business listings','yes','yes','no','no','no'],
   ['Create events and send announcements','yes','yes','own sets / region','no','no'],
   ['Export member data','yes','with reason','no','own data','no'],
   ['Change settings and thresholds','yes','no','no','no','no'],
   ['Add, remove or hand over admins','yes','no','no','no','no']];
  const COLLAB=[
   ['ECOBA Champion','Monthly KPI pack and the executive dashboard','Overview, Insights, Roadmap (read-only)'],
   ['Secretary','The official verified membership register; verification logs on request','Members and Audit log (read-only), Announcements'],
   ['Communications','Segmented email and WhatsApp lists, templates, open-rate reports','Announcements, Events'],
   ['Business Network','Listing approvals, category taxonomy, referral directory','Business showcase'],
   ['Mentorship','Pairing engine, request tracking and nudges','Mentorship'],
   ['Diaspora Relations','Country chapter data and diaspora event tools','Chapters, Events'],
   ['Regional Liaison','Regional member lists and a regional exec scope','Signs in as a Regional Exec: their region only']];
  const cell=v=>v==='yes'?'<span class="yes">✓</span>':v==='no'?'<span class="no">—</span>':`<span class="part">${v}</span>`;
  return hero('Roles & collaboration','Who can do what (role-based access), and how the Digital Engagement &amp; Data Coordinator supports each officer. Keep Super Admins to two or three trusted people.',`<button class="btn gold" data-act="invite">Invite an admin</button>`)+
  `<div class="panel" style="margin-bottom:16px"><h3>People with admin rights</h3><div class="tablewrap"><table><tr><th>Name</th><th>Role</th><th>Scope</th><th>MFA</th><th>Last sign-in</th><th></th></tr>
  ${S.admins.map((a,i)=>`<tr><td><b>${esc(a.name)}</b></td><td>${ROLE_NAME[a.role]}</td><td>${esc(a.scope)}</td><td>${a.twofa?'<span class="badge b-ok">On</span>':'<span class="badge b-bad">Off</span>'}</td><td>${esc(a.last)}</td><td><div class="acts">${a.twofa?'':`<button class="btn sm ghost" data-act="force2fa" data-i="${i}">Require MFA</button>`}${i?`<button class="btn sm ghost" data-act="handover" data-i="${i}">Hand over</button>`:''}</div></td></tr>`).join('')}</table></div></div>
  <div class="panel" style="margin-bottom:16px"><h3>Permission matrix</h3><div class="tablewrap"><table class="matrix"><tr><th>Capability</th><th>Super Admin</th><th>Data Coordinator</th><th>Class Set / Regional Exec</th><th>Verified Member</th><th>Unverified / Guest</th></tr>${caps.map(c=>`<tr><td>${c[0]}</td>${c.slice(1).map(cell).join('')}</tr>`).join('')}</table></div></div>
  <div class="panel"><h3>Inter-role collaboration matrix</h3><div class="tablewrap"><table><tr><th>Officer</th><th>What the Coordinator provides</th><th>Console access</th></tr>${COLLAB.map(c=>`<tr><td><b>${c[0]}</b></td><td>${c[1]}</td><td>${c[2]}</td></tr>`).join('')}</table></div>
  <p class="note">Suggested split, based on the roles named in the specification. Confirm with the ECOBA executive.</p></div>`;
}

function settings(){
  const ro=S.role!=='super', st=S.settings, dis=ro?'disabled':'';
  return hero('Settings & privacy',ro?'Read-only: only the Super Admin can change these.':'Rules for verification, privacy and safety. Every change is written to the audit log.')+
  `<div class="two"><div class="panel"><h3>Verification</h3>
   <div class="switch"><span>Match needed for automatic verification<div class="sub">Lower = more automatic approvals, more risk</div></span><span><input type="range" min="70" max="98" value="${S.threshold}" id="sThr" ${dis}> <b id="thrV">${S.threshold}%</b></span></div>
   <div class="switch"><span>Classmate vouches needed (Tier 2)</span><select id="sVouch" style="width:auto" ${dis}>${[1,2,3].map(n=>`<option ${S.vouchesNeeded===n?'selected':''}>${n}</option>`).join('')}</select></div>
   <div class="result info" id="thrImpact">${impact()}</div></div>
  <div class="panel"><h3>Privacy (what guests and members see)</h3>
   ${tog('guestIndustry','Guests can see industry',dis)}${tog('guestSet','Guests can see class set',dis)}
   <p class="sub" style="margin:10px 0 0"><b>Defaults for new profiles</b> (each member can change their own)</p>
   ${tog('defPhone','Phone visible to verified members',dis)}${tog('defEmail','Email visible to verified members',dis)}${tog('defSocial','Social links visible to verified members',dis)}
   <div class="switch"><span>Mask phone and email; contact goes through the platform<div class="sub">Locked on: this protects members from scraping</div></span><input type="checkbox" checked disabled></div>
   <div class="switch"><span>Messages a member can start per day</span><input type="number" id="sMsg" value="${st.msgLimit}" style="width:80px" ${dis}></div>
   <div class="switch"><span>Profile views per hour before throttling</span><input type="number" id="sView" value="${st.viewThrottle}" style="width:80px" ${dis}></div></div></div>
  <div class="two"><div class="panel"><h3>Notifications</h3>${tog('waReminders','WhatsApp event reminders',dis)}${tog('mentorAuto','Remind mentors after 7 days',dis)}</div>
  <div class="panel"><h3>Data governance (NDPR / NDPA 2023 and GDPR)</h3>
   <div class="switch"><span>Data ownership</span><span class="badge b-gold">All data belongs to ECOBA</span></div>
   <div class="switch"><span>Encryption in transit / at rest</span><span class="badge b-ok">TLS · AES-256</span></div>
   <div class="switch"><span>Multi-factor sign-in for every admin<div class="sub">Locked on</div></span><input type="checkbox" checked disabled></div>
   <div class="switch"><span>Delete inactive unverified accounts after</span><span><input type="number" id="sRet" value="${st.retention}" style="width:70px" ${dis}> months</span></div>
   <p class="sub" style="margin:10px 0 6px"><b>Member requests (answer within 30 days)</b></p>
   ${S.dsar.map((d,i)=>`<div class="switch"><span>${esc(d.who)}<div class="sub">${esc(d.type)} · ${d.due} days left</div></span><button class="btn sm" data-act="dsar" data-i="${i}">Complete</button></div>`).join('') || '<p class="sub">No open requests.</p>'}</div></div>`;
}
function tog(k,l,dis){return `<div class="switch"><span>${l}</span><input type="checkbox" data-set="${k}" ${S.settings[k]?'checked':''} ${dis}></div>`;}
function impact(){
  const pend=S.queue.filter(q=>q.status==='pending');
  const auto=pend.filter(q=>routeOf(q)==='T1').length;
  return `At <b>${S.threshold}%</b>, <b>${auto}</b> of the ${pend.length} claims in the queue verify automatically and <b>${pend.length-auto}</b> go to peer review.`;
}

const FEATURES=[
 ['Q1','Overview built on the 5 Pillars','Identity, Engagement, Collaboration, Communication and Intelligence at a glance, plus a "needs your attention" list linking to every pending decision.','§1'],
 ['Q1','Archive registers','Coverage of every year since 1937; missing years routed to peer review and rebuilt with Anchor & Expand.','§2'],
 ['Q1','Digitisation pipeline','Scan, OCR (typed) or HTR (handwritten), double-key entry for damaged pages with reconciliation, name standardisation, then UNCLAIMED placeholder profiles.','§2'],
 ['Q1','3-Tier Verification Engine','Tier 1 exact + fuzzy (85%, same year) auto-verification; Tier 2 queue with classmate vouches for Class Set Executives; Tier 3 dispute resolution for the Super Admin.','§2–3'],
 ['Q1','Members & role-based access','Search, view, suspend, export. Five roles: Super Admin, Data Coordinator, Class Set / Regional Exec, Verified Member, Unverified / Guest.','§3'],
 ['Q2','Business showcase','Submission approvals, category taxonomy, and referral / partnership directories.','§3'],
 ['Q2','Mentorship matching','Automated pairing on profession, interest, goals and location; follow-up on unanswered requests.','§3'],
 ['Q2','Chapters & class sets','Assign Class Set and Regional Executives; spot sets and chapters with no leader.','§3'],
 ['Q3','Events & registration','Registration, calendar invites, reminders (7 days, 1 day, 1 hour), Zoom/Teams links, QR passes.','§3, §5'],
 ['Q3','Announcements','Segmented email (SendGrid/Mailchimp) and WhatsApp (Twilio) messages with templates and open rates.','§4'],
 ['Q4','Summit QR check-in','Door check-in by scanning passes, with live arrival counts.','§5'],
 ['Q4','Insights & executive dashboards','Membership mix, activity and searches with few results; executive dashboards in Power BI or Metabase.','§4–5'],
 ['Always','Privacy & anti-scraping','Visibility toggles for phone, email and social links; masked inquiry form; message and profile-view limits; scraping alerts.','§3'],
 ['Always','Data governance','NDPR and GDPR, ECOBA owns all data, TLS and AES-256 encryption, MFA for admins, member data requests.','§4'],
 ['Always','Audit log','Every decision, change and export; verification decisions kept in verification_logs.','§4'],
 ['Always','System health & recovery','Uptime against the 99.5% target, page speed in Nigeria and the diaspora, backups, restore tests, data dictionary.','§4–5'],
 ['Always','Roles & collaboration','Permission matrix, the Coordinator\'s support for each officer, and admin handovers.','§1, §5'],
 ['Always','Roadmap & testing tracker','Q1–Q4 deliverables, unit tests for the matcher, UAT with Class Set Executives, penetration test.','§5'],
 ['Extra','Dues & donations','Annual dues by set, receipts and project fundraising (Paystack / Flutterwave, plus card for the diaspora).','Not in spec'],
 ['Extra','Jobs & opportunities board','Alumni employers post jobs and internships, sent to matching members.','Not in spec'],
 ['Extra','Obituaries & condolence notices','Approved notices sent to the person\'s set; profile marked "in memoriam".','Not in spec'],
];
function guide(){
  const G=[['Q1','Q1 2026 · Phase 1 Digital Foundation','b-ok'],['Q2','Q2 2026 · Directory & mentorship','b-info'],['Q3','Q3 2026 · Events','b-info'],['Q4','Q4 2026 · Phase 4 Intelligence Platform','b-gold'],['Always','Throughout · security, governance and programme','b-un'],['Extra','Recommended extras (not in the specification)','b-warn']];
  return hero('Feature guide','Every admin feature, mapped to the ECOBA specification section it comes from and the quarter it belongs to.')+
  G.map(([k,t,c])=>`<div class="panel" style="margin-bottom:16px"><h3>${t}</h3>${FEATURES.filter(f=>f[0]===k).map(f=>`<div class="feat"><div><h4>${f[1]}</h4><p>${f[2]}</p></div><span class="${f[3]==='Not in spec'?'badge b-warn':'ref'}">${f[3]}</span></div>`).join('')}</div>`).join('');
}
function restricted(){ return `<div class="restricted"><h2 style="font-family:Fraunces,serif;color:var(--navy);margin-bottom:6px">Not part of your role</h2>Ask the Super Admin if you need access to this page.</div>`; }

// ---------- Render ----------
const VIEWS={overview,queue,disputes,registers,digitise,members,chapters,mentorship,business,events,comms,moderation,audit,insights,roles,settings,system,roadmap,guide};
function render(){
  const signed=!!S.user;
  $('#login').hidden=signed; $('#appwrap').hidden=!signed;
  if(!signed) return loginView();
  if(!can(S.view)) S.view='overview';
  const R=ROLES[S.role];
  $('#who').innerHTML=`<span class="userchip"><span class="av">${initials(R.user)}</span><span>${esc(R.user)}<small>${esc(R.name)} · ${esc(R.scope)}</small></span></span><a href="${DIR_URL}">Public directory &rarr;</a><button class="btn sm ghost" id="signout">Sign out</button>`;
  side();
  $('#main').innerHTML = VIEWS[S.view]();
}

// ---------- Sign-in (passwordless magic link + MFA) ----------
function loginView(){
  const L=S.login, R=ROLES[L.role];
  const groups=[...new Set(Object.values(ROLES).map(r=>r.grp))];
  const step1=`<h2>Sign in to manage the platform</h2><p class="lead">For administrators, Class Set and Regional Executives, and portfolio officers. Members and guests use the <a href="${DIR_URL}">directory</a> instead. Choose a role to see what it can do.</p>
   ${groups.map(g=>`<div class="rolegroup">${g}</div><div class="rolegrid">${Object.entries(ROLES).filter(([k,r])=>r.grp===g).map(([k,r])=>`<button class="rolecard ${L.role===k?'on':''}" data-role="${k}" aria-pressed="${L.role===k}"><b>${esc(r.name)}</b><span>${esc(r.scope)}</span></button>`).join('')}</div>`).join('')}
   <div class="signin"><div class="panel"><h3>What a ${esc(R.name)} can do</h3><ul class="canlist">${R.can.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
     <h3 style="margin-top:14px">Cannot</h3><ul class="canlist not">${R.cannot.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div>
    <div class="panel"><h3>Sign in</h3>
     <div class="form-row"><label for="lgEmail">Work email</label><input type="email" id="lgEmail" value="${esc(R.email)}" readonly></div>
     <button class="btn gold" id="lgSend" style="width:100%">Email me a sign-in link</button>
     <p class="note">No passwords. We email you a one-time link, then ask for a code from your authenticator app. You are signed out after 30 minutes without activity.</p>
     <p class="note"><b>Demo:</b> the email is a fixed sample address and nothing is sent.</p></div></div>`;
  const step2=`<h2>Check your email</h2><p class="lead">A sign-in link went to <b>${esc(R.email)}</b>. It works once and expires in 15 minutes.</p>
   <div class="panel" style="max-width:440px"><h3>Two-step check</h3><p class="sub" style="margin-bottom:10px">Enter the 6-digit code from your authenticator app.</p>
    <div class="form-row"><label for="lgCode">Code</label><input type="text" id="lgCode" class="codebox" value="482 193" readonly></div>
    <button class="btn gold" id="lgVerify" style="width:100%">Verify and sign in as ${esc(R.name)}</button>
    <p class="note"><b>Demo:</b> the link counts as opened and the code is filled in for you.</p>
    <p style="margin-top:10px"><button class="btn sm ghost" id="lgBack">Use a different role</button></p></div>`;
  $('#login').innerHTML=`<aside class="brandside"><div><div class="crest">${$('#mark').innerHTML}</div><h1>ECOBA Admin Console <span class="badge b-gold" style="vertical-align:6px;font-family:Inter,sans-serif">Demo</span></h1><div class="tag">Connecting ECOBITEs. Creating Opportunities. Building the Future.</div></div>
   <ul><li><b>One sign-in, many roles</b>Each person sees only the pages their role needs.</li><li><b>Passwordless and two-step</b>Magic link plus authenticator code for everyone with admin rights.</li><li><b>Everything is logged</b>Sign-ins and every decision go to the audit log.</li></ul>
   <div class="ghostcrest">${$('#mark').innerHTML}</div></aside><section class="formside">${L.step===1?step1:step2}</section>`;
}
document.addEventListener('click',e=>{
  const t=e.target.closest('button'); if(!t) return;
  if(t.dataset.role){S.login.role=t.dataset.role;render();return;}
  if(t.id==='lgSend'){S.login.step=2;render();return;}
  if(t.id==='lgBack'){S.login.step=1;render();return;}
  if(t.id==='lgVerify'){S.user=S.login.role;S.role=S.login.role;S.view='overview';log('security','Signed in (magic link + authenticator code)');render();window.scrollTo({top:0});return;}
  if(t.id==='signout'){log('security','Signed out');S.user=null;S.login.step=1;render();window.scrollTo({top:0});}
});
function go(v){S.view=v;render();window.scrollTo({top:0});}

// ---------- Events ----------
$('#side').addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(b.dataset.view);});
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.dataset.close!==undefined)closeModal();});

$('#main').addEventListener('input',e=>{
  const t=e.target;
  if(t.id==='mq'){S.memberFilter.q=t.value;const p=t.selectionStart;render();const q=$('#mq');q.focus();q.setSelectionRange(p,p);}
  if(t.id==='sThr'){S.threshold=+t.value;$('#thrV').textContent=S.threshold+'%';$('#thrImpact').innerHTML=impact();side();}
});
$('#main').addEventListener('change',e=>{
  const t=e.target;
  if(t.id==='mtier'){S.memberFilter.tier=t.value;render();}
  if(t.id==='mstatus'){S.memberFilter.status=t.value;render();}
  if(t.id==='mdec'){S.memberFilter.decade=t.value;render();}
  if(t.id==='sThr'){log('settings',`Changed automatic-match threshold to ${S.threshold}%`);toast('Threshold saved: '+S.threshold+'%');}
  if(t.id==='sVouch'){S.vouchesNeeded=+t.value;log('settings',`Vouches needed set to ${S.vouchesNeeded}`);toast('Saved');render();}
  if(t.dataset.set){S.settings[t.dataset.set]=t.checked;log('settings',`${t.closest('.switch').querySelector('span').textContent}: ${t.checked?'on':'off'}`);toast('Saved');}
  if(['sMsg','sView','sRet'].includes(t.id)){const k={sMsg:'msgLimit',sView:'viewThrottle',sRet:'retention'}[t.id];S.settings[k]=+t.value;log('settings',`${k} set to ${t.value}`);toast('Saved');}
});

$('#main').addEventListener('click',e=>{
  const t=e.target.closest('button,a[data-view]'); if(!t) return;
  if(t.dataset.view){e.preventDefault();return go(t.dataset.view);}
  if(t.dataset.year && !t.dataset.act){S.regYear=+t.dataset.year;return render();}
  if(t.dataset.afilter!==undefined){S.auditFilter=t.dataset.afilter;return render();}
  if(t.dataset.aud){const a=S.aud,v=t.dataset.v;
    if(t.dataset.aud==='dec'){a.decades.has(+v)?a.decades.delete(+v):a.decades.add(+v);}
    if(t.dataset.aud==='cty'){a.countries.has(v)?a.countries.delete(v):a.countries.add(v);}
    if(t.dataset.aud==='ver')a.verifiedOnly=!a.verifiedOnly; if(t.dataset.aud==='men')a.mentors=!a.mentors;
    const s=$('#bSub').value,b=$('#bBody').value;render();$('#bSub').value=s;$('#bBody').value=b;return;}
  if(t.dataset.chan){S.channel=t.dataset.chan;const s=$('#bSub').value,b=$('#bBody').value;render();$('#bSub').value=s;$('#bBody').value=b;return;}
  const act=t.dataset.act, id=t.dataset.id; if(!act) return;
  const q=S.queue.find(x=>x.id===id), m=S.members.find(x=>x.id==id), b=S.businesses.find(x=>x.id===id), r=S.reports.find(x=>x.id===id), mr=S.mentor.find(x=>x.id===id), ev=S.events.find(x=>x.id===id);
  switch(act){
    case 'vouch': q.vouches++; log('verification',`Vouched for ${q.who} (Set ${q.set})`); toast(`Vouch recorded for ${q.who}`); break;
    case 'approve': { const over=q.vouches<S.vouchesNeeded; q.status='approved'; S.totals.verified++; log('verification',`${over?'Override-approved':'Approved'} Tier 2 claim: ${q.who} (Set ${q.set}), ${q.vouches} vouches`); toast(`${q.who} verified`); break; }
    case 'reject': q.status='rejected'; log('verification',`Rejected claim: ${q.who} (Set ${q.set})`); toast('Claim rejected; applicant told why'); break;
    case 'info': openModal(`<h3>Ask ${esc(q.who)} for more information</h3><div class="form-row"><label>Message</label><textarea>Thank you for claiming your profile. To confirm you, please tell us your house, a teacher you remember from your set, or upload a school photo or certificate.</textarea></div><button class="btn" data-act="infosend" data-id="${q.id}">Send request</button> <button class="btn ghost" data-close>Cancel</button>`); return;
    case 'revoke': q.score=Math.min(q.score,S.threshold-1); log('verification',`Sent auto-verified claim back to review: ${q.who}`); toast('Moved to peer review'); break;
    case 'award': { const d=S.disputes.find(x=>x.id===id),k=t.dataset.k; d.status=k==='a'?'Awarded to '+d.a.name+' ('+d.a.city+')':k==='b'?'Awarded to '+d.b.name+' ('+d.b.city+')':k==='both'?'Split: two separate people':'Locked: neither verified'; log('verification',`Dispute ${d.record} (${d.set}): ${d.status}`); toast('Decision saved; both claimants notified'); break; }
    case 'callboth': toast('Invitation sent to both claimants (demo)'); return;
    case 'upload': openModal(`<h3>Upload a register</h3><div class="form-row"><label>Year</label><input type="number" value="${S.regYear}"></div><div class="form-row"><label>CSV file</label><input type="text" placeholder="register-1983.csv" disabled></div><p class="sub">Next step maps the columns: Surname · First name · Other names · Admission no. · House · Year left. Duplicates are flagged before import.</p><div style="margin-top:14px"><button class="btn gold" data-close>Continue (demo)</button> <button class="btn ghost" data-close>Cancel</button></div>`); return;
    case 'rebuild': toast(`Rebuilt names for ${t.dataset.year} open for review (demo)`); return;
    case 'nudge': { const y=YEARS.find(x=>x.y==t.dataset.year); log('registers',`Invited ${y.recs-y.claimed} unclaimed names from ${y.y} (where contact known)`); toast('Invitations queued for unclaimed names'); break; }
    case 'exportyear': toast('Download started (demo)'); return;
    case 'profile': openModal(`<h3>${esc(m.name)}</h3><p class="sub">Set of ${m.set} · ${esc(m.city)}, ${esc(m.country)} · ${esc(m.industry)}</p><div style="margin:12px 0">${badge(m.tier)} <span class="badge b-un">${m.status}</span></div><div class="switch"><span>Email</span><span class="sub">•••••@•••.com <button class="btn sm ghost" data-act="reveal">Reveal (logged)</button></span></div><div class="switch"><span>Phone</span><span class="sub">+••• ••• ••• •••</span></div>${S.role==='exec'?'':`<div class="acts" style="margin-top:14px"><button class="btn sm ghost" data-close>Edit profile</button><button class="btn sm ghost" data-close>Reset verification</button><button class="btn sm ghost" data-close>Merge duplicate</button></div>`}<div style="margin-top:14px"><button class="btn" data-close>Close</button></div>`); return;
    case 'suspend': m.wasStatus=m.status; m.status='Suspended'; log('members',`Suspended ${m.name} (Set ${m.set})`); toast(`${m.name} suspended`); break;
    case 'reinstate': m.status=m.wasStatus||'Active'; m.flag=''; log('members',`Reinstated ${m.name}`); toast(`${m.name} reinstated`); break;
    case 'flag': log('members',`Flagged ${m.name} for admin review`); toast('Flag sent to administrators'); return render();
    case 'csv': csv('ecoba-members-sample.csv',[['Name','Set','City','Country','Industry','Verification','Status'],...S.members.map(x=>[x.name,x.set,x.city,x.country,x.industry,TIER[x.tier][1],x.status])]); log('export','Exported member list (sample, contacts excluded)'); break;
    case 'csvaudit': csv('ecoba-audit-log.csv',[['When','Who','Area','What'],...S.audit.map(a=>[a.t,a.who,a.type,a.what])]); break;
    case 'assign': { const s=S.sets.find(x=>x.set==t.dataset.set); const pool=S.members.filter(x=>x.set===s.set&&x.status==='Active'); openModal(`<h3>Class Set Executive for ${s.set}</h3><div class="form-row"><label>Choose a verified member of the set</label><select id="asg">${(pool.length?pool.map(x=>x.name):['(sample) Nominated by the set WhatsApp group']).map(n=>`<option>${esc(n)}</option>`).join('')}</select></div><button class="btn" data-act="asgok" data-set="${s.set}">Assign</button> <button class="btn ghost" data-close>Cancel</button>`); return; }
    case 'newchapter': openModal(`<h3>Add a chapter</h3><div class="form-row"><label>Chapter name</label><input type="text" placeholder="e.g. South Africa"></div><div class="form-row"><label>Coordinator</label><input type="text" placeholder="Search members"></div><button class="btn gold" data-close>Create (demo)</button>`); return;
    case 'mnudge': mr.age=0; log('mentorship',`Nudged ${mr.mentor} about request from ${mr.mentee}`); toast('Reminder sent to mentor'); break;
    case 'mreassign': toast(`Suggested 3 other ${mr.area} mentors to ${mr.mentee.split(' (')[0]}`); log('mentorship',`Suggested other mentors to ${mr.mentee}`); break;
    case 'bok': b.status='Approved'; log('content',`Approved listing: ${b.name}`); toast('Listing is live'); break;
    case 'bno': b.status='Rejected'; b.featured=false; log('content',`Rejected / removed listing: ${b.name}`); toast('Listing removed; owner told why'); break;
    case 'bfeat': b.featured=!b.featured; log('content',`${b.featured?'Featured':'Unfeatured'} ${b.name}`); break;
    case 'newevent': openModal(`<h3>Create event</h3><div class="form-row"><label>Title</label><input type="text"></div><div class="grid2"><div class="form-row"><label>Date</label><input type="date"></div><div class="form-row"><label>Places</label><input type="number" value="100"></div></div><div class="form-row"><label>Format</label><select><option>In person</option><option>Zoom</option><option>In person + live stream</option></select></div><div class="form-row"><label>Online link</label><select><option>Create a Zoom meeting or webinar</option><option>Create a Microsoft Teams event</option><option>None (in person only)</option></select></div><div class="form-row"><label>Who can register</label><select><option>All verified members</option><option>One class set</option><option>One chapter</option></select></div><button class="btn gold" data-close>Publish (demo)</button> <button class="btn ghost" data-close>Cancel</button>`); return;
    case 'remind': log('events',`Sent reminder for ${ev.title} to ${ev.taken} registrants`); toast(`Reminder sent to ${fmt(ev.taken)} people`); break;
    case 'attendees': openModal(`<h3>${esc(ev.title)}</h3><p class="sub">${fmt(ev.taken)} registered · ${ev.checked} checked in</p><div class="tablewrap" style="margin-top:10px"><table><tr><th>Name</th><th>Set</th><th>Status</th></tr>${S.members.slice(0,6).map((x,i)=>`<tr><td>${esc(x.name)}</td><td>${x.set}</td><td>${i<ev.checked?'<span class="badge b-ok">Checked in</span>':'<span class="badge b-un">Registered</span>'}</td></tr>`).join('')}</table></div><div style="margin-top:14px"><button class="btn ghost" data-close>Download list</button> <button class="btn" data-close>Close</button></div>`); return;
    case 'checkin': { const code=$('#ciCode').value.trim().toUpperCase(), e2=S.events.find(x=>x.id===$('#ciEvent').value); const ok=/^ECOBA-E\d-\d{4}$/.test(code); if(ok){e2.checked++;log('events',`Checked in pass ${code} at ${e2.title}`);} render(); $('#ciOut').innerHTML=ok?`<div class="result ok"><b>Welcome!</b> Pass ${esc(code)} checked in. ${e2.checked} in so far.</div>`:`<div class="result warn">Pass not recognised. Codes look like ECOBA-E3-4821.</div>`; return; }
    case 'send': { const s=$('#bSub').value.trim(); if(!s){toast('Add a subject first');return;} const n=audience(); S.broadcasts.unshift({when:'Today',title:s,aud:describeAud(),ch:S.channel,sent:n,opens:'pending'}); log('comms',`Sent "${s}" to ${n} members by ${S.channel}`); toast(`Queued for ${fmt(n)} members (demo: nothing sent)`); S.aud={decades:new Set(),countries:new Set(),mentors:false,verifiedOnly:true}; break; }
    case 'testsend': toast('Test sent to your own inbox (demo)'); return;
    case 'tpl': $('#bSub').value=t.dataset.v; $('#bBody').value=`Dear ECOBITEs,\n\n[${t.dataset.v} text here]\n\nECOBA National Secretariat`; return;
    case 'rdismiss': r.status='Dismissed'; log('safety',`Dismissed report on ${r.target}`); break;
    case 'rwarn': r.status='Warning sent'; log('safety',`Warned ${r.target}`); toast('Warning sent'); break;
    case 'rsusp': r.status='Suspended / removed'; const mm=S.members.find(x=>r.target.startsWith(x.name)); if(mm&&mm.status!=='Suspended'){mm.wasStatus=mm.status;mm.status='Suspended';} const bb=S.businesses.find(x=>r.target.includes(x.name.replace('(Sample) ',''))); if(bb)bb.status='Rejected'; log('safety',`Suspended / removed ${r.target}`); toast('Done'); break;
    case 'report': toast('Board report PDF generated (demo)'); return;
    case 'invite': openModal(`<h3>Invite an admin</h3><div class="form-row"><label>Email</label><input type="email"></div><div class="form-row"><label>Role</label><select><option>Administrator</option><option>Class Set Executive</option><option>Super Admin</option></select></div><p class="sub">They must turn on two-step sign-in before their first action.</p><div style="margin-top:12px"><button class="btn gold" data-close>Send invite (demo)</button></div>`); return;
    case 'force2fa': S.admins[t.dataset.i].twofa=true; log('settings',`Required two-step sign-in for ${S.admins[t.dataset.i].name}`); toast('They must set it up at next sign-in'); break;
    case 'advance': { const g=S.batches.find(x=>x.id===id); g.stage++; log('registers',g.stage===5?`Loaded ${g.year} ${g.src.toLowerCase()} into archival_master_roster as UNCLAIMED placeholders`:`${g.year} ${g.src.toLowerCase()}: ${STAGES[g.stage-1].toLowerCase()} complete`); toast(STAGES[g.stage-1]+': done'); break; }
    case 'keep': { const x=S.recon.find(y=>y.id===id),k=t.dataset.k; x.status='done'; log('registers',k==='scan'?`Sent ${x.line} (${x.field}) back for a scan check`:`Reconciled ${x.line} ${x.field}: kept "${k==='a'?x.a:x.b}"`); break; }
    case 'pair': { const pr=S.pairs.find(y=>y.id===id); S.pairs=S.pairs.filter(y=>y!==pr); S.mentor.unshift({id:'m'+Date.now(),mentee:pr.mentee,mentor:pr.mentor,area:pr.area,age:0,status:'Introduced'}); log('mentorship',`Introduced ${pr.mentee} to ${pr.mentor} (${pr.score}% match)`); toast('Both introduced by email'); break; }
    case 'addcat': openModal(`<h3>Add a business category</h3><div class="form-row"><label>Category name</label><input type="text" id="catName" placeholder="e.g. Hospitality"></div><button class="btn gold" data-act="catok">Add</button> <button class="btn ghost" data-close>Cancel</button>`); return;
    case 'restore': S.lastRestore='Today, passed in 38 min'; log('security','Ran a backup restore test: passed in 38 min'); toast('Restore test passed'); break;
    case 'rstat': { const it=S.roadmap[t.dataset.q].items[t.dataset.i], order=['Not started','In progress','Done']; it[1]=order[(order.indexOf(it[1])+1)%3]; log('programme',`Roadmap: "${it[0]}" set to ${it[1]}`); break; }
    case 'handover': { const a=S.admins[t.dataset.i]; openModal(`<h3>Hand over: ${esc(a.name)}</h3><div class="form-row"><label>Successor</label><input type="text" placeholder="Search verified members"></div><p class="sub" style="margin-bottom:8px">The handover procedure:</p><ul style="margin:0 0 12px 18px;font-size:14px;line-height:1.7"><li>Successor accepts and turns on MFA</li><li>Scope (${esc(a.scope)}) moves to the successor</li><li>The old account loses admin rights and is signed out everywhere</li><li>Shared service keys are rotated</li><li>All of this is written to the audit log</li></ul><button class="btn gold" data-act="handok" data-i="${t.dataset.i}">Start handover</button> <button class="btn ghost" data-close>Cancel</button>`); return; }
    case 'dsar': { const d=S.dsar.splice(+t.dataset.i,1)[0]; log('privacy',`Completed "${d.type}" for ${d.who}`); toast('Request completed and member told'); break; }
  }
  render();
});
$('#modalBox').addEventListener('click',e=>{
  const t=e.target.closest('button'); if(!t) return;
  if(t.dataset.act==='infosend'){const q=S.queue.find(x=>x.id===t.dataset.id);q.status='info';log('verification',`Asked ${q.who} for more information`);closeModal();toast('Request sent');render();}
  if(t.dataset.act==='asgok'){const s=S.sets.find(x=>x.set==t.dataset.set);s.exec=$('#asg').value;s.note='';log('members',`Assigned ${s.exec} as Class Set Executive for ${s.set}`);closeModal();toast('Executive assigned');render();}
  if(t.dataset.act==='catok'){const n=$('#catName').value.trim();if(n){S.taxonomy[n]=0;log('content',`Added business category: ${n}`);}closeModal();render();}
  if(t.dataset.act==='handok'){const a=S.admins[t.dataset.i];log('security',`Started handover of ${a.name} (${a.scope})`);closeModal();toast('Handover started; successor invited');render();}
  if(t.dataset.act==='reveal'){t.outerHTML='<span>shown to you, and logged</span>';log('privacy','Revealed a member\'s email from the admin console');}
});
function describeAud(){const a=S.aud,p=[];if(a.decades.size)p.push([...a.decades].map(d=>d+'s').join(', ')+' sets');if(a.countries.size)p.push([...a.countries].join(', '));if(a.mentors)p.push('mentors');return (a.verifiedOnly?'Verified ':'All ')+(p.length?p.join(' · '):'members');}
function csv(name,rows){const s=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'text/csv'}));a.download=name;a.click();toast('Downloaded '+name);}

render();

(function(){const strip=document.querySelector('.builtby'),badge=document.querySelector('.bb-badge');
 if(!strip||!badge||!('IntersectionObserver' in window))return;
 new IntersectionObserver(es=>es.forEach(e=>badge.classList.toggle('hide',e.isIntersecting))).observe(strip);})();
