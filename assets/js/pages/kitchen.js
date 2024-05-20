// Daten laden und HTML-Elemente hinzufügen
let products = null;
fetch("./assets/data/kitchen.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
    animateKitchenItems();
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

let kitchenlist = document.querySelector(".kitchen-list");

function addDataToHTML() {
  products.forEach((product) => {
    let newProduct = document.createElement("a");
    newProduct.href = "/detail.html?id=" + product.id;
    newProduct.classList.add("item");

    // Nur das erste Bild aus dem img Array wird verwendet
    let firstImage = product.img[0];

    newProduct.innerHTML = `
      <img src="${firstImage}" />
      <h2 id="kitchen-name">${product.name}</h2>
    `;

    kitchenlist.appendChild(newProduct);
  });
}

// Animationen für den Titel und Text
const h1 = document.querySelector("#kitchen-title");
const p = document.querySelector("#kitchen-text");

gsap.from(h1, {
  duration: 0.85,
  delay: 0.75,
  y: -15,
  opacity: 0,
  ease: "power4.out",
});

gsap.from(p, {
  duration: 1,
  delay: 1,
  y: -20,
  opacity: 0,
  ease: "power4.out",
});

// Funktion, um die Küchen-Elemente mit GSAP zu animieren
function animateKitchenItems() {
  const kitchenItems = document.querySelectorAll(".kitchen-list .item");

  gsap.from(kitchenItems, {
    scrollTrigger: {
      trigger: ".kitchen",
      start: "top 80%",
      end: "bottom 50%",
    },
    y: -20,
    opacity: 0,
    stagger: 0.2,
    delay: 1,
    duration: 2,
    ease: "power2.out",
  });
}
