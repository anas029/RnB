//APIs
function index_get(req, res) {
    res.render('home/index')
}
function another_get(req, res) {
    res.render('home/another')
}

module.exports = { index_get, another_get }