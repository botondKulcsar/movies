const User = require('../../models/user.model')

exports.findAll = () => User.find({}, { password: 0, _id: 0, role: 0, firstName: 0, lastName: 0, email: 0, markedAsFriends: 0  });

exports.findOne = (id) => User.findById(id, {password: 0});

exports.updateOne = (id, payload) => User.findByIdAndUpdate(id, payload, { new: true }).select({ password: 0 });


