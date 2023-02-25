const express = require('express')
const app = express()
require('./config/db')

// Port 3000
const PORT = process.env.PORT || 3000

const session = require('express-session')
const passport = require('./lib/passportConfig')

// session
app.use(session({
    secret: process.env.KEY,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 259200 }
}))
app.use(passport.initialize())
app.use(passport.session())



//static folder
app.use(express.static('public'))
//node.js to look in a folder 
app.set('view engine', 'ejs')
// initialisation Express layouts
const expressLayouts = require('express-ejs-layouts')
// look into views folder for a file with name layout.ejs
app.use(expressLayouts)


// import routes
const indexRouter = require('./routers/index')
const authRouter = require('./routers/auth')

//Mount Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)


app.listen(PORT, () => console.log('server [RnB] is on', PORT))