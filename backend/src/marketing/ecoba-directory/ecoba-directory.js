// ---------- Emblem (real file if present, placeholder crest otherwise) ----------
const PLACEHOLDER = `<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" aria-label="Placeholder crest">
 <path d="M100 6 L188 34 V112 C188 168 148 204 100 224 C52 204 12 168 12 112 V34 Z" fill="#0F2340" stroke="#C29A3B" stroke-width="7"/>
 <path d="M100 26 L170 48 V112 C170 156 140 186 100 203 C60 186 30 156 30 112 V48 Z" fill="none" stroke="#C29A3B" stroke-width="2"/>
 <text x="100" y="105" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#F3E7C8">ECOBA</text>
 <text x="100" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#C29A3B">EDO COLLEGE</text>
 <text x="100" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#C9D3E2">EMBLEM PLACEHOLDER</text>
</svg>`;
function setEmblem(){
  const img = new Image();
  img.onload = () => {
    document.getElementById('wm').innerHTML = '<img src="ecoba-logo.svg" alt="">';
    document.getElementById('mark').innerHTML = '<img src="ecoba-logo.svg" alt="ECOBA emblem">';
  };
  img.onerror = () => {
    document.getElementById('wm').innerHTML = PLACEHOLDER;
    document.getElementById('mark').innerHTML = PLACEHOLDER;
  };
  img.src = 'ecoba-logo.svg';
}
setEmblem();

