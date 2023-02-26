

// Model
const Item= require("../models/Item")
const User = require("../models/User")

// HTTP GET - Load item Form

exports.item_create_get = (req,res, next)=>{
    var user= req.user;
    User.findById(user)
        res.render("item/add" ,{ user, name: req.user })
}

// HTTP POST - to post the data 
exports.item_create_post = (req,res)=>{

    console.log(req.body);
    let item = new Item(req.body);

//Save Item in database 
item.save()
.then(()=>{
    res.redirect("/item/index");
})
.catch((err) => {
    console.log(err);
    res.send("Please try again later!!!");
})

}

//HTTP GET - index:
exports.item_index_get = (req,res)=>{
    Item.find()
    .then(items=>{
        res.render("item/index" , {items , name: req.user }) 
    })
    .catch(err=>{
        console.log(err);
    })
}



