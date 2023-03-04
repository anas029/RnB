const mongoose = require('mongoose')

const msgSchema = mongoose.Schema({
    messageContent: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    next: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
}, { timestamps: true })

module.exports = mongoose.model('Message', msgSchema)