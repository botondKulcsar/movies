const movieService = require('./movie.service')
const createError = require('http-errors');


exports.getDemoMovies = async (req, res, next) => {
    try {
        const movieList = await movieService.getAllDemoMovies()
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