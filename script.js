CustomEase.create("cubic", "0.83, 0, 0.17, 1");
let isAnimating = false;

function splitTextIntoSpans(selector) {
  let elements = document.querySelectorAll(selector);

  console.log(elements);
  elements.forEach((element) => {
    let text = element.innerText;

    let splitText = text
      .split("")
      .map(function (char) {
        return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
      })
      .join("");
    element.innerHTML = splitText;
  });

  console.log(selector, elements);
}

function initializeCards() {
  let cards = Array.from(document.querySelectorAll(".service-card"));

  gsap.to(cards, {
    y: (i) => -15 + 15 * i + "%",
    z: (i) => 15 * i,
    opacity: 1,
    duration: 1,
    ease: "cubic",
    stagger: -0.1,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  splitTextIntoSpans(".service-header");
  initializeCards();
  gsap.set("h1 span", { y: -200 });
  gsap.set(".service-slider .service-card:last-child h1 span", { y: 0 });
});

document.addEventListener("click", function () {
  if (isAnimating) return;
  isAnimating = true;

  let slider = document.querySelector(".service-slider");
  let cards = Array.from(slider.querySelectorAll(".service-card"));

  let lastCard = cards.pop();
  let nextCard = cards[cards.length - 1];

  gsap.to(lastCard.querySelectorAll("h1 span"), {
    y: 200,
    duration: 0.75,
    ease: "cubic",
  });

  gsap.to(lastCard, {
    y: "+=150%",
    duration: 0.75,
    ease: "cubic",
    onComplete: () => {
      slider.prepend(lastCard);
      initializeCards();
      gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });

      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    },
  });

  gsap.to(nextCard.querySelectorAll("h1 span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05,
  });
});