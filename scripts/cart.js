
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];


const tableContainer = document.getElementById("cartTableContainer");


const table = document.createElement("table");
table.width = "100%";

const thead = table.createTHead();
const headerRow = thead.insertRow();
const headerColumns = ["Remove", "Image", "Product", "Price", "Quantity", "Subtotal"];

headerColumns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
});


const tbody = table.createTBody();


cartItems.forEach((item, index) => {
    const row = tbody.insertRow(index);


    const removeCell = row.insertCell(0);
    const imageCell = row.insertCell(1);
    const productCell = row.insertCell(2);
    const priceCell = row.insertCell(3);
    const quantityCell = row.insertCell(4);
    const subtotalCell = row.insertCell(5);

    
    removeCell.innerHTML = `<a href="#" onclick="removeItem(${index})"><i class="far fa-times-circle"></i></a>`;
    imageCell.innerHTML = `<img src="${item.imgSrc}" alt="">`;
    productCell.textContent = item.productName;

    
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = parseInt(item.quantity, 10) || 0;

    priceCell.textContent = `$${itemPrice.toFixed(2)}`;
    quantityCell.innerHTML = `<input type="number" value="${itemQuantity}" onchange="updateQuantity(${index}, this.value)">`;

 
    const subtotal = itemPrice * itemQuantity;
    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
});

tableContainer.appendChild(table);

displayTotals();

window.updateQuantity = function (index, newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems[index].quantity = parseInt(newQuantity, 10) || 0;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayTotals();
};

window.removeItem = function (index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    location.reload();
};

function displayTotals() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const subtotalElement = document.getElementById("cartSubtotal");
    const totalElement = document.getElementById("cartTotal");

    const subtotal = cartItems.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity, 10) || 0;
        return sum + itemPrice * itemQuantity;
    }, 0);

    const total = subtotal;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}






emailjs.init("abVKoi0bEuczVq0rT");

function sendEmail(totalAmount) {

    const userRegisterString = localStorage.getItem("userRegister");
    const userRegister = JSON.parse(userRegisterString);

    if (userRegister && userRegister.email) {
        var parms = {
            sendername: "Mosaad",
            to: userRegister.email, 
            replyto: "mosaadmahmoud584@gmail.com",
            message: totalAmount,
            subject:"Total Price",
        };

        var serviceID = "service_qwjy3wv";
        var templeteId = "template_8tl0jw9";

        emailjs.send(serviceID, templeteId, parms)
            .then(res => {
                alert("Your cart has been successfully submitted. Check your email for the total.");
            })
            .catch(error => {
                console.error('EmailJS Error:', error);
            });
    } else {
        console.error('User email not found in localStorage.');
    }
}


function confirmOrder() {
    const totalAmount = document.getElementById("cartTotal").textContent;
    sendEmail(totalAmount);
   
}

var sendButton = document.getElementById('sendButtoncart');
sendButton.addEventListener('click', function (event) {
    event.preventDefault(); 
    confirmOrder(); 
});

