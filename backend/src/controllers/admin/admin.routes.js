const router = require('express').Router();
const controller = require('./admin.controller');


router.get('/users', (req, res, next) => controller.getUsers(req, res, next));

router.get('/users/:id', (req, res, next) => controller.getOneUser(req, res, next));

router.patch('users/:id', (req, res, next) => controller.updateOneUser(req, res, next));

router.delete('users/:id', (req, res, next) => controller.deleteOneUser(req, res, next));


module.exports = router;