const menuButton=document.querySelector('.menu-button'),nav=document.querySelector('.nav');
// 실제 Google Play 등록 주소가 확정되면 아래 한 곳에 입력합니다.
const GOOGLE_PLAY_URL='';
const googlePlay=document.querySelector('#google-play-link');
if(/^https:\/\/play\.google\.com\/store\/apps\/details\?id=[A-Za-z0-9._]+(?:&.*)?$/.test(GOOGLE_PLAY_URL)){
 googlePlay.href=GOOGLE_PLAY_URL;googlePlay.target='_blank';googlePlay.rel='noopener noreferrer';googlePlay.removeAttribute('aria-disabled');googlePlay.setAttribute('aria-label','Google Play에서 설비로그 다운로드');googlePlay.classList.add('is-live');document.querySelector('#google-play-status').textContent='Google Play에서 만나보세요.';
}
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');nav.classList.remove('open')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const portrait=document.querySelector('#community-video'),playButton=document.querySelector('#community-play'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const brandDialog=document.querySelector('#brand-dialog'),brandVideo=brandDialog.querySelector('video');
let manualPause=false,portraitInView=false;
portrait.controls=false;
function updateVideoButton(){playButton.setAttribute('aria-label',portrait.paused?'커뮤니티 영상 재생':'커뮤니티 영상 일시정지');playButton.setAttribute('aria-pressed',String(!portrait.paused));playButton.querySelector('span').textContent=portrait.paused?'재생':'일시정지';playButton.classList.toggle('is-paused',portrait.paused)}
function syncPortrait(){if(!portraitInView||document.hidden||brandDialog.open)portrait.pause();else if(!manualPause&&!reduced.matches)portrait.play().catch(updateVideoButton)}
playButton.addEventListener('click',()=>{if(portrait.paused){manualPause=false;portrait.play().catch(updateVideoButton)}else{manualPause=true;portrait.pause()}updateVideoButton()});
portrait.addEventListener('play',updateVideoButton);portrait.addEventListener('pause',updateVideoButton);portrait.addEventListener('loadeddata',updateVideoButton);updateVideoButton();
new IntersectionObserver(entries=>entries.forEach(entry=>{portraitInView=entry.isIntersecting&&entry.intersectionRatio>=.15;syncPortrait()}),{threshold:[0,.15]}).observe(portrait);
reduced.addEventListener('change',()=>{if(reduced.matches)portrait.pause();else syncPortrait()});
document.addEventListener('visibilitychange',syncPortrait);
document.querySelector('.film-open').addEventListener('click',()=>{brandDialog.showModal();portrait.pause();brandVideo.play().catch(()=>{})});
document.querySelector('.film-close').addEventListener('click',()=>brandDialog.close());
brandDialog.addEventListener('close',()=>{brandVideo.pause();syncPortrait()});
brandDialog.addEventListener('click',e=>{if(e.target===brandDialog){const r=brandDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)brandDialog.close()}});
