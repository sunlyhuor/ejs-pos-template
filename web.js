const express = require('express');
const app = express();
const user = require('./routers/user');
const userApi = require('./routers/api/user');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const path = require("path")
const fs = require("fs")
const env = require("dotenv");
const { LangMiddleware } = require('./middlewares/middleware');
const lang = require('./locales/lang');

// env
env.config()

// 
app.use( LangMiddleware )

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use cookie-parser middleware
app.use(cookieParser());

// Public assets
app.use(express.static(path.join(__dirname, 'views')));

// Change lang
app.get("/lang/:lang", (req, res) => {
    if( !lang().some( d => d == req.params.lang ) ){
        res.cookie("LANG", process.env.DEFAULT_LANG, { maxAge: 24 * 60 * 60 * 7, httpOnly: true })
        res.redirect("/")
    }
    res.cookie("LANG", req.params.lang, { maxAge: 24 * 60 * 60 * 7, httpOnly: true })
    return res.redirect(req.get("Referrer") || "/")
})

// Router
app.use( user )

// Api
app.use("/api", userApi)

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});
