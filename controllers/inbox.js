const Message = require('../models/Message')

async function getContactList(req) {
    try {
        let list = [];

        const receivedMessages = await Message.find({ receiver: req.user._id, next: null })
            .populate('sender')
            .populate('receiver');

        if (receivedMessages.length > 0) {
            list = list.concat(receivedMessages);
        }

        const sentMessages = await Message.find({ sender: req.user._id, next: null })
            .populate('sender')
            .populate('receiver');

        if (sentMessages.length > 0) {
            list = list.concat(sentMessages);
        }
        return list;

    } catch (e) {
        console.log(e);
    }
}


//HTTP GET - my inbox
async function user_inbox_get(req, res) {
    try {
        const msgs = await getContactList(req)
        res.render('messages/index', { msgs })
    } catch (error) {

    }

}
//HTTP GET - my inbox
async function user_message_get(req, res) {
    try {
        const list = await getContactList(req)
        let receiver = req.query.id
        const msgs = new Array()
        const LIMIT = 5


        function retrieveMessages() {
            let count = 0;
            const getNextMessage = (id) => {
                if (id == null) {
                    res.render('messages/message', { list, msgs, receiver })
                } else {
                    Message.findById(id)
                        .populate('sender')
                        .populate('receiver')
                        .then(msg => {
                            if (msg !== null && count < LIMIT) {
                                msgs.unshift(msg)
                                count++
                                getNextMessage(msg.previous);
                            } else
                                res.render('messages/message', { list, msgs, receiver })
                        })
                        .catch(e => console.log(e));
                }
            }

            Message.findOne({ sender: req.query.id, receiver: req.user._id, next: null })
                .populate('sender')
                .populate('receiver')
                .then(msg => {
                    if (msg === null) {
                        Message.findOne({ receiver: req.query.id, sender: req.user._id, next: null })
                            .populate('sender')
                            .populate('receiver')
                            .then(msg => {
                                if (msg !== null) {
                                    msgs.unshift(msg);
                                    getNextMessage(msg.previous)
                                } else
                                    res.render('messages/message', { list, msgs, receiver })
                            })
                            .catch(e => console.log(e))
                    } else {
                        msgs.unshift(msg)
                        getNextMessage(msg.previous)
                    }
                })
                .catch(e => console.log(e));
        }
        retrieveMessages()
    } catch (error) {

    }
}
//HTTP POST - my inbox
function user_inbox_post(req, res) {
    let newMsg = new Message(req.body)
    newMsg.sender = req.user
    if (req.body.previous) {
        Message.findById(req.body.previous)
            .then(oldMsg => {
                newMsg.previous = oldMsg._id
                newMsg.save()
                    .then(msg => {
                        newMsg = msg
                    })
            })
        Message.findByIdAndUpdate(req.body.previous, { $set: { next: newMsg._id } }, { new: true })
            .then(res.redirect(`/user/message?id=${req.body.receiver}`))
    } else {
        newMsg.previous = null
        newMsg.save()
            .then(msg => {
                res.redirect(`/user/message?id=${req.body.receiver}`)
            })
    }
}

module.exports = {
    user_inbox_get,
    user_message_get,
    user_inbox_post,
}