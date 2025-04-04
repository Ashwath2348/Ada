document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const dropdownLinks = document.querySelectorAll('.dropdown > a');

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const mode = body.classList.contains('dark-mode') ? 'Dark' : 'Light';
        themeToggle.textContent = `Switch to ${mode === 'Dark' ? 'Light' : 'Dark'} Mode`;
    });

    // Handle dropdown clicks on small screens
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.parentElement;
            if (window.innerWidth <= 768) {
                e.preventDefault();
                parent.classList.toggle('open');
            }
        });
    });

    // Compiler functionality
    const compileBtn = document.getElementById('compile-btn');
    const codeInput = document.getElementById('code');
    const outputBox = document.getElementById('output');

    if (compileBtn) {
        compileBtn.addEventListener('click', async () => {
            const code = codeInput.value.trim();
            outputBox.textContent = 'Compiling...';

            try {
                const response = await fetch('/compile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code })
                });

                const data = await response.json();

                if (response.ok) {
                    outputBox.textContent = data.result || 'Compilation succeeded, but no output.';
                } else {
                    outputBox.textContent = data.error || 'Compilation failed with unknown error.';
                }
            } catch (err) {
                outputBox.textContent = 'Error connecting to the compiler server.';
                console.error(err);
            }
        });
    }
});
