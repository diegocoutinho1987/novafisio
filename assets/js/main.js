const header=document.querySelector('.site-header');
const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
const mobileWhats=document.querySelector('.mobile-whatsapp');

function trackEvent(name, details={}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event:name,...details});
}

menuBtn?.addEventListener('click',()=>{
  const open=menuBtn.getAttribute('aria-expanded')==='true';
  menuBtn.setAttribute('aria-expanded',String(!open));
  menuBtn.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');
  nav.classList.toggle('open',!open);
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false');
}));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){nav?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');menuBtn?.focus();}
});
window.addEventListener('scroll',()=>{
  header?.classList.toggle('scrolled',window.scrollY>8);
  mobileWhats?.classList.toggle('visible',window.scrollY>420);
},{passive:true});

document.querySelectorAll('.track-whatsapp').forEach(el=>el.addEventListener('click',()=>trackEvent('click_whatsapp')));
document.querySelectorAll('.track-phone').forEach(el=>el.addEventListener('click',()=>trackEvent('click_phone')));
document.querySelectorAll('.track-directions').forEach(el=>el.addEventListener('click',()=>trackEvent('click_directions')));
document.querySelectorAll('.track-specialty').forEach(el=>el.addEventListener('click',()=>trackEvent('click_specialty',{specialty:el.getAttribute('href')})));
document.querySelectorAll('.track-schedule').forEach(el=>el.addEventListener('click',()=>trackEvent('click_schedule')));

document.querySelectorAll('details').forEach(d=>{
  d.addEventListener('toggle',()=>d.querySelector('summary')?.setAttribute('aria-expanded',String(d.open)));
  d.querySelector('summary')?.setAttribute('aria-expanded','false');
});
document.getElementById('year').textContent=new Date().getFullYear();
