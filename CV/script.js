// script.js
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const dots = document.querySelectorAll('.dot');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + window.innerHeight / 2;

  dots.forEach(dot => {
    const section = document.getElementById(dot.dataset.target);
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
});