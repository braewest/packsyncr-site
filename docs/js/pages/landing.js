const getStartedButton = document.getElementById("get-started-button");
getStartedButton.addEventListener("click", () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        window.location.href = "./pages/dashboard.html";
    } else {
        userSignIn();
    }
});

// Set navbar.js root
updateAccountRelativePath("./");