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

  /* ---------- Chart 1: bar — hiring gap ---------- */
  (function(){
    const svg = document.getElementById('chart-gap');
    const gold = cssVar('--gold'), line = cssVar('--line');
    const data = [
      {label:"Employers struggling to hire digital talent", value:70, note:"70% report real difficulty hiring"},
      {label:"Cybersecurity workforce", value:90.6, note:"90.6% of demand unfilled"}
    ];
    const W=640,H=190, top=10, bottom=44, left=230, right=70;
    const plotW = W-left-right, plotH = H-top-bottom;
    const maxV = 100;
    [0,25,50,75,100].forEach(g=>{
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
      const bar = el('rect',{x:left,y:y,width:0,height:barH,rx:4,fill:gold,class:'hover-target'});
      bar.style.transition='width .5s ease';
      svg.appendChild(bar);
      requestAnimationFrame(()=>bar.setAttribute('width', Math.max(w,4)));
      const val = el('text',{x:left+w+10,y:y+barH/2+4,class:'value-label'});
      val.textContent = d.value+'%'; svg.appendChild(val);
      bar.addEventListener('mousemove',(e)=>showTip(e, d.label, d.note));
      bar.addEventListener('mouseleave', hideTip);
    });
  })();

  /* ---------- Chart 2: line/area — digital payments market ---------- */
  (function(){
    const svg = document.getElementById('chart-market');
    const slate = cssVar('--slate'), line = cssVar('--line');
    const years = [2024,2025,2026,2027,2028];
    const vals = [21.39,23.54,25.90,28.50,31.28];
    const W=640,H=220, top=16, bottom=36, left=52, right=20;
    const plotW=W-left-right, plotH=H-top-bottom;
    const maxV = 35;
    [0,8.75,17.5,26.25,35].forEach(g=>{
      const y = top+plotH-(g/maxV)*plotH;
      svg.appendChild(el('line',{x1:left,y1:y,x2:left+plotW,y2:y,stroke:line,'stroke-width':1}));
      const t = el('text',{x:left-10,y:y+4,'text-anchor':'end',class:'axis-label'});
      t.textContent = '$'+Math.round(g)+'B'; svg.appendChild(t);
    });
    const x = (i)=> left + (i/(years.length-1))*plotW;
    const y = (v)=> top+plotH-(v/maxV)*plotH;
    years.forEach((yr,i)=>{
      const t = el('text',{x:x(i),y:top+plotH+22,'text-anchor':'middle',class:'axis-label'});
      t.textContent = yr; svg.appendChild(t);
    });
    let areaPts = 'M'+x(0)+','+(top+plotH);
    vals.forEach((v,i)=> areaPts += ' L'+x(i)+','+y(v));
    areaPts += ' L'+x(vals.length-1)+','+(top+plotH)+' Z';
    svg.appendChild(el('path',{d:areaPts, fill:slate, opacity:0.12, stroke:'none'}));
    let linePts = '';
    vals.forEach((v,i)=> linePts += (i===0?'M':'L')+x(i)+','+y(v));
    const linePath = el('path',{d:linePts, fill:'none', stroke:slate, 'stroke-width':2, 'stroke-linejoin':'round','stroke-linecap':'round'});
    svg.appendChild(linePath);
    const len = linePath.getTotalLength ? linePath.getTotalLength() : 800;
    linePath.style.strokeDasharray = len;
    linePath.style.strokeDashoffset = len;
    linePath.style.transition = 'stroke-dashoffset 1s ease';
    requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ linePath.style.strokeDashoffset = 0; }); });
    vals.forEach((v,i)=>{
      const ring = el('circle',{cx:x(i),cy:y(v),r:6,fill:cssVar('--surface')});
      const dot = el('circle',{cx:x(i),cy:y(v),r:4,fill:slate,class:'hover-target'});
      svg.appendChild(ring); svg.appendChild(dot);
      dot.addEventListener('mousemove',(e)=>showTip(e, years[i], '$'+v.toFixed(2)+'B market size'));
      dot.addEventListener('mouseleave', hideTip);
      ring.addEventListener('mousemove',(e)=>showTip(e, years[i], '$'+v.toFixed(2)+'B market size'));
      ring.addEventListener('mouseleave', hideTip);
    });
    const endLbl = el('text',{x:x(vals.length-1)-4,y:y(vals[vals.length-1])-14,'text-anchor':'end',class:'value-label'});
    endLbl.textContent = '$31.28B';
    svg.appendChild(endLbl);
  })();

  /* ---------- Chart 3: bar — fraud loss year over year ---------- */
  (function(){
    const svg = document.getElementById('chart-fraud');
    const gold = cssVar('--gold'), slate = cssVar('--slate'), line = cssVar('--line');
    const data = [
      {label:'2024', value:52.26, note:'₦52.26B lost to electronic payment fraud', color: gold},
      {label:'2025', value:25.85, note:'₦25.85B lost — a 51% drop', color: slate}
    ];
    const W=640,H=190, top=10, bottom=44, left=100, right=110;
    const plotW=W-left-right, plotH=H-top-bottom;
    const maxV=60;
    [0,15,30,45,60].forEach(g=>{
      const x = left + (g/maxV)*plotW;
      svg.appendChild(el('line',{x1:x,y1:top,x2:x,y2:top+plotH,stroke:line,'stroke-width':1}));
      const t = el('text',{x:x,y:top+plotH+18,'text-anchor':'middle',class:'axis-label'});
      t.textContent = '₦'+g+'B'; svg.appendChild(t);
    });
    const barH=32, gap=32;
    data.forEach((d,i)=>{
      const y = top + i*(barH+gap) + 6;
      const w = (d.value/maxV)*plotW;
      const lbl = el('text',{x:left-14,y:y+barH/2+4,'text-anchor':'end',class:'cat-label'});
      lbl.textContent = d.label; svg.appendChild(lbl);
      const bar = el('rect',{x:left,y:y,width:0,height:barH,rx:4,fill:d.color,class:'hover-target'});
      bar.style.transition='width .5s ease';
      svg.appendChild(bar);
      requestAnimationFrame(()=>bar.setAttribute('width', Math.max(w,4)));
      const val = el('text',{x:left+w+10,y:y+barH/2+4,class:'value-label'});
      val.textContent = '₦'+d.value.toFixed(2)+'B'; svg.appendChild(val);
      bar.addEventListener('mousemove',(e)=>showTip(e, d.label, d.note));
      bar.addEventListener('mouseleave', hideTip);
    });
  })();

  document.addEventListener('mousemove', function(e){
    if(tooltip.classList.contains('show')) moveTip(e);
  });
})();
