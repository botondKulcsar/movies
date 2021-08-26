const userService = require('./user.service');
const createError = require('http-errors');

const { isValidObjectId } = require('../../config/objectIdChecker');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getAll = async (req, res, next) => {
    try {
        const userList = await userService.findAll();
        res.status(200);
        return res.json(userList);
    } catch (error) {
        return next(new createError.InternalServerError(err.message))
    }
}

exports.getOne = async (req, res, next) => {
    // check if id is a valid mongoose objectId
    if (!isValidObjectId(req.params.id)) {
        return next(new createError.BadRequest('invalid id'))
    }
    // check if user tries to access other user's data if not admin
    if (req.params.id !== req.userId && req.userRole !== 'admin') {
        return next(new createError.Unauthorized('admin only or unauthenticated'));
    }
    try {
        const user = await userService.findOne(req.params.id);
        if (!user) {
            return next(new createError.NotFound(`user id=${req.params.id} has not been found`))
        }
        res.status(200);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return next(new createError.InternalServerError(error.message)); 
    }
};

exports.updateOne = async (req, res, next) => {
    // check if id is a valid mongoose objectId
    if (!isValidObjectId(req.params.id)) {
        return next(new createError.BadRequest('invalid id'))
    }
     // check if user tries to access other user's data if not admin
     if (req.params.id !== req.userId && req.userRole !== 'admin') {
        return next(new createError.Unauthorized('admin only or unauthenticated'));
    }
    try {
        // check if the password is to be updated
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        const updatedUser = await userService.updateOne(req.params.id, req.body);
        if (!updatedUser) {
            return next(new createError.NotFound(`user id=${req.params.id} has not been found`))
        }
        res.status(200);
        return res.json(updatedUser);
    } catch (error) {
        console.log(error.message);
        return next(new createError.InternalServerError(error.message));
    }
}

exports.deleteOne = async (req, res, next) => {
    // check if id is a valid mongoose objectId
    if (!isValidObjectId(req.params.id)) {
        return next(new createError.BadRequest('invalid id'))
    }
     // check if not admin
     if (req.userRole !== 'admin') {
        return next(new createError.Unauthorized('admin only'));
    }
    try {
        const { deletedCount } = await userService.deleteOne(req.params.id);
        if (!deletedCount) {
            return next(new createError.NotFound(`user id=${req.params.id} has not been found`))
        }
        res.status(200);
        return res.json({});
    } catch (error) {
        console.log(error.message);
        return next(new createError.InternalServerError(error.message));
    }
}
