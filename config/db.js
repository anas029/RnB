require('dotenv').config()
const mongoose = require('mongoose')
const db = process.env.DB_URI
mongoose.set('strictQuery', true)
mongoose.connect(db)
    .then(() => console.log(`Connected to MongoDB database named: ${mongoose.connection.name}!!!`))
    .catch((error) => console.error("Error: MongoDB is not connected. " + error.message));