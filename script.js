document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enter-button');
    const enterScreen = document.getElementById('enter-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const backgroundMusic = document.getElementById('background-music');
    const subtitleElement = document.getElementById('scramble-text');
    const buttonParticles = document.querySelector('.button-particles');
    const particlesContainer = document.getElementById('tsparticles');

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    const mobileWidthQuery = window.matchMedia('(max-width: 768px)');

    const prefersReducedMotion = prefersReducedMotionQuery.matches;
    const isMobile = coarsePointerQuery.matches || mobileWidthQuery.matches;

    const musicPlaylist = [
        'https://cdn.pixabay.com/audio/2025/03/11/audio_23143e0155.mp3',
        'https://cdn.pixabay.com/download/audio/2025/05/29/audio_7292c86bf3.mp3',
        'https://cdn.pixabay.com/audio/2025/03/22/audio_4254d475f0.mp3',
        'https://cdn.pixabay.com/audio/2025/05/05/audio_e280f396cc.mp3',
        'https://cdn.pixabay.com/audio/2024/10/07/audio_5dbdeb2487.mp3'
    ];

    const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?abcdefghijklmnopqrstuvwxyz0123456789';
    let scrambleInterval;
    let hasEntered = false;

    function scrambleText() {
        if (prefersReducedMotion) return;
        const originalText = 'welcome to my corner of the internet';
        let iterations = 0;

        clearInterval(scrambleInterval);

        scrambleInterval = setInterval(() => {
            const scrambled = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return char;
                    if (index < iterations) return originalText[index];
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join('');

            subtitleElement.innerHTML = scrambled
                .split('')
                .map(char => (char === ' ' ? ' ' : `<span class="scramble-char">${char}</span>`))
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(scrambleInterval);
                subtitleElement.textContent = originalText;
            }

            iterations += 1 / 3;
        }, 50);
    }

    function startScrambleEffect() {
        if (prefersReducedMotion) {
            subtitleElement.textContent = 'welcome to my corner of the internet';
            return;
        }

        scrambleText();
        setInterval(scrambleText, 10000);
    }

    function createButtonParticles() {
        if (!buttonParticles || buttonParticles.childElementCount) return;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('span');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = primaryColor;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${2 + Math.random() * 3}s linear infinite`;
            particle.style.boxShadow = `0 0 6px ${primaryColor}`;
            fragment.appendChild(particle);
        }

        buttonParticles.appendChild(fragment);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    createButtonParticles();

    function handleEnter() {
        if (hasEntered) return;
        hasEntered = true;

        enterScreen.style.opacity = '0';
        enterScreen.addEventListener('transitionend', () => enterScreen.style.display = 'none', { once: true });

        const randomSong = musicPlaylist[Math.floor(Math.random() * musicPlaylist.length)];
        backgroundMusic.src = randomSong;
        backgroundMusic.volume = 0.15;
        backgroundMusic.load();
        const playPromise = backgroundMusic.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
        }

        contentWrapper.style.visibility = 'visible';
        contentWrapper.style.opacity = '1';

        initTyped();
        startScrambleEffect();
    }

    enterButton.addEventListener('click', handleEnter);
    enterButton.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar' || event.key === 'Space') {
            handleEnter();
        }
    });

    function initParticles() {
        if (!particlesContainer || typeof tsParticles === 'undefined') return;

        if (prefersReducedMotion) {
            particlesContainer.style.display = 'none';
            return;
        }

        const particleCount = isMobile ? 70 : 160;

        tsParticles.load('tsparticles', {
            fpsLimit: 90,
            interactivity: {
                events: {
                    onHover: { enable: !isMobile, mode: 'grab' },
                    onClick: { enable: !isMobile, mode: 'push' },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: { opacity: 0.7 }
                    },
                    push: { quantity: 3 },
                },
            },
            particles: {
                color: {
                    value: [primaryColor, secondaryColor]
                },
                links: {
                    color: primaryColor,
                    distance: 110,
                    enable: true,
                    opacity: 0.12,
                    width: 1,
                },
                collisions: { enable: false },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: { default: 'bounce' },
                    random: true,
                    speed: isMobile ? 0.4 : 0.8,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: particleCount,
                },
                opacity: {
                    value: 0.35,
                    animation: {
                        enable: true,
                        speed: 0.6,
                        minimumValue: 0.1,
                    }
                },
                shape: { type: 'circle' },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 1.5,
                        minimumValue: 0.5,
                    }
                },
            },
            detectRetina: true,
        });
    }

    initParticles();

    if (!isMobile && window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 6,
            speed: 400,
            glare: true,
            'max-glare': 0.15,
        });
    } else {
        const tiltTarget = document.querySelector('[data-tilt]');
        if (tiltTarget) {
            tiltTarget.removeAttribute('data-tilt');
        }
    }

    function initTyped() {
        const options = {
            strings: ['Omega', 'A Developer', 'Hacker', 'The Sigma', 'Omega', 'The Creator'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            cursorChar: '_',
            contentType: 'html',
            onStringTyped: () => {
                const title = document.querySelector('#typed-text').parentElement;
                if (!title) return;
                title.style.animation = 'none';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        title.style.animation = 'glitch 3s infinite alternate';
                    });
                });
            }
        };
        new Typed('#typed-text', options);
    }
});
