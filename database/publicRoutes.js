const publicRoutes = [
    /\/$/, // exact match,
    /^\/login/, // start with
    /^\/yourPathHere(?:\?.*)?$/ // Accept URL and query parameters:

]

const adminRoutes = [
    '/'
]

module.exports = {
    publicRoutes,
    adminRoutes
}
