let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Initialize controller
  controller = new ScrollMagic.Controller();
  //selected
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //loop
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //gsap
    const slideT1 = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideT1.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideT1.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideT1.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideT1.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    //create scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideT1)
      .addIndicators()
      .addTo(controller);
    //new animation
    const pageTL = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTL.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    //   {}
    pageTL.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
    pageTL.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-= 0.5");
    //create new Scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTL)
      .addTo(controller);
  });
}

const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "0", y: -0, background: "black" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.add("remove");
  }
}

//eventlisteners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();
