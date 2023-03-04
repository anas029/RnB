const Message = require('../models/Message')

async function getContactList(req) {
    try {
        let list = []
        const receivedMessages = await Message.find({ receiver: req.user._id, next: null })
            .populate('sender')
            .populate('receiver')

        if (receivedMessages.length > 0) {
            list = list.concat(receivedMessages)
        }

        const sentMessages = await Message.find({ sender: req.user._id, next: null })
            .populate('sender')
            .populate('receiver')

        if (sentMessages.length > 0) {
            list = list.concat(sentMessages)
        }
        return list

    } catch (e) {
        console.log(e)
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
async function user_inbox_post(req, res) {
    let newMsg = new Message(req.body)
    newMsg.sender = req.user
    async function findLastMsg(req, res) {
        const lastMsg = await Message.findOne({ sender: req.body.receiver, receiver: req.user._id, next: null })
        if (lastMsg === null) {
            const lastMsg = await Message.findOne({ receiver: req.body.receiver, sender: req.user._id, next: null })
            return lastMsg
        } else {
            return lastMsg
        }
    }
    const lastMsg = await findLastMsg(req, res)
    if (lastMsg) {
        newMsg.previous = lastMsg._id
        newMsg.save()
            .then(() => {
                lastMsg.next = newMsg._id
                lastMsg.save(() => {
                    res.redirect(`/user/message?id=${req.body.receiver}`)
                })
            })
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