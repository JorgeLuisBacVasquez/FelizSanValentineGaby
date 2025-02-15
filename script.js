// Optimizado para Safari iOS
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const giftImage = document.getElementById('giftImage');
    const surpriseImage = document.getElementById('surpriseImage');
    const magicButton = document.getElementById('magic-button');

    // Inicialización iOS-safe
    giftImage.style.display = 'none';
    surpriseImage.style.display = 'none';

    // Generador de corazones
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        for(let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}vw;
                animation: falling-hearts ${Math.random() * 3 + 5}s linear infinite;
                font-size: ${Math.random() * 20 + 15}px;
            `;
            heartsContainer.appendChild(heart);
        }
    }

    // Control de apertura universal
    function handleOpen() {
        if(!card.classList.contains('open')) {
            card.classList.add('open');
            giftImage.style.display = 'block';
        }
    }

    // Eventos táctiles para iOS
    card.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleOpen();
    }, { passive: false });

    // Eventos click para desktop
    card.addEventListener('click', handleOpen);

    // Revelación optimizada para Safari
    function revealSurprise() {
        const elementsToHide = [giftImage, document.querySelector('.poem'), magicButton];
        
        // Fade-out con WebKit
        elementsToHide.forEach(el => {
            el.style.transition = 'opacity 0.8s';
            el.style.opacity = '0';
        });

        // Forzar repintado para Safari
        requestAnimationFrame(() => {
            surpriseImage.style.display = 'block';
            surpriseImage.style.opacity = '0';
            void surpriseImage.offsetWidth; // Trigger reflow
            
            surpriseImage.style.opacity = '1';
            surpriseImage.classList.add('reveal');
            
            elementsToHide.forEach(el => el.remove());
            card.style.background = 'transparent';
            createHearts();
        });
    }

    // script.js optimizado para GitHub Pages
document.addEventListener('DOMContentLoaded', () => {
    // Añade esto para GitHub Pages
    if(window.location.href.includes('github.io')) {
        document.querySelectorAll('img').forEach(img => {
            img.src = '.' + img.src.split(window.location.hostname)[1];
        });
    }
});

    // Controladores duales para botón
    magicButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        revealSurprise();
    });

    magicButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        revealSurprise();
    });

    createHearts();
});