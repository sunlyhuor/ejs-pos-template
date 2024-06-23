function parseCookieString(cookieString) {
    const cookieObj = {};
    
    if( !cookieString ) return false
    // Split the string by '; ' to get individual key=value pairs
    const pairs = cookieString.split(';');

    pairs.forEach(pair => {
        // Split each pair by '=' to get the key and value
        const [key, value] = pair.split('=');
        // Assign the key-value pair to the object
        cookieObj[key] = value;
    });

    return cookieObj;
}

module.exports = {
    parseCookieString
}