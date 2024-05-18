gsap.registerPlugin(ScrollToPlugin);

function closeNavigation() {
  timeline.reverse();
  toggleButton.classList.remove("active");
  isOpen = false;
}

const toggleButton = document.querySelector(".burger");
let isOpen = false;

gsap.set(".menu-item p", { y: 225 });

const timeline = gsap.timeline({ paused: true });

const headerLink = document.getElementById("nav-header");

headerLink.addEventListener("click", function (event) {
  event.preventDefault();

  gsap.to(window, {
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: function () {
      window.scrollTo(0, 0);
    },
  });
});

headerLink.addEventListener("click", function (event) {
  event.preventDefault();

  closeNavigation();

  gsap.to(window, {
    duration: 1.5,
    scrollTo: 0,
    ease: "power4.inOut",
  });
});

timeline.to(".overlay", {
  duration: 1.5,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ease: "power4.inOut",
});

timeline.to(
  ".menu-item p",
  {
    duration: 1.5,
    y: 0,
    stagger: 0.2,
    ease: "power4.out",
  },
  "-=1"
);

toggleButton.addEventListener("click", function () {
  if (isOpen) {
    timeline.reverse();
  } else {
    timeline.play();
  }
  isOpen = !isOpen;
});

const nav = document.querySelector("nav");

const navLinks = document.querySelectorAll(".menu-item a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    closeNavigation();
  });
});

gsap.from(nav, {
  duration: 1.5,
  delay: 0.5,
  y: -20,
  opacity: 0,
  ease: "power4.out",
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

gsap.registerPlugin(ScrollTrigger);
