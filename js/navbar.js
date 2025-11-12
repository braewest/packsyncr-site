const accountSection = document.getElementById("account-section");
const accToken = localStorage.getItem("accToken");
if (accToken) {
    accountSection.innerHTML = `
        <a href="/pages/account.html">Account</a>
    `;
} else {
    // Sign in button
    const signInButton = document.getElementById("sign-in-button");
    signInButton.addEventListener("click", () => {
        accountSignIn();
    });
}

function accountSignIn() {
    alert("Sign in is not currently added");
}