

let selectedIndex = null;

function handleImageSelection(input) {
    const file = input.files[0]; 

    if (file) {
        const reader = new FileReader();

        // Define a function to handle the file reading
        reader.onload = function (e) {
          
            document.getElementById('image').value = e.target.result;
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    }
}

document.getElementById('Cread').addEventListener('click', function () {

    var imageValue = document.getElementById('image').value;
    var priceValue = document.getElementById('price').value;
    var brandValue = document.getElementById('brand').value;
    var messageValue = document.getElementById('message').value;

    var existingData = JSON.parse(localStorage.getItem('productData')) || [];

    if (selectedIndex !== null) {


        existingData[selectedIndex] = {
            image: imageValue,
            price: priceValue,
            brand: brandValue,
            message: messageValue
        };

        selectedIndex = null;
    } else {
        var dataObject = {
            image: imageValue,
            price: priceValue,
            brand: brandValue,
            message: messageValue
        };
        existingData.push(dataObject);
    }

    localStorage.setItem('productData', JSON.stringify(existingData));

    clearForm();

    populateTable();
});







const cartItems = JSON.parse(localStorage.getItem("productData")) || [];



const tableContainer = document.getElementById("cartTableContainer");
const table = document.createElement("table");
table.width = "100%";

const thead = table.createTHead();
const headerRow = thead.insertRow();
const headerColumns = ["Remove", "Update", "Image", "Brand", "Price", "Message"];

headerColumns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
});

const tbody = table.createTBody();

function populateTable() {

    tbody.innerHTML = "";

    const cartItems = JSON.parse(localStorage.getItem("productData")) || [];

    cartItems.forEach((item, index) => {
        const row = tbody.insertRow(index);

        const removeCell = row.insertCell(0);
        const updateCell = row.insertCell(1);
        const imageCell = row.insertCell(2);
        const brandCell = row.insertCell(3);
        const priceCell = row.insertCell(4);
        const messageCell = row.insertCell(5);

        removeCell.innerHTML = 
        `<button class="button-login" onclick="removeItem(${index})"  onmouseover="this.style.background='red'" onmouseout="this.style.background='#088178'">Delete</button>`;
        updateCell.innerHTML = 
         `<button class="button-login" onclick="updateItem(${index})"  onmouseover="this.style.background='green'" onmouseout="this.style.background='#088178'">Update</button>`;
        imageCell.innerHTML = `<img src="images/${item.image.slice(12)}" alt="">`;
     
        console.log(item.image.slice(12));

        brandCell.textContent = item.brand;
        priceCell.textContent = item.price;
        messageCell.textContent = item.message;
    });

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}





function updateItem(index) {
    selectedIndex = index;

    const cartItems = JSON.parse(localStorage.getItem("productData")) || [];
    const selectedItem = cartItems[index];

    document.getElementById("image").value = "";

    document.getElementById("price").value = selectedItem.price;
    document.getElementById("brand").value = selectedItem.brand;
    document.getElementById("message").value = selectedItem.message;
    console.log("Update item at index:", index);
}



function clearForm() {
    document.getElementById("image").value = "";
    document.getElementById("price").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("message").value = "";
}





function confirmOrder() {
    alert("Order confirmed!");
}

populateTable();

// update quantity and recalculate totals
window.updateQuantity = function (index, newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem("productData")) || [];
    cartItems[index].quantity = parseInt(newQuantity, 10) || 0;
    localStorage.setItem("productData", JSON.stringify(cartItems));
    populateTable();
};

//   remove item and recalculate totals
window.removeItem = function (index) {
    const cartItems = JSON.parse(localStorage.getItem("productData")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("productData", JSON.stringify(cartItems));
    populateTable();
};

