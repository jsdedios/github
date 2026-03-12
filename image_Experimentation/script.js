(function(){

'use strict';


/* ================================
   VARIABLES
================================ */

const sections = document.querySelectorAll(".device-section");

let sectionTops = [];

let counter = 1;

let prevCounter = 1;

let doneResizing;


/* ================================
   BUILD SECTION TOP POSITIONS
================================ */

function buildSectionTops(){

    sectionTops = [];

    sections.forEach(section => {

        sectionTops.push(
            Math.floor(section.getBoundingClientRect().top)
            + window.scrollY
        );

    });

}


/* ================================
   UPDATE BACKGROUND HUE
================================ */

function updateHue(){

    const scrollTop = window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const progress =
        maxScroll > 0
        ? scrollTop / maxScroll
        : 0;

    const hue =
        Math.round(progress * 300);

    document.documentElement.style
        .setProperty("--hue", hue + "deg");

}


/* ================================
   HANDLE SECTION CHANGE
================================ */

function onSectionChange(){

    sections.forEach(section => {

        section.className =
            "device-section offscreen";

    });

    const activeSection =
        document.querySelector(
            "#section0" + counter
        );

    if(activeSection){

        activeSection.className =
            "device-section onscreen";

    }

}


/* ================================
   SCROLL HANDLER
================================ */

function handleScroll(){

    let pagetop =
        window.scrollY + 200;

    if(pagetop > sectionTops[counter]){

        counter++;

    }
    else if(
        counter > 1
        &&
        pagetop < sectionTops[counter-1]
    ){

        counter--;

    }

    if(counter !== prevCounter){

        onSectionChange();

        prevCounter = counter;

    }

    updateHue();

}


/* ================================
   RESIZE HANDLER
================================ */

function handleResize(){

    clearTimeout(doneResizing);

    doneResizing = setTimeout(function(){

        buildSectionTops();

        handleScroll(); // re-evaluate section

    }, 500);

}


/* ================================
   IMAGE HOVER ANIMATION
================================ */

function initHoverAnimations(){

    const images =
        document.querySelectorAll(
            ".js-hover-anim"
        );

    images.forEach(img => {

        img.addEventListener(
            "mouseenter",
            function(){

                img.classList.remove(
                    "hover-anim"
                );

                void img.offsetWidth;

                img.classList.add(
                    "hover-anim"
                );

            }
        );

    });

}


/* ================================
   INITIALIZATION
================================ */

function init(){

    buildSectionTops();

    updateHue();

    initHoverAnimations();

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        handleResize
    );

}


/* ================================
   START
================================ */

window.addEventListener(
    "load",
    init
);


})();