// ---------- Sample data (fictional) ----------
const MEMBERS = [
 {id:1,name:"Osaro Igbinoba",set:1988,city:"Lagos",country:"Nigeria",industry:"Banking & Finance",role:"Head, Corporate Banking",org:"(sample bank)",skills:["Credit risk","Corporate finance"],tier:"T1",mentor:true,phone:false,email:true},
 {id:2,name:"Efosa Ogiemwonyi",set:1995,city:"London",country:"United Kingdom",industry:"Technology",role:"Cloud Architect",org:"(sample firm)",skills:["AWS","Cyber security","DevOps"],tier:"T1",mentor:true,phone:false,email:false},
 {id:3,name:"Nosa Aiyevbekpen",set:2004,city:"Benin City",country:"Nigeria",industry:"Health",role:"Consultant Surgeon",org:"(sample hospital)",skills:["Surgery","Public health"],tier:"T2",mentor:true,phone:true,email:true},
 {id:4,name:"Idemudia Ehigiator",set:1979,city:"Houston",country:"United States",industry:"Oil & Gas",role:"Reservoir Engineering Lead",org:"(sample operator)",skills:["Reservoir modelling","HSE"],tier:"T1",mentor:true,phone:false,email:true},
 {id:5,name:"Ehis Okhuoya",set:2012,city:"Abuja",country:"Nigeria",industry:"Law",role:"Associate",org:"(sample chambers)",skills:["Corporate law","Arbitration"],tier:"T2",mentor:false,phone:false,email:true},
 {id:6,name:"Osagie Edokpolo",set:2001,city:"Toronto",country:"Canada",industry:"Technology",role:"Data Scientist",org:"(sample firm)",skills:["Python","Machine learning","GIS"],tier:"T1",mentor:true,phone:false,email:true},
 {id:7,name:"Uyi Omoregbee",set:1992,city:"Lagos",country:"Nigeria",industry:"Real Estate",role:"Managing Director",org:"(sample developer)",skills:["Property development","Project finance"],tier:"T3",mentor:false,phone:true,email:false},
 {id:8,name:"Imuetinyan Osayande",set:2016,city:"Benin City",country:"Nigeria",industry:"Education",role:"Lecturer",org:"(sample university)",skills:["Mathematics","EdTech"],tier:"T1",mentor:false,phone:false,email:true},
 {id:9,name:"Aisosa Erhabor",set:2009,city:"Dubai",country:"UAE",industry:"Oil & Gas",role:"HSE Superintendent",org:"(sample contractor)",skills:["HSE","Process safety"],tier:"T2",mentor:true,phone:false,email:true},
 {id:10,name:"Ofure Iyamu",set:1985,city:"Port Harcourt",country:"Nigeria",industry:"Engineering",role:"Chief Engineer",org:"(sample utility)",skills:["Power systems","Renewables"],tier:"T1",mentor:true,phone:true,email:true},
 {id:11,name:"Ekhator Uwaifo",set:2019,city:"Lagos",country:"Nigeria",industry:"Media & Marketing",role:"Brand Strategist",org:"(sample agency)",skills:["Digital marketing","Content"],tier:"UN",mentor:false,phone:false,email:false},
 {id:12,name:"Izevbekhai Osemwegie",set:1998,city:"Manchester",country:"United Kingdom",industry:"Health",role:"GP Partner",org:"(sample practice)",skills:["Primary care"],tier:"T1",mentor:true,phone:false,email:true},
 {id:13,name:"Omosigho Ize-Iyamu",set:2007,city:"Abuja",country:"Nigeria",industry:"Public Service",role:"Policy Adviser",org:"(sample agency)",skills:["Policy","Governance"],tier:"T2",mentor:false,phone:false,email:true},
 {id:14,name:"Osamudiamen Eweka",set:1990,city:"Atlanta",country:"United States",industry:"Banking & Finance",role:"Portfolio Manager",org:"(sample fund)",skills:["Investments","Fintech"],tier:"T1",mentor:true,phone:false,email:true},
];
// Archival master roster (Tier 1 seed): names as written in the school registers
const ROSTER = [
 {name:"IGBINOBA Osaro",year:1988,status:"CLAIMED"},{name:"OGIEMWONYI Efosa",year:1995,status:"CLAIMED"},
 {name:"OKUNDAYE Osahon",year:2003,status:"UNCLAIMED"},{name:"AGHEDO Itohan",year:2003,status:"UNCLAIMED"},
 {name:"EWEKA Osamudiamen",year:1990,status:"CLAIMED"},{name:"OBASUYI Ikponmwosa",year:1990,status:"UNCLAIMED"},
 {name:"EGHAREVBA Nosakhare",year:2010,status:"UNCLAIMED"},{name:"IDAHOSA Omoruyi",year:2010,status:"UNCLAIMED"},
 {name:"OSAGIE Eghosa",year:1997,status:"UNCLAIMED"},{name:"EDOKPOLO Osagie",year:2001,status:"CLAIMED"},
];
const ARCHIVE_GAPS = [1967,1968,1975,1983]; // years with missing/damaged registers -> Tier 2
const BUSINESSES = [
 {name:"(Sample) Ikpoba Agro Processing",owner:"Uyi Omoregbee (Set '92)",cat:"Agriculture",city:"Benin City",offer:"10% partner rate for ECOBITEs",status:"Approved"},
 {name:"(Sample) Ogba Data Labs",owner:"Osagie Edokpolo (Set '01)",cat:"Technology",city:"Toronto / Lagos",offer:"Free data-strategy call",status:"Approved"},
 {name:"(Sample) Ring Road Legal",owner:"Ehis Okhuoya (Set '12)",cat:"Legal",city:"Abuja",offer:"Discounted company registration",status:"Approved"},
 {name:"(Sample) Sapele Road Solar",owner:"Ofure Iyamu (Set '85)",cat:"Energy",city:"Port Harcourt",offer:"Site survey at cost",status:"Pending approval"},
];
const EVENTS = [
 {id:"e1",title:"ECOBA Professional Forum: Careers in Energy Transition",date:"2026-11-14",mode:"Zoom",place:"Online",seats:300,taken:212},
 {id:"e2",title:"Diaspora Chapters Mixer (UK)",date:"2026-11-28",mode:"In person",place:"London",seats:120,taken:74},
 {id:"e3",title:"ECOBA Annual Summit 2026",date:"2026-12-19",mode:"In person + live stream",place:"Edo College, Benin City",seats:1500,taken:931},
];
const QUEUE = [
 {who:"Osahon Okundaye",set:2003,claimed:"OKUNDAYE Osahon",score:100,tier:"T1",note:"Exact match to archival roster"},
 {who:"Itohan Aghedo",set:2003,claimed:"AGHEDO Itohan",score:92,tier:"T1",note:"Fuzzy match 92% (≥85%), auto-verified"},
 {who:"Victor Omoruyi Idahosa",set:2010,claimed:"IDAHOSA Omoruyi",score:71,tier:"T2",note:"Below 85%: needs two classmates to vouch"},
 {who:"Ehigie Osemwota",set:1975,claimed:"(no register for 1975)",score:0,tier:"T2",note:"Archive gap year: routed to peer review"},
 {who:"Osaze Ebohon",set:1983,claimed:"Disputed: two claims to one record",score:0,tier:"T3",note:"Escalated to Super Admin"},
];

