const locals = (req, res, next) => {
    res.locals.user = req.user
    // res.locals.user = { role: "ADMIN" }
    // Set up flash messages middleware
    if (req.session.flashMessage) {
        res.locals.flashMessage = req.session.flashMessage;
        delete req.session.flashMessage;
    }
    res.locals.menu = require('../database/navMenu')
    next()
}
module.exports = locals