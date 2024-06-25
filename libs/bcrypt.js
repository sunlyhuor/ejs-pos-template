const bcrypt = require("bcrypt")

const salt = bcrypt.genSaltSync(saltRounds);

function Hash( password ){
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function Compare( myPlaintextPassword, hash ){
    return bcrypt.compareSync(myPlaintextPassword, hash); // true
}

module.exports = {
    Hash,
    Compare
}