// ---------- Helpers ----------
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = n => n.split(' ').map(p=>p[0]).slice(0,2).join('');
const TIER = {T1:['b-t1','Verified · archive match'],T2:['b-t2','Verified · peer review'],T3:['b-t3','Verified · admin'],UN:['b-un','Unverified']};
const badge = t => `<span class="badge ${TIER[t][0]}">${TIER[t][1]}</span>`;
let role = $('#role').value;
let tab = 'directory';
const filters = {q:'',industry:new Set(),country:new Set(),set:'',mentors:false};

function lev(a,b){a=a.toLowerCase();b=b.toLowerCase();const m=a.length,n=b.length;const d=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n];}
// Standardise names: sort the name parts so "SURNAME First" and "First Surname" compare equally
const norm = s => s.toLowerCase().replace(/[^a-z\s-]/g,'').split(/\s+/).filter(Boolean).sort().join(' ');
const similarity = (a,b) => { const x=norm(a), y=norm(b); return Math.round((1 - lev(x,y)/Math.max(x.length,y.length))*100); };

// ---------- Views ----------
function directory(){
  const industries=[...new Set(MEMBERS.map(m=>m.industry))].sort();
  const countries=[...new Set(MEMBERS.map(m=>m.country))].sort();
  const guest = role==='guest';
  const list = MEMBERS.filter(m=>{
    const q=filters.q.toLowerCase();
    if(q && !(m.name+' '+m.role+' '+m.skills.join(' ')+' '+m.city+' '+m.industry).toLowerCase().includes(q)) return false;
    if(filters.industry.size && !filters.industry.has(m.industry)) return false;
    if(filters.country.size && !filters.country.has(m.country)) return false;
    if(filters.set){ const dec=+filters.set; if(m.set<dec||m.set>dec+9) return false; }
    if(filters.mentors && !m.mentor) return false;
    return true;
  });
  const countriesN = new Set(MEMBERS.map(m=>m.country)).size;
  return `
  <div class="hero"><div><h1>Find an ECOBITE</h1><p>Search old boys by name, set, industry, skills and location.</p></div>
   <div class="stats"><div class="stat"><b>${MEMBERS.length}</b><span>members (sample)</span></div><div class="stat"><b>${countriesN}</b><span>countries</span></div><div class="stat"><b>${MEMBERS.filter(m=>m.tier!=='UN').length}</b><span>verified</span></div></div></div>
  <div class="layout">
   <aside class="panel">
    <h3>Search</h3><input type="search" id="q" placeholder="Name, skill, city…" value="${esc(filters.q)}">
    <h3>Class set</h3><select id="set"><option value="">All sets</option>${[1970,1980,1990,2000,2010].map(d=>`<option value="${d}" ${filters.set==d?'selected':''}>${d}s</option>`).join('')}</select>
    <h3>Industry</h3>${industries.map(i=>`<label class="chk"><input type="checkbox" data-f="industry" value="${esc(i)}" ${filters.industry.has(i)?'checked':''}>${esc(i)}</label>`).join('')}
    <h3>Country</h3>${countries.map(c=>`<label class="chk"><input type="checkbox" data-f="country" value="${esc(c)}" ${filters.country.has(c)?'checked':''}>${esc(c)}</label>`).join('')}
    <h3>Mentorship</h3><label class="chk"><input type="checkbox" id="mentors" ${filters.mentors?'checked':''}>Open to mentoring</label>
   </aside>
   <section>
    ${guest?`<div class="result warn" style="margin:0 0 14px">You're browsing as a guest: you see names, sets and industries only. <b>Claim your profile</b> to see full profiles and contact members.</div>`:''}
    <div class="grid">${list.map(m=>card(m,guest)).join('') || '<div class="empty">No members match these filters.</div>'}</div>
   </section>
  </div>`;
}
function card(m,guest){
  if(guest) return `<div class="card"><div class="row"><div class="av">${initials(m.name)}</div><div><h4>${esc(m.name)}</h4><div class="sub">Set of ${m.set} · ${esc(m.industry)}</div></div></div>${badge(m.tier)}</div>`;
  return `<div class="card">
   <div class="row"><div class="av">${initials(m.name)}</div><div><h4>${esc(m.name)}</h4><div class="sub">Set of ${m.set} · ${esc(m.city)}, ${esc(m.country)}</div></div></div>
   <div>${badge(m.tier)} ${m.mentor?'<span class="badge b-t2" style="background:var(--gold-soft);color:#5a4511">Mentor</span>':''}</div>
   <div style="font-size:14px"><b>${esc(m.role)}</b> · ${esc(m.org)}</div>
   <div class="tags">${m.skills.map(s=>`<span class="tag">${esc(s)}</span>`).join('')}</div>
   <div class="contact">📞 ${m.phone?'Shared with members':'Hidden'} · ✉️ ${m.email?'Shared with members':'Hidden'}<br>Contact details stay masked; messages go through the inquiry form.</div>
   <button class="btn sm" data-msg="${m.id}">Send a message</button>
  </div>`;
}

function claim(){
  return `<div class="hero"><div><h1>Claim your profile</h1><p>We check your name against the school's own admission and graduation registers.</p></div></div>
  <div class="two">
   <div class="panel">
    <div class="form-row"><label>Your full name (as at Edo College)</label><input type="text" id="cName" placeholder="e.g. Itohan Aghedo"></div>
    <div class="form-row"><label>Year you finished (your set)</label><input type="number" id="cYear" placeholder="e.g. 2003" min="1937" max="2026"></div>
    <div class="form-row"><label>Email</label><input type="email" id="cEmail" placeholder="you@example.com"></div>
    <button class="btn gold" id="cGo">Check the registers</button>
    <p class="note">Try: "Itohan Agedo", 2003 (misspelt, fuzzy match) · "Omoruyi Victor Idahosa", 2010 (peer review) · any name with 1975 (archive gap).</p>
    <div id="cOut"></div>
   </div>
   <div class="panel">
    <h3>How verification works</h3>
    <p style="font-size:14px;line-height:1.6"><b>Tier 1 · Automatic.</b> Your name is matched against the digitised registers for your set: exact match, or a fuzzy match of 85% or more (Levenshtein distance, surname/first-name order ignored).<br><br>
    <b>Tier 2 · Peer review.</b> If the match is weaker, or your year's register is missing or damaged, your Class Set Executive and classmates confirm you.<br><br>
    <b>Tier 3 · Admin.</b> Disputes, such as two people claiming one record, go to the Super Admin.</p>
    <h3>Registers digitised (sample)</h3>
    <div class="tablewrap"><table><tr><th>Name in register</th><th>Year</th><th>Status</th></tr>
    ${ROSTER.map(r=>`<tr><td>${esc(r.name)}</td><td>${r.year}</td><td>${r.status==='CLAIMED'?'<span class="badge b-t1">Claimed</span>':'<span class="badge b-un">Unclaimed</span>'}</td></tr>`).join('')}</table></div>
    <p class="note">Missing registers in this sample: ${ARCHIVE_GAPS.join(', ')}.</p>
   </div>
  </div>`;
}
function runClaim(){
  const name=$('#cName').value.trim(), year=+$('#cYear').value, out=$('#cOut');
  if(!name||!year){out.innerHTML='<div class="result warn">Enter your name and year.</div>';return;}
  if(ARCHIVE_GAPS.includes(year)){out.innerHTML=`<div class="result info"><b>Routed to peer review (Tier 2).</b><br>The ${year} register is missing or damaged, so your Class Set Executive and two classmates will confirm you. Your answers also help rebuild the ${year} register ("Anchor &amp; Expand").</div>`;return;}
  const pool=ROSTER.filter(r=>r.year===year);
  if(!pool.length){out.innerHTML=`<div class="result info"><b>Routed to peer review (Tier 2).</b><br>No ${year} register has been digitised yet in this demo.</div>`;return;}
  const best=pool.map(r=>({r,s:similarity(name,r.name)})).sort((a,b)=>b.s-a.s)[0];
  const bar=`<div class="bar" style="margin:8px 0"><i style="width:${best.s}%"></i></div>`;
  if(best.s>=85 && best.r.status==='CLAIMED'){out.innerHTML=`<div class="result warn"><b>Already claimed (Tier 3).</b><br>"${esc(best.r.name)}" (${best.s}% match) has already been claimed, so this goes to the Super Admin to resolve.${bar}</div>`;return;}
  if(best.s>=85){out.innerHTML=`<div class="result ok"><b>Verified automatically (Tier 1).</b><br>Matched to "${esc(best.r.name)}", Set of ${year}: ${best.s}% similarity.${bar}Next: confirm your email and fill in your professional profile.</div>`;return;}
  out.innerHTML=`<div class="result info"><b>Peer review needed (Tier 2).</b><br>Closest record: "${esc(best.r.name)}" at ${best.s}%, below the 85% threshold. Your Class Set Executive will review it.${bar}</div>`;
}

function business(){
  return `<div class="hero"><div><h1>Alumni Business Showcase</h1><p>Businesses owned by ECOBITEs, with offers for fellow old boys.</p></div>${role==='guest'?'':'<button class="btn gold" id="addBiz">List your business</button>'}</div>
  <div class="grid">${BUSINESSES.filter(b=>b.status==='Approved'||role==='admin').map(b=>`<div class="card"><h4>${esc(b.name)}</h4><div class="sub">${esc(b.cat)} · ${esc(b.city)}</div><div style="font-size:14px">Owner: ${esc(b.owner)}</div><div class="tag" style="align-self:flex-start;background:var(--gold-soft)">${esc(b.offer)}</div>${b.status!=='Approved'?'<span class="badge b-t3">Pending admin approval</span>':''}</div>`).join('')}</div>`;
}

function mentor(){
  return `<div class="hero"><div><h1>Mentorship matching</h1><p>Tell us what you want help with; we suggest old boys who've been there.</p></div></div>
  <div class="two"><div class="panel">
   <div class="form-row"><label>I want help with</label><select id="mGoal"><option value="">Choose…</option>${[...new Set(MEMBERS.map(m=>m.industry))].sort().map(i=>`<option>${esc(i)}</option>`).join('')}</select></div>
   <div class="form-row"><label>Skill or interest</label><input type="text" id="mSkill" placeholder="e.g. HSE, Python, investments"></div>
   <div class="form-row"><label>Preferred location</label><select id="mLoc"><option value="">Anywhere</option>${[...new Set(MEMBERS.map(m=>m.country))].sort().map(c=>`<option>${esc(c)}</option>`).join('')}</select></div>
   <button class="btn gold" id="mGo">Find mentors</button></div>
   <div><div id="mOut" class="grid"><div class="empty">Your suggested mentors appear here.</div></div></div></div>`;
}
function runMentor(){
  const g=$('#mGoal').value, s=$('#mSkill').value.trim().toLowerCase(), l=$('#mLoc').value;
  const scored=MEMBERS.filter(m=>m.mentor&&m.tier!=='UN').map(m=>{let sc=0;if(g&&m.industry===g)sc+=50;if(s&&m.skills.some(k=>k.toLowerCase().includes(s)))sc+=35;if(l&&m.country===l)sc+=15;return{m,sc};}).filter(x=>x.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,4);
  $('#mOut').innerHTML = scored.length ? scored.map(({m,sc})=>`<div class="card"><div class="row"><div class="av">${initials(m.name)}</div><div><h4>${esc(m.name)}</h4><div class="sub">${esc(m.role)} · Set of ${m.set}</div></div></div><div class="sub">Match ${sc}%</div><div class="bar"><i style="width:${sc}%"></i></div><button class="btn sm" data-req="${m.id}">Request mentorship</button></div>`).join('') : '<div class="empty">No mentors match yet. Try a broader skill or "Anywhere".</div>';
}

function events(){
  return `<div class="hero"><div><h1>Events</h1><p>Register once; get calendar invites, reminders and a QR pass for check-in.</p></div></div>
  <div class="grid">${EVENTS.map(e=>`<div class="card"><h4>${esc(e.title)}</h4><div class="sub">${new Date(e.date).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'})} · ${esc(e.mode)} · ${esc(e.place)}</div><div class="bar"><i style="width:${Math.round(e.taken/e.seats*100)}%"></i></div><div class="sub">${e.taken} of ${e.seats} places taken</div><button class="btn sm gold" data-ev="${e.id}" ${role==='guest'?'disabled title="Sign in to register"':''}>Register</button></div>`).join('')}</div><div id="passOut"></div>`;
}
function qrSvg(seed){ // decorative QR-style code for the demo pass
  let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;const n=21,s=5;let r='';
  const finder=(x,y)=>`<rect x="${x*s}" y="${y*s}" width="${7*s}" height="${7*s}" fill="#000"/><rect x="${(x+1)*s}" y="${(y+1)*s}" width="${5*s}" height="${5*s}" fill="#fff"/><rect x="${(x+2)*s}" y="${(y+2)*s}" width="${3*s}" height="${3*s}" fill="#000"/>`;
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12))continue;h=(h*1103515245+12345)>>>0;if(h&0x10000)r+=`<rect x="${x*s}" y="${y*s}" width="${s}" height="${s}"/>`;}
  return `<svg width="${n*s}" height="${n*s}" viewBox="0 0 ${n*s} ${n*s}">${finder(0,0)}${finder(14,0)}${finder(0,14)}${r}</svg>`;
}

function admin(){
  if(role==='guest'||role==='member') return `<div class="hero"><div><h1>Verification queue</h1></div></div><div class="result warn">Only Class Set Executives and the Super Admin can see this. Switch "Viewing as" at the top right.</div>`;
  const rows = QUEUE.filter(q=>role==='admin'||q.tier!=='T3');
  return `<div class="hero"><div><h1>Verification queue</h1><p>${role==='admin'?'Super Admin: all tiers, including disputes.':'Class Set Executive: peer review for your sets.'}</p></div><a class="btn gold" href="./" style="text-decoration:none">Open the full admin console &rarr;</a></div>
  <div class="tablewrap"><table><tr><th>Applicant</th><th>Set</th><th>Register record</th><th>Match</th><th>Route</th><th>Action</th></tr>
  ${rows.map((q,i)=>`<tr><td>${esc(q.who)}</td><td>${q.set}</td><td>${esc(q.claimed)}</td><td>${q.score?q.score+'%':'n/a'}</td><td>${badge(q.tier)}<div class="note">${esc(q.note)}</div></td><td id="act${i}">${q.tier==='T1'?'<span class="sub">Auto-verified</span>':`<button class="btn sm" data-ok="${i}">Approve</button> <button class="btn sm ghost" data-no="${i}">Reject</button>`}</td></tr>`).join('')}</table></div>
  <p class="note">Every decision is written to verification_logs with who decided and when.</p>`;
}

function insights(){
  const by=(k)=>Object.entries(MEMBERS.reduce((a,m)=>(a[m[k]]=(a[m[k]]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]);
  const max=MEMBERS.length;
  const bars=arr=>arr.map(([k,v])=>`<div style="display:grid;grid-template-columns:140px 1fr 30px;gap:8px;align-items:center;font-size:13px;margin:5px 0"><span>${esc(k)}</span><div class="bar"><i style="width:${v/max*100}%"></i></div><b>${v}</b></div>`).join('');
  const ver=MEMBERS.filter(m=>m.tier!=='UN').length;
  return `<div class="hero"><div><h1>Insights</h1><p>What the executive dashboard (Metabase / Power BI) would show.</p></div></div>
  <div class="kv"><div class="stat"><b>${MEMBERS.length}</b><span>profiles</span></div><div class="stat"><b>${Math.round(ver/MEMBERS.length*100)}%</b><span>verified</span></div><div class="stat"><b>${MEMBERS.filter(m=>m.mentor).length}</b><span>mentors</span></div><div class="stat"><b>${ROSTER.filter(r=>r.status==='UNCLAIMED').length}</b><span>unclaimed register records</span></div><div class="stat"><b>${EVENTS.reduce((a,e)=>a+e.taken,0)}</b><span>event registrations</span></div></div>
  <div class="two"><div class="panel"><h3>By industry</h3>${bars(by('industry'))}</div><div class="panel"><h3>By country</h3>${bars(by('country'))}</div></div>`;
}

// ---------- Modal ----------
function openModal(html){ $('#modalBox').innerHTML=html; $('#modal').classList.add('open'); }
function closeModal(){ $('#modal').classList.remove('open'); }
$('#modal').addEventListener('click',e=>{ if(e.target.id==='modal'||e.target.dataset.close!==undefined) closeModal(); });

// ---------- Render + events ----------
function render(){
  const views={directory,claim,business,mentor,events,admin,insights};
  $('#main').innerHTML=views[tab]();
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
}
$('#nav').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; tab=b.dataset.tab; render(); });
$('#role').addEventListener('change',e=>{ role=e.target.value; render(); });

$('#main').addEventListener('input',e=>{
  if(e.target.id==='q'){ filters.q=e.target.value; const pos=e.target.selectionStart; render(); const q=$('#q'); q.focus(); q.setSelectionRange(pos,pos); }
});
$('#main').addEventListener('change',e=>{
  const t=e.target;
  if(t.dataset.f){ filters[t.dataset.f][t.checked?'add':'delete'](t.value); render(); }
  if(t.id==='set'){ filters.set=t.value; render(); }
  if(t.id==='mentors'){ filters.mentors=t.checked; render(); }
});
$('#main').addEventListener('click',e=>{
  const t=e.target.closest('button'); if(!t) return;
  if(t.id==='cGo') runClaim();
  if(t.id==='mGo') runMentor();
  if(t.dataset.msg){ const m=MEMBERS.find(x=>x.id==t.dataset.msg); openModal(`<h3>Message ${esc(m.name)}</h3><p class="note">Your message is forwarded by the platform. ${esc(m.name.split(' ')[0])}'s phone and email are never shown to you, which stops scraping.</p><div class="form-row" style="margin-top:12px"><textarea placeholder="Hello from a fellow ECOBITE…"></textarea></div><button class="btn" data-sent>Send (demo)</button> <button class="btn ghost" data-close>Cancel</button>`); }
  if(t.dataset.req){ const m=MEMBERS.find(x=>x.id==t.dataset.req); openModal(`<h3>Mentorship request sent</h3><p>${esc(m.name)} gets your request and goals. If they accept, you're both introduced by email. (Demo: nothing is actually sent.)</p><div style="margin-top:14px"><button class="btn" data-close>OK</button></div>`); }
  if(t.dataset.ev){ const ev=EVENTS.find(x=>x.id===t.dataset.ev); const code='ECOBA-'+ev.id.toUpperCase()+'-'+(1000+Math.floor(Math.random()*9000));
    $('#passOut').innerHTML=`<h2 class="section-title">Your digital pass</h2><div class="pass"><div class="qr">${qrSvg(code)}</div><div><div style="color:var(--gold-soft);font-size:12px;letter-spacing:1px">ECOBA EVENT PASS</div><div style="font-family:Fraunces,serif;font-size:20px;margin:4px 0">${esc(ev.title)}</div><div style="font-size:14px">${esc(ev.place)} · ${new Date(ev.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div><div style="font-size:13px;margin-top:6px;color:#C9D3E2">Pass ${code} · show at check-in. A calendar invite and reminders (7 days, 1 day, 1 hour) follow by email/WhatsApp.</div></div></div>`;
    $('#passOut').scrollIntoView({behavior:'smooth'}); }
  if(t.id==='addBiz') openModal(`<h3>List your business</h3><div class="form-row"><label>Business name</label><input type="text"></div><div class="form-row"><label>Category</label><select><option>Agriculture</option><option>Energy</option><option>Legal</option><option>Technology</option><option>Health</option><option>Other</option></select></div><div class="form-row"><label>Offer for ECOBITEs</label><input type="text" placeholder="e.g. 10% off for members"></div><p class="note">Listings go live after an administrator approves them.</p><button class="btn gold" data-sent>Submit (demo)</button> <button class="btn ghost" data-close>Cancel</button>`);
  if(t.dataset.ok!==undefined) $('#act'+t.dataset.ok).innerHTML='<span class="badge b-t1">Approved</span>';
  if(t.dataset.no!==undefined) $('#act'+t.dataset.no).innerHTML='<span class="badge b-un">Rejected</span>';
});
$('#modalBox').addEventListener('click',e=>{ if(e.target.dataset.sent!==undefined){ $('#modalBox').innerHTML='<h3>Done</h3><p>In the live platform this would be sent now. Nothing was sent from this demo.</p><div style="margin-top:14px"><button class="btn" data-close>Close</button></div>'; }});

render();

// Hide the pinned "Built by" badge while the credit strip at the bottom is on screen
(function(){const strip=document.querySelector('.builtby'),badge=document.querySelector('.bb-badge');
 if(!strip||!badge||!('IntersectionObserver' in window))return;
 new IntersectionObserver(es=>es.forEach(e=>badge.classList.toggle('hide',e.isIntersecting))).observe(strip);})();
