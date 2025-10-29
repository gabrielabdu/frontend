// Animate entries on scroll
const entries = document.querySelectorAll('.entry');

const observer = new IntersectionObserver((entriesObserved) => {
  entriesObserved.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

entries.forEach(entry => observer.observe(entry));

// Add "Read more / Read less" toggle
document.querySelectorAll('.entry-text').forEach(textEl => {
  if (textEl.scrollHeight > textEl.clientHeight) {
    textEl.classList.add('collapsed');

    const readMore = document.createElement('span');
    readMore.className = 'read-more';
    readMore.textContent = 'Read more';
    textEl.after(readMore);

    readMore.addEventListener('click', () => {
      textEl.classList.toggle('collapsed');
      readMore.textContent = textEl.classList.contains('collapsed') ? 'Read more' : 'Read less';
    });
  }
});
