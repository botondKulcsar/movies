module.exports = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.sendStatus(403);
    }
    next();
}