// product-item.js

class ProductItem extends HTMLElement {
  constructor()
  {
    let style = document.createElement('style')
    style.textContent =
    `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`

    super();
    let shadow = this.attachShadow({mode: 'open'});

    let li = document.createElement('li');
    li.setAttribute('class', 'product');

    let img = document.createElement('img');
    img.src = this.getAttribute('image');
    img.alt = this.getAttribute('title');
    img.width = 200;
    li.appendChild(img);

    let p1 = document.createElement('p');
    p1.class = 'title';
    p1.textContent = this.getAttribute('title');
    li.appendChild(p1);

    let p2 = document.createElement('p');
    p2.class = 'price';
    p2.textContent = this.getAttribute('price');
    li.appendChild(p2);

    let button = document.createElement('button');
    button.textContent = "Add to Cart";
    button.addEventListener("click", ()=>{
      let countElement = document.getElementById("cart-count");
      if(button.textContent == 'Add to Cart')
      {
        let numItem=parseInt(countElement.textContent) + 1;
        countElement.textContent = numItem;
        button.textContent = "Remove from Cart";
        localStorage.setItem(this.getAttribute('id'), '1');
        localStorage.setItem('numItem', numItem);
      }
      else
      {
        let numItem = parseInt(countElement.textContent) - 1;
        countElement.textContent = numItem;
        button.textContent = "Add to Cart";
        localStorage.removeItem(this.getAttribute('id'));
        localStorage.setItem('numItem', numItem);
      }
    })

    if(localStorage.getItem(this.getAttribute('id')) == '1')
    {
      button.textContent = 'Remove from Cart';
      let countElement = document.getElementById("cart-count");
      countElement.textContent = localStorage.getItem('numItem');
    }


    li.appendChild(button);
    shadow.append(style, li);
  }
}

customElements.define('product-item', ProductItem);