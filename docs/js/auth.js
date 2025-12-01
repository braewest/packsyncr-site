async function userSignIn(callbackRedirect = "dashboard.html") {
    console.log("Starting Microsoft OAuth sign-in...");

    // Microsoft App Info
    const CLIENT_ID = "4be7b50e-faa7-4a8f-bd49-70d886f5ea0e";
    const REDIRECT_URI = "https://www.packsyncr.com/pages/auth/callback.html";

    // Requested Info
    const scopes = [
        "XboxLive.signin",
        "User.Read",
        "offline_access"
    ];

    // Generate state for CSRF protection
    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);
    sessionStorage.setItem("callback_redirect", callbackRedirect);

    const authUrl =
        `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize` +
        `?client_id=${encodeURIComponent(CLIENT_ID)}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(scopes.join(" "))}` +
        `&state=${encodeURIComponent(state)}` +
        `&prompt=consent`;

    window.location.href = authUrl; // Microsoft authoization redirect
}

// Return the current access token or a new one if the old one is expired
async function getAccessToken() {
    // TODO: Check if current access token is valid before generating a new one
    return await generateAccessToken();
}

// Generate a new access token
async function generateAccessToken() {
    try {
        const response = await fetch("https://auth.packsyncr.com/access-token", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Failed to get access token:", data);
            return null;
        }

        const token = data.access_token || null;

        if (token) {
            // Save access token to local storage
            localStorage.setItem("access_token", token);
        }
        return token;
    } catch (err) {
        console.error("Failed to get access token:", err);
        return null;
    }
}