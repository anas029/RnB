// Model
const Item = require("../models/Item")
const User = require("../models/User")
const Review = require("../models/Review")


//HTTP GET - index:
function item_index_get(req, res) {
    Item.find().populate('owner').populate('borrower').populate('review').populate('numOfReview')
        .then(items => {
            res.render("item/index", { items })
        })
        .catch(err => {
            console.log(err);
        })
}

//HTTP GET - detail:
function item_details_get(req, res) {
    Item.findById(req.query.id).populate('owner').populate('borrower').populate('review').populate('numOfReview')
        .then(item => {
            res.render("item/details", { item, user: req.user })
        })
        .catch(err => console.log(err))
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
//ADD
// HTTP GET - ADD
function item_create_get(req, res) {
    res.render("item/add")
}
// HTTP POST - ADD
function item_create_post(req, res) {
    const item = new Item(req.body);
    item.owner = req.user._id
    item.itemImage = req.file.filename
    item.save()
        .then(() => {
            res.redirect("/user/myprofile")
        })
        .catch((err) => {
            console.log(err);
            res.send("Please try again later!!!");
        })
}

// HTTP GET - ADD Image
function item_addImg_get(req, res) {
    res.render("item/addImg")
}
// HTTP POST - ADD Image
function item_addImg_post(req, res) {
    Item.findById(req.query.id).populate('owner')
        .then(item => {
            if (item.owner.id == req.user._id) {
                item.itemImage = req.file.filename
                item.save()
                    .then(res.redirect('/user/myProfile'))
                    .catch(e => res.send(e.message))
            } else {
                res.redirect('/auth/signin')
            }
        })
        .catch(e => res.send(e.message))
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
// BORROW
// HTTP GET - Borrow
function item_borrow_get(req, res) {
    Item.findById(req.query.id).populate('owner').populate('borrower')
        .then(item => {
            if (item.isAvailable)
                res.render("item/borrowItem", { item, user: req.user })
        })
        .catch(err => console.log(err))
}
// HTTP POST - Borrow
function item_borrow_post(req, res) {
    Item.findById(req.query.id)
        .then(item => {
            if (item.isAvailable) {
                User.findById(req.user._id)
                    .then(user => {
                        user.credit -= item.dopiste
                        user.save()
                    })
                item.isAvailable = false
                item.borrower = req.user._id
                item.borrowDate = Date.now()
                item.save()
                res.render("item/borrowItem", { item, user: req.user })
            }
        })
        .catch(err => console.log(err))
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
// RETURN
// HTTP GET - Return
function item_return_get(req, res) {
    Item.findById(req.query.id).populate('owner').populate('borrower')
        .then(item => {
            if (!item.isAvailable)
                res.render("item/returnItem", { item, user: req.user })
        })
        .catch(err => console.log(err))
}
// HTTP POST - Return
function item_return_post(req, res) {
    Item.findById(req.query.id)
        .then(item => {
            if (!item.isAvailable) {
                const balance = item.dopiste - (
                    item.priceRate * Math.ceil((Date.now() - item.borrowDate) / (1000 * 60 * 60 * 24)))
                User.findById(item.borrower)
                    .then(user => {
                        user.credit += balance
                        user.save()
                    })
                    .catch(e => console.log(e.message))
                item.isAvailable = true
                item.borrower = null
                item.borrowDate = null
                item.save()
                const data = req.body
                data.score = parseInt(req.body.score)
                data.creatorId = req.user._id
                data.item = item._id
                const review = new Review(data)
                review.save()
                    .then(res.redirect("/"))
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
// EDIT
// HTTP GET - Edit
function item_edit_get(req, res) {
    Item.findById(req.query.id).populate('owner').populate('borrower')
        .then(item => {
            if (item.isAvailable)
                res.render("item/edit", { item, user: req.user })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
}
// HTTP POST - Edit
function item_edit_post(req, res) {
    // const filter = { id: req.query.id, isAvailable: true, owner: req.user._id }
    // let data = req.body
    // const update = { data }
    // Item.findOneAndUpdate(filter, update, (err) => {
    //     if (err)
    //         console.log(err.message)
    //     else
    //         res.redirect('/')
    // })







    // const filter = { id: req.query.id };
    // let data = req.body;
    // const update = { data };
    // Item.findOneAndUpdate(filter, update, { new: true }, (err, updatedItem) => {
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //     } else if (!updatedItem) {
    //         console.log(`No item found for id ${req.query.id}`);
    //         res.sendStatus(404);
    //     } else {
    //         console.log(`Updated item: ${updatedItem}`);
    //         res.sendStatus(200);
    //     }
    // });


    const data = { itemName, description, priceRate, deposit, condition, type } = req.body
    Item.findByIdAndUpdate(req.query.id, data)
        .then((b) => {
            res.redirect("/user/myProfile");
        })
        .catch((err) => {
            console.log(err);
            res.send("Please try again later!!!");
        })







}
///-
function item_edit2_get(req, res) {
    // Item.findOneAndUpdate(filter, update, { new: true })
    Item.findById(req.query.id).populate('owner').populate('borrower')
        .then(item => {
            if (item.isAvailable)
                res.render("item/edit2", { item, user: req.user })
        })
        .catch(err => console.log(err))
}
function item_edit2_post(req, res) {
    console.log(req.body)
    const filter = { _id: req.query.id, isAvailable: true, owner: req.user._id }
    let data = req.body
    data.itemImage = req.file.filename
    const update = { data }
    Item.findOneAndUpdate(filter, update, { new: true })
    // Item.findById(req.query.id)
    //     .then(item => {
    //         if (!item.isAvailable) {
    //             const balance = item.dopiste - (
    //                 item.priceRate * Math.ceil((Date.now() - item.borrowDate) / (1000 * 60 * 60 * 24)))
    //             User.findById(item.borrower)
    //                 .then(user => {
    //                     user.credit += balance
    //                     user.save()
    //                 })
    //                 .catch(e => console.log(e.message))
    //             item.isAvailable = true
    //             item.borrower = null
    //             item.borrowDate = null
    //             item.save()
    //             const data = req.body
    //             data.score = parseInt(req.body.score)
    //             data.creatorId = req.user._id
    //             data.item = item._id
    //             const review = new Review(data)
    //             review.save()
    //                 .then(res.redirect("/"))
    //                 .catch(err => console.log(err))
    //         }
    //     })
    //     .catch(err => console.log(err))
}
//\\-
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
// DELETE
// HTTP GET - Delete
function item_delete_get(req, res) {
    Item.findOneAndDelete({ _id: req.query.id, isAvailable: true, owner: req.user._id }, function (err, docs) {
        if (err) { console.log(err) }
        else {
            console.log("Deleted User : ", docs)
            res.redirect('/user/myprofile')
        }
    })
}

module.exports = {
    item_index_get,
    item_details_get,
    item_create_get,
    item_create_post,
    item_addImg_get,
    item_addImg_post,
    item_borrow_get,
    item_borrow_post,
    item_return_get,
    item_return_post,
    item_edit_get,
    item_edit_post,
    item_delete_get,
    item_edit2_post,
    item_edit2_get
}