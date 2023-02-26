//APIs
function index_get(req, res) {
    res.render('home/index', { name: req.user })
}
function index_post(req, res) {
    console.log(req.file.filename)
    res.render('home/image', { name: req.user, image: req.file.filename })
}
function another_get(req, res) {
    res.render('home/another', { name: req.user })
}

module.exports = { index_get, another_get, index_post }