document.addEventListener('DOMContentLoaded', function() {

    const enterButton = document.getElementById('enter-button');
    const enterScreen = document.getElementById('enter-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const backgroundMusic = document.getElementById('background-music');
    const visualizerCanvas = document.getElementById('audio-visualizer');
    
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();
    
    let audioContext, cavalier;

    const musicPlaylist = [
        'https://pixabay.com/music/download/dark-ambient-music-312290.mp3',
        'https://cdn.pixabay.com/download/audio/2025/05/29/audio_7292c86bf3.mp3',
        'https://cdn.pixabay.com/audio/2025/03/22/audio_4254d475f0.mp3',
        'https://cdn.pixabay.com/audio/2025/05/05/audio_e280f396cc.mp3',
        'https://cdn.pixabay.com/audio/2024/10/07/audio_5dbdeb2487.mp3'
    ];

    enterButton.addEventListener('click', () => {
        enterScreen.style.opacity = '0';
        enterScreen.addEventListener('transitionend', () => enterScreen.style.display = 'none');

        if (!audioContext) {
            audioContext = new AudioContext();
            const source = audioContext.createMediaElementSource(backgroundMusic);
            source.connect(audioContext.destination);
            cavalier = new Cavalier(visualizerCanvas, source);
            cavalier.options = {
                color: [primaryColor, secondaryColor],
                stroke: 2,
                mode: 'wave',
                shadowBlur: 5,
                shadowColor: secondaryColor,
            };
        }

        const randomSong = musicPlaylist[Math.floor(Math.random() * musicPlaylist.length)];
        backgroundMusic.src = randomSong;
        backgroundMusic.volume = 0.15;
        backgroundMusic.load();
        
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                cavalier.start();
            }).catch(error => {
                console.error("Audio playback failed:", error);
            });
        }

        contentWrapper.style.visibility = 'visible';
        contentWrapper.style.opacity = '1';
        
        initAnimations();
    });

    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const hoverables = document.querySelectorAll('a, button');

    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    });

    hoverables.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.borderColor = secondaryColor;
        });
        el.addEventListener('mouseout', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = primaryColor;
        });
    });

    tsParticles.load("tsparticles", {
        fpsLimit: 120,
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 60, duration: 0.4 } },
        },
        particles: {
            color: { value: [primaryColor, secondaryColor] },
            links: { color: primaryColor, distance: 120, enable: true, opacity: 0.1, width: 1 },
            collisions: { enable: false },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.5, straight: false },
            number: { density: { enable: true, area: 800 }, value: 150 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
    });
    
    var rellax = new Rellax('.rellax');

    function initAnimations() {
        new Typed('#typed-text', {
            strings: ['omega', 'a developer', 'a creator', 'omega'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            cursorChar: '_',
            contentType: 'html'
        });

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '.subtitle',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: 700,
            })
            .add({
                targets: '.links a',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(150, { start: 200 }),
            }, '-=400');
    }
});