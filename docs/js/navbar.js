const accountSection = document.getElementById("account-section");
const accToken = localStorage.getItem("accToken");

let signInRedirect = "dashboard.html"; // default

if (accToken) {
    // Sets account.html relative path for files in pages/
    accountSection.innerHTML = `
        <a href="./account.html">Account</a>
    `;
} else {
    // Sign in button
    const signInButton = document.getElementById("sign-in-button");
    signInButton.addEventListener("click", () => {
        userSignIn(signInRedirect);
    });
}

// Provide path to root
function updateAccountRelativePath(realtivePathToRoot) {
    if (accToken) {
        accountSection.innerHTML = `
            <a href="${realtivePathToRoot}pages/account.html">Account</a>
        `;
    }
}

// Change sign in redirect
function changeSignInRedirect(newRedirect) {
    signInRedirect = newRedirect;
}