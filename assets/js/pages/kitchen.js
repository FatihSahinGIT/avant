let products = null;
fetch("./assets/data/kitchen.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

let listProduct = document.querySelector(".listProduct");
function addDataToHTML() {
  products.forEach((product) => {
    let newProduct = document.createElement("a");
    newProduct.href = "/detail.html?id=" + product.id;
    newProduct.classList.add("item");

    newProduct.innerHTML = `
   <img src=${product.img}  />
   <h2>${product.name}</h2>
   
 `;

    listProduct.appendChild(newProduct);
  });
}
