const mongoose = require('mongoose')
const { logger } = require('../lib/logger')
const db = process.env.DB_URI
mongoose.set('strictQuery', true)
mongoose.connect(db)
    .then(() => logger.info(`Connected to MongoDB database named: ${mongoose.connection.name}.`))
    .catch((error) => logger.error("Error: MongoDB is not connected. " + error.message));