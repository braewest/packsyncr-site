const accountSection = document.getElementById("account-section");
const accToken = localStorage.getItem("accToken");

let signInScript;

if (accToken) {
    // Sets account.html relative path for files in pages/
    accountSection.innerHTML = `
        <a href="./account.html">Account</a>
    `;
} else {
    // Sign in button
    const signInButton = document.getElementById("sign-in-button");
    signInButton.addEventListener("click", () => {
        userSignIn();
    });
}

// Provide path to root
function changeAccountRelativePath(realtivePathToRoot) {
    if (accToken) {
        accountSection.innerHTML = `
            <a href="${realtivePathToRoot}pages/account.html">Account</a>
        `;
    }
}