const getStartedButton = document.getElementById("get-started-button");
getStartedButton.addEventListener("click", () => {
    const accToken = localStorage.getItem("accToken");
    if (accToken) {
        window.location.href = "./pages/dashboard.html";
    } else {
        userSignIn();
    }
});

// set navbar.js root
changeAccountRelativePath("./");