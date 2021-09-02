const router = require('express').Router();
const controller = require('./movie.controller');

router.get('/', (req, res, next) => controller.getTop250Movies(req, res, next));

router.patch('/:id', (req, res, next) => controller.updateOneMovie(req, res, next))


module.exports = router;