const router = require('express').Router();
const userController = require('./user.controller')
const adminOnly = require('../auth/adminOnly');

router.get('/', adminOnly, (req, res, next) => userController.getAll(req, res, next));

router.get('/:id', (req, res, next) => userController.getOne(req, res, next));

router.patch('/:id', (req, res, next) => userController.updateOne(req, res, next));

module.exports = router;