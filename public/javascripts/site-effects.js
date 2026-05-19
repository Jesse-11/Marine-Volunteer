document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.sticky-nav');
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    function updateScrollEffects() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progressValue = scrollable > 0 ? window.scrollY / scrollable : 0;
        progress.style.transform = `scaleX(${progressValue})`;
        nav?.classList.toggle('is-scrolled', window.scrollY > 12);
    }

    window.addEventListener('scroll', updateScrollEffects, { passive: true });
    updateScrollEffects();

    window.addEventListener('pointermove', event => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }, { passive: true });
});
