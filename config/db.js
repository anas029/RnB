require('dotenv').config()
const mongoose = require('mongoose')
const db = process.env.DB_URI
mongoose.set('strictQuery', true)
mongoose.connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch((err) => { console.log(err) })
