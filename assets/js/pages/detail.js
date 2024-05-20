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
  let productId = new URLSearchParams(window.location.search).get("id");

  let thisProduct = products.find((product) => product.id == productId);

  if (!thisProduct) {
    window.location.href = "/";
    return;
  }

  let imageContainer = detail.querySelector(".image");

  // Leert das Container-Element für die Bilder
  imageContainer.innerHTML = "";

  // Fügt alle Bilder aus dem Array hinzu
  thisProduct.img.forEach((imgSrc) => {
    let imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imageContainer.appendChild(imgElement);
  });
}
