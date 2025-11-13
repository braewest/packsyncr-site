async function userSignIn() {
    console.log("Starting Microsoft OAuth sign-in...");

    // Microsoft App Info
    const clientId = "4be7b50e-faa7-4a8f-bd49-70d886f5ea0e";
    const redirectUri = "https://braewest.github.io/packsyncr-site/pages/auth/callback.html";

    // Requested Info
    const scopes = [
        "XboxLive.signin",
        "offline_access"
    ];

    // Generate PKCE verifier/challenge
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await sha256base64url(codeVerifier);
    const state = crypto.randomUUID();

    sessionStorage.setItem("pkce_verifier", codeVerifier);
    sessionStorage.setItem("oauth_state", state);

    const authUrl =
        `https://login.live.com/oauth20_authorize.srf` +
        `?client_id=${encodeURIComponent(clientId)}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scopes.join(" "))}` +
        `&state=${encodeURIComponent(state)}`;

    window.location.href = authUrl;
}

function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) {
        result += charset[randomValues[i] % charset.length];
    }
    return result;
}

async function sha256base64url(str) {
    const data = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const bytes = new Uint8Array(hashBuffer);
    let base64 = btoa(String.fromCharCode(...bytes));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}