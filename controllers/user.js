const User = require('../models/User')
const Message = require('../models/Message');
const { count } = require('../models/Message');


//HTTP GET - my profile :
function user_myProfile_get(req, res, next) {
    User.findById(req.user._id).populate({ path: 'item', populate: { path: 'review' } }).populate('borrowedItem')
        .then(user => {
            res.render("user/myProfile", { user });
        })
        .catch(err => {
            req.session.flashMessage = 'Something went wrong'
            console.log(err);
            res.redirect('/item/index')
        })
}


//HTTP GET - load edit form :
function user_edit_get(req, res) {

    User.findByIdAndUpdate(req.user._id)
        .then(user => {
            res.render("user/edit", { user });
        })
        .catch(err => {
            console.log(err);
        })
}

// HTTP POST - Update my profile 
function user_edit_post(req, res) {
    const data = { firstName, lastName, telNumber } = req.body
    User.findByIdAndUpdate(req.user._id, data)
        .then(() => {
            res.redirect("/user/myProfile");
        })
        .catch((err) => {
            console.log(err);
            res.send("Please try again later!!!");
        })

}
// HTTP POST - Update my profile Picture
function user_editImg_post(req, res) {
    User.findByIdAndUpdate(req.user._id, { profileImage: req.file.filename })
        .then(() => {
            res.redirect("/user/myProfile");
        })
        .catch((err) => {
            console.log(err);
            res.send("Please try again later!!!");
        })

}

//HTTP GET - All profile:
function user_updatePassword_post(req, res) {
    const data = req.body
    data.id = req.user.id
    console.log(data)
    User.changePassword(data)
        .then(res.redirect('/auth/signout'))
        .catch(err => {
            console.log(err.message);
        })
}


//HTTP GET - user profile by ID :
function user_detail_get(req, res) {
    User.findById(req.query.id).populate({ path: 'item', populate: { path: 'review' } }).populate({ path: 'item', populate: { path: 'numOfReview' } }).populate('borrowedItem')
        .then(user => {
            res.render("user/detail", { user });
        })
        .catch(err => {
            console.log(err);
        })
}

//HTTP GET - All profile:
function user_profile_get(req, res) {
    User.find()
        .then(users => {
            res.render("user/list", { users })
        })
        .catch(err => {
            console.log(err);
        })
}



//HTTP GET - my inbox
function user_inbox_get(req, res) {
    res.render('messages/index')
}
//HTTP GET - my inbox
function user_message_get(req, res) {
    const msgs = new Array()
    const LIMIT = 5

    function retrieveMessages() {
        let count = 0;
        const getNextMessage = (id) => {
            if (id == null) {
                res.render('messages/message', { msgs })
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
                            res.render('messages/message', { msgs })
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
                                res.render('messages/message', { msgs })
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
}
//HTTP POST - my inbox
function user_inbox_post(req, res) {
    const newMsg = new Message(req.body)
    let previous = null
    newMsg.sender = req.user
    if (req.body.previous)
        previous = req.body.previous
    newMsg.previous = previous
    newMsg.save()
        .then(msg => {
            if (msg.previous !== null) {
                Message.findByIdAndUpdate(msg.previous, { $set: { next: msg._id } })
                    .then(preMsg => {
                        Message.findByIdAndUpdate(msg._id, { $set: { previous: preMsg._id } })
                    })
            }
            res.redirect('/user/myinbox')
        })
}

module.exports = {
    user_myProfile_get,
    user_edit_get,
    user_edit_post,
    user_editImg_post,
    user_updatePassword_post,
    user_detail_get,
    user_profile_get,
    user_inbox_get,
    user_message_get,
    user_inbox_post,
}