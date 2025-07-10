document.addEventListener('DOMContentLoaded', () => {
    const dynamicTextElements = document.querySelectorAll('.dynamic-text-item');

    console.log('Script is running!'); // Check if the script is loaded
    console.log('Found dynamic text elements:', dynamicTextElements); // Check if elements are selected

    if (dynamicTextElements.length === 0) {
        console.warn('No elements with class "dynamic-text-item" found. Check your HTML class names.');
    }

    const options = {
        root: null,
        rootMargin: '-40% 0% -60% 0%', // Start with a simpler margin for debugging
        threshold: 0
    };

    dynamicTextElements.forEach(element => {
        const originalText = element.textContent;
        const linkTargetUrl = element.dataset.url;

        console.log(`Observing element: ${originalText}, URL: ${linkTargetUrl}`); // Verify each element is being observed

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                console.log(`Element: ${entry.target.textContent}, isIntersecting: ${entry.isIntersecting}, intersectionRatio: ${entry.intersectionRatio}`);

                if (entry.isIntersecting) {
                    if (!element.classList.contains('is-link')) {
                        element.classList.add('is-link');
                        element.innerHTML = `<a href="${linkTargetUrl}" target="_blank" rel="noopener noreferrer">${originalText}</a>`;
                        console.log(`${originalText} became a link.`);
                    }
                } else {
                    if (element.classList.contains('is-link')) {
                        element.classList.remove('is-link');
                        element.innerHTML = originalText;
                        console.log(`${originalText} stopped being a link.`);
                    }
                }
            });
        }, options);

        observer.observe(element);
    });
});