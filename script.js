const START_COUNT = 24;

const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const resetBtn = document.getElementById('resetBtn');
const darkToggle = document.getElementById('darkToggle');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

let count = START_COUNT;
let liked = false;

// like counter
function render() {
  likeCount.textContent = count;
  likeBtn.classList.toggle('liked', liked);
  likeBtn.setAttribute('aria-pressed', liked);
}

likeBtn.addEventListener('click', () => {
  liked = !liked;
  count += liked ? 1 : -1;
  render();
});

// Reset count
resetBtn.addEventListener('click', () => {
  count = START_COUNT;
  liked = false;
  render();
});

// Dark mode 
function setDark(on) {
  document.body.classList.toggle('dark', on);
  darkToggle.checked = on;
  try { localStorage.setItem('dark', on); } catch (e) {}
}
darkToggle.addEventListener('change', () => setDark(darkToggle.checked));
try { setDark(localStorage.getItem('dark') === 'true'); } catch (e) {}

// Nav
function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(link => {
    const active = link.dataset.target === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.target);
  });
});

render();
