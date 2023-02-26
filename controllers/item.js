// Model
const Item = require("../models/Item")
const User = require("../models/User")

// HTTP GET - Load item Form
exports.item_create_get = (req, res, next) => {
    var user = req.user;
    User.findById(user)
    res.render("item/add")
}

// HTTP POST - to post the data 
exports.item_create_post = (req, res) => {

    console.log(req.body);
    const item = new Item(req.body);
    item.owner = req.user._id
    //Save Item in database 
    item.save()
        .then(() => {
            res.redirect("/item/index");
        })
        .catch((err) => {
            console.log(err);
            res.send("Please try again later!!!");
        })
}

//HTTP GET - index:
exports.item_index_get = (req, res) => {
    Item.find()
        .then(items => {
            res.render("item/index", { items })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.item_details_get = (req, res) => {
    Item.findById(req.query.id).populate('owner').populate('borrower')
        .then(item =>
            res.render("item/details", { item }))
        .catch(err => console.log(err))
}

