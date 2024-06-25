const express = require("express");
const locale = require("../utils/locale");
const { AuthenticateMiddleware, IsLoginMiddlware } = require("../middlewares/middleware");
const routers = express.Router()

// Define a route to render an EJS template
routers.get('/', AuthenticateMiddleware, (req, res) => {
    // Render views/index.ejs
    res.render('html/index', {  title: 'Express Render EJS Example', 
                                pathname: req.path, 
                                lang: req.cookies["LANG"] || process.env.DEFAULT_LANG,
                                locals: locale(req.cookies["LANG"])
                            });
});

routers.get('/about', AuthenticateMiddleware, (req, res) => {
    // Render views/index.ejs
    res.render('html/about', { 
                                title: 'Express Render About page',
                                pathname: req.path, 
                                lang: req.cookies["LANG"] || process.env.DEFAULT_LANG,
                                locals: locale(req.cookies["LANG"])
                            });
});

routers.get('/login',IsLoginMiddlware, (req, res) => {
    // Render views/index.ejs
    res.render('html/login', { 
                                title: 'Express Render Login page',
                                pathname: req.path, 
                                lang: req.cookies["LANG"] || process.env.DEFAULT_LANG,
                                locals: locale(req.cookies["LANG"])
                            });
});

module.exports = routers