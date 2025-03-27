document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                section.classList.add("show");
            }
        });
    }

    revealSections();
    window.addEventListener("scroll", revealSections);
});
