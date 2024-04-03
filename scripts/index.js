

const proElements = document.querySelectorAll('.pro');

proElements.forEach((proElement) => {
    proElement.addEventListener('click', () => {
        const imgSrc = proElement.querySelector('img').src;
        const brand = proElement.querySelector('.des span').textContent;
        const productName = proElement.querySelector('.des h5').textContent;
        const priceString = proElement.querySelector('.des h4').textContent;

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
