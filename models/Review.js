const mongoose = require('mongoose')
//Review Schema
const reviewSchema = new mongoose.Schema({
    score: {type: Number,required: true},
    description: {type: String,required: true},
    item:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],

    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    
    {
      timetamps:true  
    }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review