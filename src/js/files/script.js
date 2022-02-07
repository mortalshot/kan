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
    lerp: 0.01,
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
    // Закрепляем Скролл секции, чтобы был виден текст и анимацию картинки
    ScrollTrigger.create({
        trigger: ".preview",
        scroller: ".page",
        start: "top top",
        end: "bottom top",
        pin: true,
        // markers: true,
    })


    const previewSvg = document.querySelector('.preview .noise-image__img svg');
    let previewDistance = previewSvg.getBoundingClientRect();
    const header = document.querySelector('.header');

    // Устанавливаем ширину, высоту и viewBox для svg картинки
    previewSvg.setAttribute("width", window.innerWidth);
    previewSvg.setAttribute("height", window.innerHeight);
    previewSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    // Устанавливаем ширину, высоту для фона у svg
    let previewSvgBg = document.querySelectorAll('.image1-background');
    previewSvgBg.forEach(element => {
        element.setAttribute("width", window.innerWidth);
        element.setAttribute("height", window.innerHeight);
    });

    const previewImageBgTr = {
        trigger: ".preview",
        scroller: ".page",
        scrub: true,
        start: "top top",
        end: "25% top",
    };

    // Растягиваем картинку на весь экран
    gsap.to(".preview .noise-image__img", {
        scrollTrigger: previewImageBgTr,
        width: window.innerWidth,
        height: window.innerHeight,
        x: -previewDistance.left,
        y: -(previewDistance.top - header.offsetHeight),
    });

    // На сколько процентов нужно увеличить фрейм с мужиком, чтобы не было полос у фона
    const previewScale = (window.innerHeight + header.offsetHeight) / previewDistance.height;

    gsap.to("#image1-body", {
        scrollTrigger: previewImageBgTr,
        x: window.innerWidth - previewDistance.width,
        scale: previewScale,
    })

    const previewImageItemsTr = {
        trigger: ".preview",
        scroller: ".page",
        scrub: true,
        start: "top top",
        end: "bottom top",
        // markers: true,
    };

    // Движение звёзд
    gsap.to("#image1-star1, #image1-star2", {
        scrollTrigger: previewImageItemsTr,
        y: "-50px",
    })

    // Движение планеты
    gsap.to("#image1-planet", {
        scrollTrigger: previewImageItemsTr,
        x: "-10px",
        y: "30px",
    })

    // Движение луны
    gsap.to("#image1-moon", {
        scrollTrigger: previewImageItemsTr,
        x: "10px",
        y: "20px",
    })

    // Движение облаков
    gsap.to("#image1-cloud1", {
        scrollTrigger: previewImageItemsTr,
        x: "200%",
        y: "10px",
    })

    gsap.to("#image1-cloud2", {
        scrollTrigger: previewImageItemsTr,
        x: "-200%",
        y: "10px",
    })

    // Движение головы
    gsap.to("#image1-hair, #image1-face", {
        scrollTrigger: previewImageItemsTr,
        rotate: "-5deg",
        y: "3px",
        x: "-7px"
    })

};

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();