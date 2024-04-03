let form = document.getElementById("Form-register");
let username = document.getElementById("username");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");

let buttonregister = document.querySelector(".button-login");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission for testing purposes
    validation();
});

const setError = (ele, msg) => {
    let box = ele.parentElement;
    let error = box.querySelector(".error");

    error.innerText = msg;
    box.classList.add("error");
    box.classList.remove("success");
}

const setSuccess = (ele) => {
    let box = ele.parentElement;
    let error = box.querySelector(".error");

    error.innerText = "";
    box.classList.add("success");
    box.classList.remove("error");
}

const mailformat = (e) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(e).toLowerCase());
}

const passFormat = (p) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return re.test(p);
}

const userFormat = (u) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(u);
}

const phoneFormat = (phoneNumber) => {
    const re = /^(010|011|015)\d{8}$/;
    return re.test(phoneNumber);
}

function validation() {
    let user = username.value.trim();
    let mail = email.value.trim();
    let phonenumber = phone.value.trim();
    let pass1 = password.value.trim();

    let isUsernameValid = false;
    let isEmailValid = false;
    let isPhoneValid = false;
    let isPasswordValid = false;

    // user name
    if (user === "") {
        setError(username, "Username is required");
    } else if (!userFormat(user)) {
        setError(username, "Only alphabets are allowed");
    } else {
        setSuccess(username);
        isUsernameValid = true;
    }

    // Email
    if (mail === "") {
        setError(email, "Email is required");
    } else if (!mailformat(mail)) {
        setError(email, "Please enter a valid email");
    } else {
        setSuccess(email);
        isEmailValid = true;
    }

    // phone number
    if (phonenumber === "") {
        setError(phone, "Phone is required");
    } else if (!phoneFormat(phonenumber)) {
        setError(phone, "Please enter a valid phone number");
    } else {
        setSuccess(phone);
        isPhoneValid = true;
    }

    // password
    if (pass1 === "") {
        setError(password, "Password is required");
    } else if (!passFormat(pass1)) {
        setError(password, "Password must be at least 8 characters, including uppercase, lowercase, numbers, and special characters");
    } else {
        setSuccess(password);
        isPasswordValid = true;
    }

    if (isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid) {
        let userDetails = {
            username: user,
            email: mail,
            phone: phonenumber,
            password: pass1
        };

        let userDetailsString = JSON.stringify(userDetails);

        localStorage.setItem("userRegister", userDetailsString);

        window.location.href = "login.html";
    }
}




































