const AUTH_PROXY_URL = "https://www.proxy.packsyncr.com/api/auth-proxy";

document.addEventListener("DOMContentLoaded", async () => {
    // Get auth code and state from url
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    if (!code) {
        handleError("Missing authorization code in URL");
        return;
    }
    if (!state) {
        handleError("Missing state in URL");
        return;
    }

    // Get oauth_state
    const oauthState = sessionStorage.getItem("oauth_state");
    if (state !== oauthState) {
        handleError("Authorization state does not match");
        return;
    }
    sessionStorage.removeItem("oauth_state");

    // Call Azure function
    let response;
    try {
        response = await fetch(AUTH_PROXY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: code
            }),
            credentials: "include"
        });

        if (!response.ok) {
            const errText = await response.text();
            handleError(errText);
            return;
        }
    } catch (err) {
        handleError(err);
    }

    // Get a new access token if the current one is expired (from auth.js)
    await getAccessToken();

    // Redirect new users
    const data = await response.json();
    if (data.newUser === true) {
        window.location.replace("../new-user.html");
    }

    // Redirect user
    const callbackRedirect = sessionStorage.getItem("callback_redirect"); // from pages directory
    if (!callbackRedirect) {
        window.location.replace("../dashboard.html");
    } else {
        window.location.replace(`../${callbackRedirect}`);
    }
});

async function handleResponse(response) {
    const data = await response.json();
    console.log("Token endpoint status:", response.status, response.statusText);
    console.log("Token response:", data);
}

function handleError(err) {
    console.error(`Sign in failed. ${err}`);
    alert(`Sign in failed. ${err}`);
    window.location.replace("../../index.html");
}