document.addEventListener('DOMContentLoaded', function() {
    const enterButton = document.getElementById('enter-button');
    const enterScreen = document.getElementById('enter-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const backgroundMusic = document.getElementById('background-music');
    const subtitleElement = document.getElementById('scramble-text');

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

    const musicPlaylist = [
        'https://cdn.pixabay.com/audio/2025/03/11/audio_23143e0155.mp3',
        'https://cdn.pixabay.com/download/audio/2025/05/29/audio_7292c86bf3.mp3',
        'https://cdn.pixabay.com/audio/2025/03/22/audio_4254d475f0.mp3',
        'https://cdn.pixabay.com/audio/2025/05/05/audio_e280f396cc.mp3',
        'https://cdn.pixabay.com/audio/2024/10/07/audio_5dbdeb2487.mp3'
    ];

    const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?abcdefghijklmnopqrstuvwxyz0123456789';
    let scrambleInterval;

    function scrambleText() {
        const originalText = 'welcome to my corner of the internet';
        let iterations = 0;
        const maxIterations = 20;
        
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
            
            subtitleElement.innerHTML = scrambled.split('').map(char => 
                char === ' ' ? ' ' : `<span class="scramble-char">${char}</span>`
            ).join('');
            
            if (iterations >= originalText.length) {
                clearInterval(scrambleInterval);
                subtitleElement.textContent = originalText;
            }
            
            iterations += 1/3;
        }, 50);
    }

    function createParticleTrail(x, y) {
        const trail = document.getElementById('particle-trail');
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        trail.appendChild(particle);
        
        setTimeout(() => {
            if (trail.contains(particle)) {
                trail.removeChild(particle);
            }
        }, 800);
    }

    function createButtonParticles() {
        const buttonParticles = document.querySelector('.button-particles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = primaryColor;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${2 + Math.random() * 3}s linear infinite`;
            particle.style.boxShadow = `0 0 6px ${primaryColor}`;
            buttonParticles.appendChild(particle);
        }
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

    enterButton.addEventListener('mouseenter', createButtonParticles);

    enterButton.addEventListener('click', () => {
        enterScreen.style.opacity = '0';
        enterScreen.addEventListener('transitionend', () => enterScreen.style.display = 'none');

        const randomSong = musicPlaylist[Math.floor(Math.random() * musicPlaylist.length)];
        backgroundMusic.src = randomSong;
        backgroundMusic.volume = 0.15;
        backgroundMusic.load();
        backgroundMusic.play();

        contentWrapper.style.visibility = 'visible';
        contentWrapper.style.opacity = '1';
        
        initTyped();
        startScrambleEffect();
    });

    function startScrambleEffect() {
        scrambleText();
        setInterval(scrambleText, 10000);
    }

    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const hoverables = document.querySelectorAll('a, button');
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorRing.style.left = mouseX + 'px';
        cursorRing.style.top = mouseY + 'px';

        if (Math.random() > 0.9) {
            createParticleTrail(mouseX, mouseY);
        }
    });

    hoverables.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.borderColor = secondaryColor;
            cursorDot.style.background = secondaryColor;
            cursorDot.style.boxShadow = `0 0 15px ${secondaryColor}`;
        });
        el.addEventListener('mouseout', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = primaryColor;
            cursorDot.style.background = primaryColor;
            cursorDot.style.boxShadow = `0 0 10px ${primaryColor}`;
        });
    });

    tsParticles.load("tsparticles", {
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true,
            },
            modes: {
                grab: { 
                    distance: 150, 
                    links: { opacity: 0.8 }
                },
                push: { quantity: 4 },
            },
        },
        particles: {
            color: { 
                value: [primaryColor, secondaryColor]
            },
            links: {
                color: primaryColor,
                distance: 120,
                enable: true,
                opacity: 0.15,
                width: 1,
            },
            collisions: { enable: false },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 0.8,
                straight: false,
            },
            number: {
                density: { enable: true, area: 800 },
                value: 180,
            },
            opacity: { 
                value: 0.4,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                }
            },
            shape: { type: "circle" },
            size: { 
                value: { min: 1, max: 3 },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                }
            },
        },
        detectRetina: true,
    });

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
                document.querySelector('#typed-text').parentElement.style.animation = 'none';
                setTimeout(() => {
                    document.querySelector('#typed-text').parentElement.style.animation = 'glitch 3s infinite alternate';
                }, 100);
            }
        };
        new Typed('#typed-text', options);
    }
});