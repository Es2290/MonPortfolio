/* CURSOR */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .project-card, .skill-cat').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

/* SCROLL ANIMATIONS */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* SKILL BARS */
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-cat').forEach(el => barObserver.observe(el));

/* PROJECT FILTER */
function filterProjects(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
        const cats = card.dataset.cat || '';
        const show = cat === 'all' || cats.includes(cat);
        card.style.opacity = show ? '1' : '0.2';
        card.style.transition = 'opacity 0.3s';
    });
}

/* CONTACT FORM */
function handleContactForm(e) {
    e.preventDefault();
    const btn = document.getElementById('formSubmit');
    const success = document.getElementById('formSuccess');
    const submitText = btn.querySelector('.form-submit-text');

    // Validate required fields
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !email || !message) return;

    // Loading state
    btn.disabled = true;
    submitText.textContent = 'Envoi en cours…';

    // Simulate send delay then show success
    setTimeout(() => {
        btn.style.display = 'none';
        success.classList.add('show');
        document.getElementById('contactForm').reset();
    }, 1200);
}