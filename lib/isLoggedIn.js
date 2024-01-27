module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect_url = req.url
        res.redirect('/auth/signin')
    }
    else
        next()
}