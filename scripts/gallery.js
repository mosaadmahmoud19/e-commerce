


const productContainer = document.getElementById("product1");


  const productData = JSON.parse(localStorage.getItem("productData")) || [];

  productContainer.style.display = "flex";
  productContainer.style.flexWrap = "wrap"; 
  productContainer.style.justifyContent = "space-between"; 
  
  productData.forEach((productInfo, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("pro"); 
    productElement.setAttribute("onclick", `window.location.href='product-details.html'`);

    productElement.innerHTML = `
    <div>
      <img src="images/${productInfo.image.slice(12)}" alt="">
      <div class="des">
        <span>${productInfo.brand}</span>
        <h5>${productInfo.message}</h5>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h4>$${productInfo.price}</h4>
      </div>
      <a href="#"> <i class="fal fa-shopping-cart cart"></i></a>
    </div>`;

 



    productContainer.appendChild(productElement);

    productElement.addEventListener('click', () => {
      const imgSrc = productElement.querySelector('img').src;
      const brand = productElement.querySelector('.des span').textContent;
      const productName = productElement.querySelector('.des h5').textContent;
      const priceString = productElement.querySelector('.des h4').textContent;

      const price = parseFloat(priceString.replace('$', ''));

      const productInfo = {
        imgSrc,
        brand,
        productName,
        price,
      };

      localStorage.setItem(`product`, JSON.stringify(productInfo));
    });
  });


function addToCart(index) {
  const productData = JSON.parse(localStorage.getItem("productData")) || [];
  const selectedProduct = productData[index];

  localStorage.setItem("product", JSON.stringify(selectedProduct));


  console.log("Product added to cart:", selectedProduct);
}

