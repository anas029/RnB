const Review = require('../models/Review')

exports.review_add_post = (req, res) => {
    const data = req.body
    data.score=parseInt(req.body.score)
    let review = new Review(data)
    // review.score=parseInt(req.body.score)
    // console.log(review)
    review.save()
    .then(()=> {
        res.redirect('/')
    })
    .catch(err => console.log(err))

}

exports.review_add_get = (req,res) => {
    res.render('review/add', { name: req.user })
}

// exports.review_add_index = (req,res) => {
//     Review.find()
//   .then((reviews) => {
//     res.render('review/index', {reviews})
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }