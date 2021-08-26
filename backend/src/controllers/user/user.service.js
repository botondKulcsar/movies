const User = require('../../models/user.model')

exports.findAll = () => User.find({}, { password: 0 });

exports.findOne = (id) => User.findById(id, {password: 0});

exports.updateOne = (id, payload) => User.findByIdAndUpdate(id, payload, { new: true });

exports.deleteOne = (id) => User.findByIdAndRemove(id);
