const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    priceRate: { type: Number, required: true },
    dopiste: { type: Number, required: true },
    condition: { type: String, enum: ['new', 'good', 'old'], required: true },
    type: { type: String, enum: ['home appliances', 'electronics', 'other'], required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    borrowDate: { type: Date },
    isAvailable: { type: Boolean, default: true, required: true }
}, { timetamps: true })


itemSchema.virtual('review', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'item'
})
itemSchema.virtual('numOfReview', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'item',
    count: true
})


// itemSchema.virtual('score').get(async function () {
//     this.populate({ path: 'review', select: 'score' })
//         .then(s => { return s })
//         .catch(e => { return e.message })
//     // return await this.populate({
//     //     path: 'review',
//     //     select: 'score'
//     // })
//     // const sum = total.review.reduce((a, c) => a + c.score, 0)
//     // let avg = sum / total.review.length;
//     // console.log(avg);
//     // return total
// })
// itemSchema.virtual('score').get(async function () {
//     let total
//     try {
//         return this.populate({ path: 'review', select: 'score' })

//     }
//     catch {

//     }
//     // await new Promise(function () {
//     // }
//     // )
//     return total
//     // try {
//     //     const item = await this.populate({ path: 'review', select: 'score' })
//     //     return item
//     // } catch (err) {
//     //     console.error(err);
//     //     throw new Error('Error calculating score');
//     // }
// })
itemSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Item', itemSchema)

