const router = require('express').Router();
const moviePostController = require('./moviePost.controller');

router.post('/', (req, res, next) => moviePostController.createMoviePost(req, res, next));
router.get('/', (req, res, next) => moviePostController.getPostsByMovieOrUserId(req, res, next));


module.exports = router;