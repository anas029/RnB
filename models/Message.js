const mongoose = require('mongoose')

const msgSchema = mongoose.Schema({
    messageContent: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    previous: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    next: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true })

module.exports = mongoose.model('Message', msgSchema)