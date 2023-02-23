const express = require('express')
const app = express()
require('./config/db')

// Port 3000
const PORT = process.env.PORT || 3000

// import routes
const indexRouter = require('./routers/index')


//static folder
app.use(express.static('public'))
//node.js to look in a folder 
app.set('view engine', 'ejs')
// initialisation Express layouts
const expressLayouts = require('express-ejs-layouts')
// look into views folder for a file with name layout.ejs
app.use(expressLayouts)


//Mount Routes
app.use('/', indexRouter)



app.listen(PORT, () => console.log('server [RnB] is on', PORT))