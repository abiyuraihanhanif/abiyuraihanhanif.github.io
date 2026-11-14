(() => {
  const selected=['9','8','2'];
  const section=document.createElement('section');section.className='showcase-scroll';section.id='showcase';
  section.setAttribute('aria-label','Project showcase');
  section.innerHTML=`<div class="showcase-sticky"><div class="showcase-heading"><span class="eyebrow">PROJECT SPOTLIGHT</span><span class="showcase-hint">Scroll untuk menjelajahi</span></div><div class="showcase-panel"><div class="showcase-copy"><span class="showcase-index">01 / 03</span><h2></h2><p></p><div class="tags"></div><button class="button spotlight-open">Buka studi kasus <span>↗</span></button></div><div class="showcase-stage" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="dashboard-deck"><div class="dashboard-top"><span>ANALYTICS / WORKSPACE</span><i></i><i></i><i></i></div><div class="dashboard-body"><div class="dash-sidebar"><b></b><b></b><b></b><b></b></div><div class="dash-main"><div class="dash-kpis"><i></i><i></i><i></i></div><div class="dash-chart"><svg viewBox="0 0 400 160"><path class="chart-grid" d="M0 40H400M0 80H400M0 120H400"/><path class="chart-area" d="M0 140L50 110L100 120L150 60L200 85L250 40L300 55L350 20L400 5V160H0Z"/><path class="chart-line" d="M0 140L50 110L100 120L150 60L200 85L250 40L300 55L350 20L400 5"/></svg></div><div class="dash-bars">${[45,70,55,90,65,80,100].map(h=>`<i style="--bar-height:${h}%"></i>`).join('')}</div></div></div></div><div class="data-chip"><span>SQL → PYTHON</span><strong>INSIGHT</strong><span>→ DECISION</span></div><span class="illustration-label">Ilustrasi visual · bukan data proyek</span></div><div class="showcase-controls"><button class="spotlight-prev" aria-label="Proyek sebelumnya">←</button><div class="showcase-dots">${selected.map((id,i)=>`<button data-slide="${i}" aria-label="${projects[id].title}" aria-pressed="${i===0}"><span>${i+1}</span></button>`).join('')}</div><button class="spotlight-next" aria-label="Proyek berikutnya">→</button></div></div></div>`;
  document.querySelector('#proyek').before(section);
  const panel=section.querySelector('.showcase-panel'),stage=section.querySelector('.showcase-stage');
  const media=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width: 760px)');
  let active=-1,frame=0;
  function render(index){
    if(index===active)return;active=index;const p=projects[selected[index]];
    section.querySelector('.showcase-copy h2').textContent=p.title;
    section.querySelector('.showcase-copy>p').textContent=p.idText;
    section.querySelector('.showcase-index').textContent=`0${index+1} / 03`;
    section.querySelector('.showcase-copy .tags').innerHTML=p.tools.map(t=>`<span>${t}</span>`).join('');
    panel.dataset.scene=index;
    section.querySelectorAll('[data-slide]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.slide===index)));
    window.translatePage?.();
    if(!media.matches){section.querySelectorAll('.showcase-copy,.dashboard-deck,.data-chip').forEach((el,i)=>el.animate([{opacity:.2,translate:`0 ${i?28:15}px`},{opacity:1,translate:'0 0'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'}));}
  }
  function onScroll(){frame=0;if(media.matches||compact.matches)return;const r=section.getBoundingClientRect();const distance=section.offsetHeight-innerHeight;if(distance<=0)return;const progress=Math.max(0,Math.min(1,-r.top/distance));render(Math.min(2,Math.floor(progress*3)));stage.style.setProperty('--scroll-turn',`${(progress-.5)*8}deg`);}
  function select(index){index=(index+3)%3;if(media.matches||compact.matches){render(index);return;}const top=scrollY+section.getBoundingClientRect().top;const distance=section.offsetHeight-innerHeight;window.scrollTo({top:top+distance*(index+.35)/3,behavior:'smooth'});}
  section.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>select(+b.dataset.slide)));
  section.querySelector('.spotlight-prev').addEventListener('click',()=>select(active-1));section.querySelector('.spotlight-next').addEventListener('click',()=>select(active+1));
  section.querySelector('.spotlight-open').addEventListener('click',()=>document.querySelector(`[data-project="${selected[active]}"]`).click());
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(onScroll)},{passive:true});addEventListener('resize',onScroll);media.addEventListener('change',onScroll);compact.addEventListener('change',onScroll);
  render(0);onScroll();
})();
