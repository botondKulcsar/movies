const router = require('express').Router();
const controller = require('./movie.controller');

router.get('/', (req, res, next) => controller.getDemoMovies(req, res, next))


module.exports = router;