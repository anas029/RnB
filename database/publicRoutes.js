const publicRoutes = [
    /\/$/, // exact match,
    /^\/static/, // start with
    /^\/item/, // start with
    /^\/auth/, // start with
    /^\/user\/detail/, // start with
    /^\/user\/list/, // start with
    // /^\/yourPathHere(?:\?.*)?$/ // Accept URL and query parameters:

]

const adminRoutes = [
    '/admin'
]

module.exports = {
    publicRoutes,
    adminRoutes
}
