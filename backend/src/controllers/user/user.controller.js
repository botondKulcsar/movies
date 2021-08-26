const userService = require('./user.service');
const createError = require('http-errors');

const { isValidObjectId } = require('../../config/objectIdChecker');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getAll = async (req, res, next) => {
    try {
        const userList = await userService.findAll();
        res.status(200);
        res.json(userList);
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
        res.json(user);
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
        
    } catch (error) {
        
    }
}

