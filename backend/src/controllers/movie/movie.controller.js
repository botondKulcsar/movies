const movieService = require('./movie.service')
const createError = require('http-errors');


exports.getTop250Movies = async (req, res, next) => {
    try {
        const movieList = await movieService.getTop250Movies()
        if (!movieList) {
            throw new Error('could not read sample data')
        }
        res.status(200);
        res.json(movieList);
    }
    catch (error) {
        next(new createError.InternalServerError(error.message));
    }
}

exports.updateOneMovie = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next(new createError.BadRequest('movie ID is missing'))
        }
        const updatedMovie = await movieService.findMovieByIdAndUpdate(req.params.id, req.body);
        if (!updatedMovie) {
            return next(new createError.NotFound(`no movie with id=${req.params.id} was found :(r`))
        }
        res.status(200);
        res.json(updatedMovie);
    } catch (error) {
        return next(new createError.InternalServerError(error.message));
    }
}