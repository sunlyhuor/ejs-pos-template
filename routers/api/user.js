const express = require("express")
const { Sign } = require("../../libs/jwt")
const routers = express.Router()


routers.post("/login", (req, res) => {
    res.cookie("accessToken", Sign( { name: req.body.name, role:"admin" }, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_DURATION ) )
    res.cookie("refreshToken",  Sign( { name: req.body.name, role: "admin" }, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_DURATION ) )
    res.cookie("isLogin", true)
    res.redirect("/")
})  

module.exports = routers