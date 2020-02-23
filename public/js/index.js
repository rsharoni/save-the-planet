'use strict';

window.addEventListener('load', function () {
    const loaderEl = document.querySelector('.loader'),
        saveBtn = document.querySelector('#save-btn'),
        earthVideo = document.querySelector('.earth-video'),
        clockEl = document.querySelector('#clock'),
        mainTextEl = document.querySelector('.main-text'),
        saveMsgEl = document.querySelector('.save-msg'),
        saveContentEl = saveMsgEl.querySelector('.save-content'),
        saveMsgImgEl = saveMsgEl.querySelector('img'),
        doomMsgEl = document.querySelector('.doom-msg'),
        doomContentEl = doomMsgEl.querySelector('.doom-content'),
        doomMsgSmokeEl = doomMsgEl.querySelector('.doom-smoke'),
        doomMsgSpaceshipEl = doomMsgEl.querySelector('.doom-spaceship'),
        scoreEl = document.querySelector('.score');

    // disble stop animation on window blur
    // the animation will alywas run
    gsap.ticker.lagSmoothing(0);

    // hide loader element
    gsap.to(loaderEl, { autoAlpha: 0, duration: 0.5 });

    // show main text element
    gsap.to(mainTextEl, { autoAlpha: 1, duration: 1, delay: 1.6 });


    // gsap timeline animations
    const saveMsgTl = gsap.timeline({ paused: true, repeat: 1, repeatDelay: 2, yoyo: true });
    saveMsgTl.fromTo(saveMsgEl, { y: '100%' }, { y: '0%', duration: 1, autoAlpha: 1, ease: "elastic.out(1, 1)" })
        .set(saveMsgImgEl, { opacity: 1 })
        .fromTo(saveMsgImgEl, { y: '100%', rotation: 10, transformOrigin: '50% 100%', scale: 2 }, { y: 0, rotation: 0, scale: 1, duration: 1, ease: "power4.out" })
        .fromTo(saveContentEl.children, { y: -50, opacity: 0 }, { opacity: 1, y: 0, duration: 1, ease: "back.out(1)", stagger: 0.3 }, "-=0.5").reverse();

    const doomMsgTl = gsap.timeline({ paused: true, repeat: 1, repeatDelay: 2, yoyo: true });
    doomMsgTl.fromTo(doomMsgEl, { y: '100%' }, { y: '0%', duration: 1, autoAlpha: 1, ease: "elastic.out(1, 1)" })
        .fromTo(doomMsgSmokeEl, { y: '100%', scale: 2, opacity: 0 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }, "-=0.7")
        .fromTo(doomMsgSpaceshipEl, { y: '100%', scale: 2, opacity: 0 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }, "-=0.5")
        .fromTo(doomContentEl.children, { y: -50, opacity: 0 }, { opacity: 1, y: 0, duration: 1, ease: "back.out(1)", stagger: 0.3 }, "-=0.7").reverse();


    const addWarning = () => {
        clockEl.classList.add('warning');
    }
    const removeWarning = () => {
        clockEl.classList.remove('warning');
    }

    // socket io
    let socket = io();

    // event from the server
    socket.on('updateScore', function (score) {
        if (score < 10 && score > 0) {
            score = `0${score}`;
        }
        scoreEl.textContent = score;
    });
    socket.on('saveMsgShow', function () {
        saveMsgTl.restart();
    });
    socket.on('doomMsgShow', function () {
        doomMsgTl.restart();

    });
    socket.on('updateClock', function ({ minutes, seconds }) {
        if (minutes < 10) {
            minutes = `0${minutes}`;
            addWarning();
        } else {
            removeWarning();
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        clockEl.textContent = `${minutes}:${seconds}`
    });

    saveBtn.addEventListener('click', (e) => {
        // send emit to the server
        socket.emit('save');
    })

    earthVideo.addEventListener('ended', function () {
        console.log('video ended');
        this.currentTime = 4;
        this.play();
    }, false);
})