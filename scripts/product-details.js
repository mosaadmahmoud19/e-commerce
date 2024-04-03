

    const productInfo = JSON.parse(localStorage.getItem("product"));

    if (productInfo) {
        const mainImg = document.getElementById("MainImg");
        mainImg.src = productInfo.imgSrc;

        const productNameElement = document.querySelector(".single-pro-details h4");
        const productPriceElement = document.querySelector(".single-pro-details h2");
        const productDetailsElement = document.querySelector(".single-pro-details span");

        
        productNameElement.innerHTML = productInfo.brand;
        productDetailsElement.innerHTML = productInfo.productName;
        productPriceElement.innerHTML = `$${productInfo.price}`;

        const addToCartBtn = document.querySelector(".single-pro-details button");
        addToCartBtn.addEventListener("click", function () {
            const isLoggedIn = localStorage.getItem("userRegister");

            if (!isLoggedIn) {
                window.location.href = "register.html";
            } else {
                const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
                const quantity = parseInt(document.querySelector(".single-pro-details input").value, 10);
                const cartItem = {
                    productName: productInfo.brand,
                    price: productInfo.price,
                    quantity: quantity,
                    imgSrc: productInfo.imgSrc,
                };

                existingCart.push(cartItem);
                localStorage.setItem("cart", JSON.stringify(existingCart));

                window.location.href = "cart.html";
            }
        });
    };
