const router = require('express').Router();
const moviePostController = require('./moviePost.controller');
const authenticationByJWT = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');

router.post('/', authenticationByJWT, (req, res, next) => moviePostController.createMoviePost(req, res, next));
router.get('/', (req, res, next) => moviePostController.getPostsByMovieOrUserId(req, res, next));
router.patch('/:id', authenticationByJWT, adminOnly, (req, res, next) => moviePostController.updateMoviePost(req, res, next));
router.delete('/:id', authenticationByJWT, adminOnly, (req, res, next) => moviePostController.deleteMoviePost(req, res, next));


module.exports = router;