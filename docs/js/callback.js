const AUTH_PROXY_URL = "https://packsyncr-auth-bteqekhzbkfaegd6.canadacentral-01.azurewebsites.net/api/auth-proxy";

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

    // Call Azure function
    try {
        const response = await fetch(AUTH_PROXY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: code
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            handleError(errText);
            return;
        }

        // Handle the response
        const data = await response.json();
        console.log("Token endpoint status:", response.status, response.statusText);
        console.log("Token response:", data);
    } catch (err) {
        handleError(err);
    }
});

function handleError(err) {
    console.error(`Sign in failed. ${err}`);
    alert(`Sign in failed. ${err}`);
}