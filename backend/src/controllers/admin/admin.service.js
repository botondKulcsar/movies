const User = require('../../models/user.model');


exports.getAllUsers = () => User.find({}, {password: 0});

exports.deleteOneUser = (id) => User.findByIdAndRemove(id).select({ password: 0 });