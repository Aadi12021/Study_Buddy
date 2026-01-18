export async function verifyCredentials(username, password) {
    if (username !== "Aditi") return false;

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-256 hash for "Snowy"
    const correctHash = "2a3fb91a00d659d55c073d30d02fb61f2a52c4a3414f994f27901a28fb15caa2";

    return hashHex === correctHash;
}
