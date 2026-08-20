(function(){
  const NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs){
    const e = document.createElementNS(NS, tag);
    for(const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  const cssVar = (name) => 'var(' + name + ')';

  const tooltip = document.getElementById('tooltip');
  function showTip(evt, headHtml, bodyHtml){
    tooltip.innerHTML = '<div class="tt-head">'+headHtml+'</div>'+(bodyHtml||'');
    tooltip.classList.add('show');
    moveTip(evt);
  }
  function moveTip(evt){
    const pad = 14;
    let x = evt.clientX + pad, y = evt.clientY + pad;
    const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
    if(x + tw > window.innerWidth - 8) x = evt.clientX - tw - pad;
    if(y + th > window.innerHeight - 8) y = evt.clientY - th - pad;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }
  function hideTip(){ tooltip.classList.remove('show'); }

  /* ---------- Chart 1: bar — skills supply gap ---------- */
  (function(){
    const svg = document.getElementById('chart-gap');
    const cyan = cssVar('--cyan'), line = cssVar('--line');
    const data = [
      {label:"Advanced digital skills employers require", value:30, note:"Required across roughly 30% of roles"},
      {label:"Workers who currently possess them", value:11, note:"Only 11% of the workforce today"}
    ];
    const W=640,H=190, top=10, bottom=44, left=260, right=70;
    const plotW = W-left-right, plotH = H-top-bottom;
    const maxV = 40;
    [0,10,20,30,40].forEach(g=>{
      const x = left + (g/maxV)*plotW;
      svg.appendChild(el('line',{x1:x,y1:top,x2:x,y2:top+plotH,stroke:line,'stroke-width':1}));
      const t = el('text',{x:x,y:top+plotH+18,'text-anchor':'middle',class:'axis-label'});
      t.textContent = g+'%'; svg.appendChild(t);
    });
    const barH = 30, gap = 34;
    data.forEach((d,i)=>{
      const y = top + i*(barH+gap) + 8;
      const w = (d.value/maxV)*plotW;
      const lbl = el('text',{x:left-14,y:y+barH/2+4,'text-anchor':'end',class:'cat-label'});
      lbl.textContent = d.label; svg.appendChild(lbl);
      const bar = el('rect',{x:left,y:y,width:0,height:barH,rx:4,fill:cyan,class:'hover-target'});
      bar.style.transition='width .5s ease';
      svg.appendChild(bar);
      requestAnimationFrame(()=>bar.setAttribute('width', Math.max(w,4)));
      const val = el('text',{x:left+w+10,y:y+barH/2+4,class:'value-label'});
      val.textContent = d.value+'%'; svg.appendChild(val);
      bar.addEventListener('mousemove',(e)=>showTip(e, d.label, d.note));
      bar.addEventListener('mouseleave', hideTip);
    });
  })();

  /* ---------- Chart 2: line/area — active subscriptions ---------- */
  (function(){
    const svg = document.getElementById('chart-market');
    const coral = cssVar('--coral'), line = cssVar('--line');
    const points = [
      {label:'Jan 2025', value:169.3},
      {label:'Dec 2025', value:179.64},
      {label:'Jan 2026', value:182.2},
      {label:'May 2026', value:189.68}
    ];
    const W=640,H=220, top=16, bottom=36, left=52, right=20;
    const plotW=W-left-right, plotH=H-top-bottom;
    const maxV = 200;
    [0,50,100,150,200].forEach(g=>{
      const y = top+plotH-(g/maxV)*plotH;
      svg.appendChild(el('line',{x1:left,y1:y,x2:left+plotW,y2:y,stroke:line,'stroke-width':1}));
      const t = el('text',{x:left-10,y:y+4,'text-anchor':'end',class:'axis-label'});
      t.textContent = g+'M'; svg.appendChild(t);
    });
    const x = (i)=> left + (i/(points.length-1))*plotW;
    const y = (v)=> top+plotH-(v/maxV)*plotH;
    points.forEach((p,i)=>{
      const t = el('text',{x:x(i),y:top+plotH+22,'text-anchor':'middle',class:'axis-label'});
      t.textContent = p.label; svg.appendChild(t);
    });
    let areaPts = 'M'+x(0)+','+(top+plotH);
    points.forEach((p,i)=> areaPts += ' L'+x(i)+','+y(p.value));
    areaPts += ' L'+x(points.length-1)+','+(top+plotH)+' Z';
    svg.appendChild(el('path',{d:areaPts, fill:coral, opacity:0.12, stroke:'none'}));
    let linePts = '';
    points.forEach((p,i)=> linePts += (i===0?'M':'L')+x(i)+','+y(p.value));
    const linePath = el('path',{d:linePts, fill:'none', stroke:coral, 'stroke-width':2, 'stroke-linejoin':'round','stroke-linecap':'round'});
    svg.appendChild(linePath);
    const len = linePath.getTotalLength ? linePath.getTotalLength() : 800;
    linePath.style.strokeDasharray = len;
    linePath.style.strokeDashoffset = len;
    linePath.style.transition = 'stroke-dashoffset 1s ease';
    requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ linePath.style.strokeDashoffset = 0; }); });
    points.forEach((p,i)=>{
      const ring = el('circle',{cx:x(i),cy:y(p.value),r:6,fill:cssVar('--surface')});
      const dot = el('circle',{cx:x(i),cy:y(p.value),r:4,fill:coral,class:'hover-target'});
      svg.appendChild(ring); svg.appendChild(dot);
      dot.addEventListener('mousemove',(e)=>showTip(e, p.label, p.value.toFixed(2)+'M active subscriptions'));
      dot.addEventListener('mouseleave', hideTip);
      ring.addEventListener('mousemove',(e)=>showTip(e, p.label, p.value.toFixed(2)+'M active subscriptions'));
      ring.addEventListener('mouseleave', hideTip);
    });
    const endLbl = el('text',{x:x(points.length-1)-4,y:y(points[points.length-1].value)-14,'text-anchor':'end',class:'value-label'});
    endLbl.textContent = '189.68M';
    svg.appendChild(endLbl);
  })();

  /* ---------- Chart 3: bar — SIM-swap fraud indexed ---------- */
  (function(){
    const svg = document.getElementById('chart-fraud');
    const critical = cssVar('--critical'), line = cssVar('--line');
    const data = [
      {label:'2022 (baseline)', value:100, note:'Indexed baseline'},
      {label:'2024', value:400, note:'+300% increase in reported cases'}
    ];
    const W=640,H=190, top=10, bottom=44, left=150, right=90;
    const plotW=W-left-right, plotH=H-top-bottom;
    const maxV=450;
    [0,112.5,225,337.5,450].forEach(g=>{
      const x = left + (g/maxV)*plotW;
      svg.appendChild(el('line',{x1:x,y1:top,x2:x,y2:top+plotH,stroke:line,'stroke-width':1}));
      const t = el('text',{x:x,y:top+plotH+18,'text-anchor':'middle',class:'axis-label'});
      t.textContent = Math.round(g); svg.appendChild(t);
    });
    const barH=32, gap=32;
    data.forEach((d,i)=>{
      const y = top + i*(barH+gap) + 6;
      const w = (d.value/maxV)*plotW;
      const lbl = el('text',{x:left-14,y:y+barH/2+4,'text-anchor':'end',class:'cat-label'});
      lbl.textContent = d.label; svg.appendChild(lbl);
      const bar = el('rect',{x:left,y:y,width:0,height:barH,rx:4,fill:critical,class:'hover-target'});
      bar.style.transition='width .5s ease';
      svg.appendChild(bar);
      requestAnimationFrame(()=>bar.setAttribute('width', Math.max(w,4)));
      const val = el('text',{x:left+w+10,y:y+barH/2+4,class:'value-label'});
      val.textContent = d.value; svg.appendChild(val);
      bar.addEventListener('mousemove',(e)=>showTip(e, d.label, d.note));
      bar.addEventListener('mouseleave', hideTip);
    });
    const foot = el('text',{x:left,y:H-2,class:'axis-label'});
    foot.textContent = 'index, 2022 = 100 (absolute case counts not publicly broken out)';
    svg.appendChild(foot);
  })();

  document.addEventListener('mousemove', function(e){
    if(tooltip.classList.contains('show')) moveTip(e);
  });
})();
