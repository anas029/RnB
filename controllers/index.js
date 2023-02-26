//APIs
function index_get(req, res) {
    res.render('home/index', { name: req.user })
}
function another_get(req, res) {
    res.render('home/another', { name: req.user })
}

module.exports = { index_get, another_get }