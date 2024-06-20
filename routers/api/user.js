const express = require("express")
const routers = express.Router()


routers.get("/login", (req, res) => {
    res.status(200).json({
        name: "askdjasjjd",
        age: 20
    })
})  

module.exports = routers