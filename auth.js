// function validateEmail(email) {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailPattern.test(email);
// }

function signIn() {
    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    // if (!validateEmail(username)) {
    //     alert("Please enter a valid email address.");
    //     return;
    // }
    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Your account was successfully created");
        document.getElementById("signin").style.display = "none";
        document.getElementById("login").style.display = "block";
    } else {
        alert("Please enter a valid username and password to sign up.");
    }
}

function logIn() {
    let currentusername = document.getElementById("logInUserName").value;
    let currentpassword = document.getElementById("logInPassword").value;

    let storedusername = localStorage.getItem("username");
    let storedpassword = localStorage.getItem("password");

    if (currentusername === storedusername && currentpassword === storedpassword) {
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("currentUser", currentusername);
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        console.log("User logged in");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

function logOut() {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("currentUser");
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    window.location.href = "profile.html";
    console.log("User logged out");
}

document.addEventListener("DOMContentLoaded", () => {
    let IsLoggedIn = localStorage.getItem("IsLoggedIn");
    let currentUser = localStorage.getItem("currentUser");

    if (IsLoggedIn === "true" && currentUser) {
        document.getElementById("signin").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("displayUserName").innerText = currentUser;
    } else {
        document.getElementById("signin").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "none";
    }
});
