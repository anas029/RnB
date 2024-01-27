const { publicRoutes, adminRoutes } = require('../database/publicRoutes')
module.exports = (req, res, next) => {
    const isPublicRoute = publicRoutes.some(publicRoute => publicRoute.test(req.url));
    const isAdminRoute = false
    if (isPublicRoute) return next()

    if (!isAdminRoute && req.user) return next()

    if (isAdminRoute && req.user && req.user.role === 'ADMIN') return next()

    return res.redirect(`/auth/signin?callback_url=${encodeURIComponent(req.originalUrl)}`)
}
