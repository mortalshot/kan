// Подключение функционала
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);


import LocomotiveScroll from 'locomotive-scroll';
import "../../scss/libs/locomotive-scroll.scss";

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".page"),
    smooth: true,
    lerp: 0.02,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".page" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".page", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".page").style.transform ? "transform" : "fixed"
});

if (document.querySelector('.preview')) {
    let previewTrigger = {
        trigger: ".preview",
        scroller: ".page",
        scrub: true,
        start: "top top",
        end: "60% top",
    };

    gsap.to(".preview .noise-image__background", {
        scrollTrigger: previewTrigger,
        scale: 5.2,
        x: "-95%",
    })

    gsap.to(".preview .noise-image__noise img", {
        scrollTrigger: previewTrigger,
        scale: 5.2,
        x: "-95%",
    })

    gsap.to(".preview .noise-image__img img", {
        scrollTrigger: previewTrigger,
        height: 650,
    })

    let previewTrigger2 = {
        trigger: ".preview",
        scroller: ".page",
        scrub: true,
        start: "60% top",
        end: "80% top",
    };

    gsap.to(".preview .noise-image__background", {
        scrollTrigger: previewTrigger2,
        opacity: 0,
    })

    gsap.to(".preview .noise-image__noise img", {
        scrollTrigger: previewTrigger2,
        opacity: 0,
    })
}

if (document.querySelector('.team')) {
    let teamTrigger = {
        trigger: ".team",
        scroller: ".page",
        scrub: true,
        start: "10% top",
        end: "70% top",
    };

    gsap.to(".team .noise-image__background", {
        scrollTrigger: teamTrigger,
        scale: 7,
        x: "50%",
        borderRadius: 0
    })

    gsap.to(".team .noise-image__noise img", {
        scrollTrigger: teamTrigger,
        scale: 7,
        x: "50%",
        borderRadius: 0
    })

    gsap.to(".team .noise-image__img img", {
        scrollTrigger: teamTrigger,
        height: 560,
    })
}

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();