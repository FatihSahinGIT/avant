let products = null;
fetch("./assets/data/kitchen.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

function showDetail() {
  let detail = document.querySelector(".detail");
  let desc = document.querySelector(".desc");
  let header = document.querySelector(".title");
  let productId = new URLSearchParams(window.location.search).get("id");

  let thisProduct = products.find((product) => product.id == productId);

  if (!thisProduct) {
    window.location.href = "/";
    return;
  }

  let imageContainer = detail.querySelector(".image");

  // Leert das Container-Element für die Bilder
  imageContainer.innerHTML = "";

  thisProduct.img.forEach((imgSrc) => {
    let imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imageContainer.appendChild(imgElement);
  });

  let textElement = document.createElement("p");
  textElement.innerText = thisProduct.description;
  desc.appendChild(textElement);

  let headerElement = document.createElement("h1");
  headerElement.innerText = thisProduct.name;
  header.appendChild(headerElement);

  // Modal Elemente
  var modal = document.getElementById("image-modal");
  var modalImg = document.getElementById("modal-image");
  var span = document.getElementsByClassName("close")[0];

  // Fügt einen Klick-Listener zu jedem Bild hinzu
  imageContainer.querySelectorAll("img").forEach((img) => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    };
  });

  // Schließt das Modal, wenn der Benutzer auf das "x" klickt
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Schließt das Modal, wenn der Benutzer irgendwo außerhalb des Bildes klickt
  modal.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Similar Products
  let listProduct = document.querySelector(".kitchen-list-similar");
  products
    .filter((value) => value.id !== productId)
    .forEach((product) => {
      let newProduct = document.createElement("a");
      newProduct.href = "/detail.html?id=" + product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `
      <img src=${product.img[0]} />
      <h2>${product.name}</h2>
      `;
      listProduct.appendChild(newProduct);
    });
}
