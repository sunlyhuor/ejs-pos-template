const express = require("express");
const locale = require("../utils/locale");
const routers = express.Router()

// Define a route to render an EJS template
routers.get('/', (req, res) => {
    // Render views/index.ejs
    res.render('html/index', {  title: 'Express Render EJS Example', 
                                pathname: req.path, 
                                lang: req.cookies["LANG"],
                                locals: locale(req.cookies["LANG"])
                            });
});

routers.get('/about', (req, res) => {
    // Render views/index.ejs
    res.render('html/about', { 
                                title: 'Express Render About page',
                                pathname: req.path, 
                                lang: req.cookies["LANG"],
                                locals: locale(req.cookies["LANG"])
                            });
});

routers.get('/login', (req, res) => {
    // Render views/index.ejs
    res.render('html/login', { 
                                title: 'Express Render Login page',
                                pathname: req.path, 
                                lang: req.cookies["LANG"],
                                locals: locale(req.cookies["LANG"])
                            });
});

module.exports = routers