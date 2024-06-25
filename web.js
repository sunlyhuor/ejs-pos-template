const express = require('express');
const app = express();
const user = require('./routers/user');
const userApi = require('./routers/api/user');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const path = require("path")
const fs = require("fs")
const env = require("dotenv");
const { LangMiddleware, AuthenticateMiddleware } = require('./middlewares/middleware');
const lang = require('./locales/lang');
const { myDataSource } = require('./libs/database');

// env
env.config()

// Typeorm executing
myDataSource.on("connect", () => {
    console.log('Connected to the database');
})


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
app.use(express.static(path.join(__dirname, 'public')));

// Change lang
app.get("/lang/:lang", (req, res) => {
    if( !lang().some( d => d == req.params.lang ) ){
        res.cookie("LANG", process.env.DEFAULT_LANG, { maxAge: 24 * 60 * 60 * 7, httpOnly: true })
        res.redirect("/")
    }
    res.cookie("LANG", req.params.lang, { maxAge: 24 * 60 * 60 * 7, httpOnly: true })
    return res.redirect(req.get("Referrer") || "/")
})

// api
app.use("/api", userApi)

// Router
app.use( user )

app.get( "/unauthorized", (req, res) => {
    res.render("html/unauthorized")
} )

app.get("/logout", (req, res) => {
    res.cookie("accessToken", "", {
        maxAge: -1,
        httpOnly: true
    })
    res.cookie("refreshToken", "", {
        maxAge: -1,
        httpOnly: true
    })
    res.cookie("isLogin", "", {
        maxAge: -1,
        httpOnly: true
    })
    res.cookie("user", "", {
        maxAge: -1,
        httpOnly: true
    })
    res.redirect("/login")
})

app.get("/*", async (req, res)=>{
    res.render("html/not-found")
})

// Api
// app.use("/api", userApi)

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});
