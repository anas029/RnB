// Import the dotenv library and configure it with the path to your local file
const dotenv = require('dotenv').config({ path: '.env.local' });

// Check if there was an error loading the environment variables
if (dotenv.error) {
    throw dotenv.error;
}
// connect to Mongodb database
require('./config/db')

const express = require('express')
const passport = require('./config/passportConfig')
const { logger } = require('./lib/logger')
const app = express()

// Port 3000
const PORT = process.env.PORT || 3000

const session = require('express-session')
const flash = require('express-flash');
const authMiddleware = require('./helper/authMiddleware');


//middleware
app.use(flash())

// session
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: true,
    cookie: {
        httpOnly: true,
        maxAge: 259200
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// locals
app.use(require('./lib/locals'))

// auth middleware
app.use(authMiddleware)
// request logger
app.use(logger.reqLog)



// Templates
//static folder
app.use(express.static('public'))
//set template engin: ejs
app.set('view engine', 'ejs')
// look into views folder for a file with name layout.ejs
app.set('layout', 'layout/main')
// initialisation Express layouts
app.use(require('express-ejs-layouts'))

// read data from request.body 
app.use(express.urlencoded({ extended: true }))

// Router middleware
app.use(require('./routers/router'))

app.listen(PORT, () => logger.info(`server [RnB] is running on http://localhost:${PORT}`))