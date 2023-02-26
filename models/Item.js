const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    itemName: {type:String, required: true},
    description: {type:String,required: true},
    priceRate: {type:Number,required: true},
    condition: {type:String,enum:['new','good'],required: true},
    type: {type:String,enum:['home appliances','electronics','others'],required: true},
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
},

{
    timetamps: true
})

//Model

const Item = mongoose.model('Item', itemSchema)
//Exporting the model

module.exports = Item