const express = require("express")
const routers = express.Router()


routers.post("/login", (req, res) => {
    res.cookie("accessToken", "sdhasjdhj")
    res.cookie("refreshToken", "sdhasjdhj")
    res.cookie("isLogin", true)
    res.redirect("/")
})  

module.exports = routers