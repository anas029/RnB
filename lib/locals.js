const locals = (req, res, next) => {
    res.locals.user = req.user
    res.locals = { user525: req.user }

    // Set up flash messages middleware
    if (req.session.flashMessage) {
        res.locals.flashMessage = req.session.flashMessage;
        delete req.session.flashMessage;
    }
    next()
}
module.exports = locals