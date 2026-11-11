const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
let lastTrigger;
function openDialog(markup, trigger) {
  if (!modal.open) lastTrigger = trigger || document.activeElement;
  content.innerHTML = markup;
  modal.showModal();
  document.body.classList.add('modal-open');
}
modal.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) { const r = modal.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modal.close(); } });
modal.addEventListener('close', () => { content.querySelector('video')?.pause(); content.innerHTML = ''; document.body.classList.remove('modal-open'); lastTrigger?.focus({preventScroll:true}); });
const booking = `<span class="eyebrow">LET’S START WITH YOU</span><h2 id="modal-title">What’s on<br>your mind?</h2><p>Try the consultation journey. This is a demo: nothing is sent or saved. Please use example details.</p><form id="booking-form"><label>Your first name<input name="name" placeholder="e.g. Alex" required maxlength="60" autocomplete="off"></label><label>Email address<input name="email" type="email" placeholder="alex@example.com" required maxlength="150" autocomplete="off"></label><label>I’m interested in<select name="interest" required><option value="">Choose an option</option><option>Everyday dental care</option><option>Clear aligners</option><option>Whitening & bonding</option><option>I’m not sure yet</option></select></label><label>When are you considering treatment?<select name="timing" required><option value="">Choose an option</option><option>Just exploring</option><option>In the next few months</option><option>I’d like to discuss it soon</option></select></label><button class="button" type="submit">Try the consultation request ↗</button><span class="disclaimer">DEMO ONLY · NO APPOINTMENT WILL BE CREATED</span></form>`;
document.addEventListener('click', event => {
  const button = event.target.closest('button'); if(!button) return;
  if(button.hasAttribute('data-book')) openDialog(booking, button);
  if(button.dataset.treatment) openDialog(`<span class="eyebrow">EXPLORE YOUR OPTIONS</span><h2 id="modal-title">${button.dataset.treatment}</h2><p>A thoughtful treatment page helps you understand the purpose of care, the assessment process, alternatives, possible risks and aftercare.</p><p>This is a design concept, not individual clinical advice. A qualified dentist would assess suitability and explain a personalised plan before treatment.</p><button class="button" data-book>Talk about your options ↗</button>`, button);
  if(button.dataset.case) {
    const bonding = button.dataset.case === 'bonding';
    openDialog(`<span class="eyebrow">ILLUSTRATIVE CASE STUDY</span><h2 id="modal-title">${bonding ? 'A small detail.<br>A considered decision.' : 'A journey,<br>one step at a time.'}</h2><p><strong>The question</strong><br>${bonding ? 'Could the shape of a smile feel more balanced?' : 'What would a clear aligner journey involve?'}</p><p><strong>The conversation</strong><br>A real case would document a dental assessment, the person’s goals, alternatives, limitations and informed consent.</p><p><strong>The plan</strong><br>${bonding ? 'This example explores how composite bonding could be presented, from discussion to follow-up.' : 'This example maps the assessment, proposed plan, check-ins and retention discussion.'}</p><p><strong>The review</strong><br>Real results would require verified clinical photographs and the patient’s permission. No treatment has taken place in this concept case.</p><button class="button" data-book>Ask about your options ↗</button>`, button);
  }
  if(button.hasAttribute('data-video')) openDialog(`<span class="eyebrow">VIDEO STORY / DESIGN DEMONSTRATION</span><h2 id="modal-title">A face behind<br>the story.</h2><video controls playsinline preload="metadata" src="./assets/story.mp4" aria-label="Silent stock portrait demonstration video"></video><p>Silent stock footage by Artem Podrez / Pexels. The person shown is not a patient and gives no testimonial.</p><details><summary>Example interview prompts</summary><p>What were you hoping to understand? How did the team explain your options? What would you tell someone considering a first visit?</p></details>`, button);
  if(button.hasAttribute('data-credits')) openDialog(`<span class="eyebrow">ABOUT THIS CONCEPT</span><h2 id="modal-title">Made to explore.</h2><p>Luma Dental Studio is a fictional brand created by SenninWeb. Prices, stories and quotations are illustrative. There are no practising clinicians, patient results or services behind this demo.</p><p><strong>Privacy</strong><br>The demo form does not send or store your entries. Closing the form clears them. Font requests are made to Google Fonts. Your browser also makes normal requests to the hosting provider for this page and its assets.</p><p><strong>Media</strong><br>Photography: <a href="https://unsplash.com/license" target="_blank" rel="noopener">Unsplash licence</a>. Video: <a href="https://www.pexels.com/video/a-woman-smiling-at-the-camera-7957709/" target="_blank" rel="noopener">Artem Podrez / Pexels</a>, under the <a href="https://www.pexels.com/license/" target="_blank" rel="noopener">Pexels licence</a>. Stock models are not endorsing a clinic. Smile comparison: original CSS illustration.</p>`, button);
});
document.addEventListener('submit', event => {
  if(event.target.id !== 'booking-form') return;
  event.preventDefault();
  content.innerHTML = `<span class="eyebrow">DEMO COMPLETE</span><h2 id="modal-title" tabindex="-1">That’s the<br>first step.</h2><p>You’ve reached the confirmation screen. No information was sent or saved, and no appointment was made.</p><p>For a real clinic, this is where the team would explain how and when they will respond.</p><a class="button" href="/en">Explore SenninWeb ↗</a>`;
  content.querySelector('h2').focus();
});
document.querySelector('.comparison input')?.addEventListener('input', event => event.target.closest('.comparison').style.setProperty('--split', event.target.value + '%'));
const horizontal = document.querySelector('.horizontal');
const track = document.querySelector('.track');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const small = matchMedia('(max-width: 600px)');
const clamp = value => Math.max(0, Math.min(1, value));
let scheduled = false;
function paintScroll() {
  scheduled = false;
  if(!horizontal) return;
  const disabled = reduce.matches || small.matches;
  const rect = horizontal.getBoundingClientRect();
  const distance = Math.max(0, track.scrollWidth - innerWidth);
  const progress = clamp(-rect.top / Math.max(1, horizontal.offsetHeight - innerHeight));
  track.style.transform = disabled ? '' : `translate3d(${-progress * distance}px,0,0)`;
  track.querySelectorAll('.treatment').forEach(card => {
    const center = card.offsetLeft + card.offsetWidth / 2 - progress * distance;
    const angle = Math.max(-7, Math.min(7, (center - innerWidth / 2) / innerWidth * 12));
    card.style.transform = disabled ? '' : `perspective(1200px) rotateY(${angle}deg)`;
  });
  const hero = document.querySelector('.hero-image');
  const heroProgress = clamp(scrollY / 650);
  hero.style.transform = disabled ? '' : `scale(${1 + heroProgress * .43}) rotateX(${(1-heroProgress) * 5}deg)`;
  const first = document.querySelector('.case-card');
  const second = document.querySelector('.case-card.second');
  const stack = clamp((innerHeight - second.getBoundingClientRect().top) / innerHeight);
  first.style.transform = disabled ? '' : `scale(${1-stack*.055}) rotateX(${stack*3}deg)`;
  const backgrounds = document.querySelectorAll('.story-background img');
  backgrounds[0].style.opacity = .18 * (1-stack);
  backgrounds[1].style.opacity = .24 * stack;
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(paintScroll);}}
addEventListener('scroll', schedule, {passive:true}); addEventListener('resize', schedule); reduce.addEventListener('change',schedule);small.addEventListener('change',schedule);paintScroll();
function moveGallery(direction) {
  if(reduce.matches || small.matches) track.scrollBy({left: direction * (track.firstElementChild.offsetWidth + 22), behavior: reduce.matches ? 'instant' : 'smooth'});
  else { const top = horizontal.getBoundingClientRect().top + scrollY; const amount = (horizontal.offsetHeight - innerHeight) / 3; scrollTo({top: Math.max(top, Math.min(top + horizontal.offsetHeight-innerHeight, scrollY + direction * amount)), behavior:'smooth'}); }
}
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => moveGallery(Number(button.dataset.gallery))));
track?.addEventListener('keydown', event => { if(event.target === track && ['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();moveGallery(event.key === 'ArrowRight' ? 1 : -1);} });
if (!reduce.matches) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate([{opacity:.35,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});
    reveal.unobserve(entry.target);
  }), {threshold:.12});
  document.querySelectorAll('.intro h2,.intro p,.section-top h2,.section-top p,.story-heading h2,.voice-grid>*,.steps article,.faq h2,.closing h2').forEach(el => reveal.observe(el));
}
