const express = require("express")
const routers = express.Router()

// Define a route to render an EJS template
routers.get('/', (req, res) => {
    // Render views/index.ejs
    console.log(req.path)
    res.render('html/index', { title: 'Express Render EJS Example', pathname: req.path });
});

routers.get('/about', (req, res) => {
    // Render views/index.ejs
    res.render('html/about', { title: 'Express Render About page', pathname: req.path });
});

routers.get('/login', (req, res) => {
    // Render views/index.ejs
    res.render('html/login', { title: 'Express Render Login page', pathname: req.path });
});

module.exports = routers