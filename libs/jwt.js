const jwt = require("jsonwebtoken")

function Sign( payload, secret, expiresIn ){
    return jwt.sign( payload , secret, {
        expiresIn: expiresIn * 60   
    });
}

function Verify( token, secret ){
    return jwt.verify( token , secret)
}

module.exports = {
    Sign,
    Verify
}