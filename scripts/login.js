



const login = document.getElementById("login");

login.onclick = (e) => {
    e.preventDefault();
    const emailAddress = document.getElementById("email").value;
    const passwordAddress = document.getElementById("password").value;

    if (emailAddress == "" || passwordAddress == "") {
        alert("Email and password are required");
    } else {

        if (emailAddress === "admin@gmail.com" && passwordAddress === "123") {
           
            alert("Admin login successful. Click OK to access dashboard.html");
            window.location.href = "dashboard.html";
            return;
        }
        const getUserRegisterJson = localStorage.getItem("userRegister");

        if (getUserRegisterJson) {
            const getUserRegisterJsonJS = JSON.parse(getUserRegisterJson);

            if (emailAddress == getUserRegisterJsonJS.email && passwordAddress == getUserRegisterJsonJS.password) {
                localStorage.setItem("userRegisterLoggedIn", true);
                alert(`Login successful, hi ${getUserRegisterJsonJS.username}. Click OK to access index.html`);
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password");
            }
        } else {
            alert("No registered user found. Please register first.");
        }
    }
};












