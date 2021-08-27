module.exports = (req, res, next) => {
    console.log('adminOnly: ', req.userRole)
    if (req.userRole !== 'admin') {
        return res.sendStatus(403);
    }
    next();
}