const moviePostService = require('./moviePost.service');
const createError = require('http-errors');
const isValidObjectId = require('../../config/objectIdChecker');

exports.createMoviePost = async (req, res, next) => {
    try {
        const { userId, movieId, content } = req.body;
        if (!userId || !movieId || !content) {
            return next(new createError.BadRequest('request body is missing required field(s)'))
        }
        // check if user tries to post in behalf of other user
        if (userId !== req.userId) {
            return next(new createError.Forbidden(`you are not allowed to steal other user's identity`))
        }
        const savedPost = await moviePostService.createMoviePost(req.body);
        if (!savedPost) {
            throw new Error('could not save post')
        };
        res.status(201);
        return res.json(savedPost);
    } catch (error) {
        console.error(error.message);
        return next(new createError.InternalServerError(error.message));
    }
};

exports.getPostsByMovieOrUserId = async (req, res, next) => {
    try {
        console.log(req.userRole);
        const { userId, movieId } = req.body;
        if (!userId && !movieId && req.userRole !== 'admin') {
            return next(new createError.BadRequest('request body is missing required field(s)'));
        }
        if (!userId && !movieId && req.userRole === 'admin') {
            const moviePostList = await moviePostService.getPostsByUserOrMovieId();
            if (!moviePostList) {
                throw new Error('could not get posts')
            }
            res.status(200);
            return res.json(moviePostList);
        }
        if (userId) {
            const usersPosts = await moviePostService.getPostsByUserOrMovieId({ userId });
            if (!usersPosts) {
                throw new Error(`could not find any post by user id=${userId}`)
            }
            res.status(200);
            return res.json(usersPosts);
        }
        if (movieId) {
            const moviePosts = await moviePostService.getPostsByUserOrMovieId({ movieId });
            if (!moviePosts) {
                throw new Error(`could not find any post about movie id=${movieId}`)
            }
            res.status(200);
            return res.json(moviePosts);
        }
    } catch (error) {
        console.error(error.message);
        return next(new createError.InternalServerError(error.message));
    }
}

exports.updateMoviePost = async (req, res, next) => {
    // check if id is a valid mongoose objectId
    if (!isValidObjectId(req.params.id)) {
        return next(new createError.BadRequest('invalid id'))
    }
    if (!req.body.content) {
        return next(new createError.BadRequest('content is empty. try deleting the post'))
    }
    try {
        const updatedPost = await moviePostService.updateOne(req.params.id, req.body);
        if (!updatedPost) {
            return next(new createError.NotFound(`a post with id=${req.params.id} has not been found`));
        }
        res.status(200);
        return res.json(updatedPost);
    } catch (error) {
        console.log(error.message);
        return next(new createError.InternalServerError(error.message))
    }
}

exports.deleteMoviePost = async (req, res, next) => {
    // check if id is a valid mongoose objectId
    if (!isValidObjectId(req.params.id)) {
        return next(new createError.BadRequest('invalid id'))
    }
    try {
        deleteSuccessful = await moviePostService.deleteOne(req.params.id);
        if (!deleteSuccessful) {
            return next(new createError.NotFound(`a post with id=${req.params.id} has not been found`));
        }
        res.status(200);
        res.json({})
    } catch (error) {
        console.log(error.message);
        return next(new createError.InternalServerError(error.message))
    }
}