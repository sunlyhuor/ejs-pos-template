const express = require('express');
const app = express();
const path = require("path");
const user = require('./routers/user');
const userApi = require('./routers/api/user');
const bodyParser = require("body-parser")

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Public assets
app.use(express.static(path.join(__dirname, 'views')));

// Router
app.use( user )

// Api
app.use("/api", userApi)

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
