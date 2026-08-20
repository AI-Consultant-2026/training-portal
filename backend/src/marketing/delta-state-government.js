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

  function barChart(svgId, data, opts){
    const svg = document.getElementById(svgId);
    const line = cssVar('--line');
    const W=640,H=190, top=10, bottom=44;
    const left = opts.left || 220, right = opts.right || 80;
    const plotW = W-left-right, plotH = H-top-bottom;
    const maxV = opts.maxV;
    const ticks = opts.ticks;
    ticks.forEach(g=>{
      const x = left + (g/maxV)*plotW;
      svg.appendChild(el('line',{x1:x,y1:top,x2:x,y2:top+plotH,stroke:line,'stroke-width':1}));
      const t = el('text',{x:x,y:top+plotH+18,'text-anchor':'middle',class:'axis-label'});
      t.textContent = opts.tickFmt ? opts.tickFmt(g) : g; svg.appendChild(t);
    });
    const barH = 30, gap = 34;
    data.forEach((d,i)=>{
      const y = top + i*(barH+gap) + 8;
      const w = (d.value/maxV)*plotW;
      const lbl = el('text',{x:left-14,y:y+barH/2+4,'text-anchor':'end',class:'cat-label'});
      lbl.textContent = d.label; svg.appendChild(lbl);
      const bar = el('rect',{x:left,y:y,width:0,height:barH,rx:4,fill:d.color,class:'hover-target'});
      bar.style.transition='width .5s ease';
      svg.appendChild(bar);
      requestAnimationFrame(()=>bar.setAttribute('width', Math.max(w,4)));
      const val = el('text',{x:left+w+10,y:y+barH/2+4,class:'value-label'});
      val.textContent = opts.valFmt ? opts.valFmt(d.value) : d.value; svg.appendChild(val);
      bar.addEventListener('mousemove',(e)=>showTip(e, d.label, d.note));
      bar.addEventListener('mouseleave', hideTip);
    });
  }

  const green = cssVar('--green'), gold = cssVar('--gold');

  barChart('chart-gap', [
    {label:"Delta State youth unemployment", value:64, note:"64% of Delta's youth labour force", color: gold},
    {label:"Nigeria national youth unemployment", value:53, note:"53% nationally", color: green}
  ], { maxV:80, ticks:[0,20,40,60,80], tickFmt:(g)=>g+'%', valFmt:(v)=>v+'%', left:270 });

  barChart('chart-igr', [
    {label:"2023", value:84, note:"₦84B — pre-reform baseline", color: green},
    {label:"Today (2026)", value:200, note:"₦200B+ — a 138% rise", color: gold}
  ], { maxV:220, ticks:[0,55,110,165,220], tickFmt:(g)=>'₦'+g+'B', valFmt:(v)=>'₦'+v+'B'+(v===200?'+':''), left:140 });

  barChart('chart-diversify', [
    {label:"2013", value:41.9, note:"41.9% of GDP from non-oil activity", color: green},
    {label:"2020", value:52.5, note:"52.5% of GDP from non-oil activity", color: gold}
  ], { maxV:60, ticks:[0,15,30,45,60], tickFmt:(g)=>g+'%', valFmt:(v)=>v+'%', left:140 });

  document.addEventListener('mousemove', function(e){
    if(tooltip.classList.contains('show')) moveTip(e);
  });

  /* ---------- Delta State schematic map ---------- */
  (function(){
    const svg = document.getElementById('delta-map');
    const line = cssVar('--line'), ink3 = cssVar('--ink-3'), ink2 = cssVar('--ink-2'), ink = cssVar('--ink');
    const surface2 = cssVar('--surface-2');

    const shapePath = "M126,42 C168,30 232,30 274,46 C300,64 312,110 316,158 "+
      "C320,206 316,254 304,292 C314,308 306,322 292,318 C296,336 280,344 266,332 "+
      "C270,350 250,354 240,338 C238,356 216,358 208,340 C202,358 178,356 174,336 "+
      "C166,352 144,346 146,326 C130,332 116,318 122,300 C104,300 92,282 100,264 "+
      "C82,258 76,236 88,220 C68,206 66,178 82,158 C68,140 74,108 100,92 "+
      "C96,70 108,50 126,42 Z";

    svg.appendChild(el('path',{d:shapePath, fill:surface2, stroke:green, 'stroke-width':2, 'stroke-linejoin':'round'}));

    // Atlantic label + wave hint below the shape
    for(let i=0;i<5;i++){
      const cx = 90 + i*40;
      svg.appendChild(el('path',{d:'M'+(cx-14)+',372 Q'+cx+',364 '+(cx+14)+',372', fill:'none', stroke:ink3, 'stroke-width':1.4, 'stroke-linecap':'round'}));
    }

    function pin(x,y,label,big){
      const g = el('g',{});
      g.appendChild(el('circle',{cx:x,cy:y,r:big?6:4.5,fill:big?gold:green,stroke:cssVar('--surface'),'stroke-width':2}));
      const t = el('text',{x:x+10,y:y+4,'font-family':"'IBM Plex Sans',sans-serif",'font-size':big?13:11.5,'font-weight':big?600:500,fill:ink});
      t.textContent = label;
      g.appendChild(t);
      svg.appendChild(g);
    }

    function neighbor(x,y,label,anchor){
      const t = el('text',{x:x,y:y,'text-anchor':anchor||'middle','font-family':"'IBM Plex Mono',monospace",'font-size':10.5,'letter-spacing':'.05em',fill:ink3});
      t.textContent = label;
      svg.appendChild(t);
    }

    neighbor(200,18,'EDO STATE');
    neighbor(392,180,'ANAMBRA / RIVERS','end');
    neighbor(8,220,'ONDO STATE','start');
    neighbor(200,404,'ATLANTIC OCEAN');

    pin(258,88,'Asaba (capital)', true);
    pin(196,104,'Agbor');
    pin(196,214,'Ughelli');
    pin(150,254,'Sapele');
    pin(162,300,'Warri', true);

    // compass
    const cg = el('g',{transform:'translate(348,52)'});
    cg.appendChild(el('circle',{cx:0,cy:0,r:16,fill:'none',stroke:line,'stroke-width':1}));
    cg.appendChild(el('path',{d:'M0,-11 L4,2 L0,-2 L-4,2 Z',fill:ink2}));
    const nlabel = el('text',{x:0,y:-19,'text-anchor':'middle','font-family':"'IBM Plex Mono',monospace",'font-size':9,fill:ink3});
    nlabel.textContent = 'N';
    cg.appendChild(nlabel);
    svg.appendChild(cg);
  })();
})();
