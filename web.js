const express = require('express');
const app = express();
const user = require('./routers/user');
const userApi = require('./routers/api/user');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const path = require("path")
const fs = require("fs")
const env = require("dotenv")

// env
env.config()

function parseCookieString(cookieString) {
    const cookieObj = {};
    
    // Split the string by '; ' to get individual key=value pairs
    const pairs = cookieString.split('; ');

    pairs.forEach(pair => {
        // Split each pair by '=' to get the key and value
        const [key, value] = pair.split('=');
        // Assign the key-value pair to the object
        cookieObj[key] = value;
    });

    return cookieObj;
}

// 
app.use((req, res, next) => {
    // res.json(parseCookieString(req.headers.cookie))
    if( !parseCookieString(req.headers.cookie).LANG ){
        res.cookie("LANG", process.env.DEFAULT_LANG, { maxAge: 24 * 60 * 60 * 2, httpOnly: true })
    }
    next()
})

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use cookie-parser middleware
app.use(cookieParser());

// Public assets
app.use(express.static(path.join(__dirname, 'views')));

// Router
app.use( user )

// Api
app.use("/api", userApi)

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});
