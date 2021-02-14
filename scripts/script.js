// Script.js

window.addEventListener('DOMContentLoaded', () => {
  let prodList = document.getElementById('product-list');
  fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));
        data.forEach(prod => {
          prodList.innerHTML += `<product-item image ='${prod.image}' title='${prod.title}' price='${prod.price}' id='${prod.id}'/>`
        });
      });
});