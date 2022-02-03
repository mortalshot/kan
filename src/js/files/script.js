// Подключение функционала
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import LocomotiveScroll from 'locomotive-scroll';
import "../../scss/libs/locomotive-scroll.scss";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.05,
});

gsap.timeline({
    scrollTrigger: {
        trigger: ".noise-image__img",
        markers: true,
        start: "top bottom",
        end: "bottom top",
    },
}).fromTo(".noise-image__img", {
    paddingBottom: "436px",
}, {
    paddingBottom: "646px",
})