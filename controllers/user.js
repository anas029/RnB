const User = require('../models/User')
const upload = require('../lib/upload')

//HTTP GET - my profile :
function user_myProfile_get(req, res) {
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
    try {
        User.findByIdAndUpdate(req.user._id, { profileImage: req.file?.path })
            .then(res.redirect("/user/myProfile"))
            .catch((e) => {
                req.session.flashMessage = 'Something went wrong.'
                console.log(e.message)
                res.redirect("/user/edit/")
            })
    } catch (e) {
        req.session.flashMessage = 'Something went wrong.'
        console.log(e.message)
        res.redirect("/user/edit/")
    }
}

//HTTP GET - All profile:
function user_updatePassword_post(req, res) {
    const data = req.body
    data.id = req.user.id
    // console.log(data)
    User.changePassword(data)
        .then((r) => res.redirect('/auth/signout'))
        .catch(e => {
            req.session.flashMessage = e.message
            res.redirect('/user/edit')
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


module.exports = {
    user_myProfile_get,
    user_edit_get,
    user_edit_post,
    user_editImg_post,
    user_updatePassword_post,
    user_detail_get,
    user_profile_get,
}