"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = void 0;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUsers = async (req, res) => {
  const users = await _user.default.find();
  res.json(users);
};

exports.getUsers = getUsers;

const getUserById = async (req, res) => {
  const user = await _user.default.findById(req.params.userId);
  res.status(200).json(user);
};

exports.getUserById = getUserById;

const updateUserById = async (req, res) => {
  const updateUser = await _user.default.findByIdAndUpdate(req.params.userId, req.body, {
    new: true
  });
  res.status(200).json(updateUser);
};

exports.updateUserById = updateUserById;

const deleteUserById = async (req, res) => {
  await _user.default.findByIdAndDelete(req.params.userId);
  res.status(204).json();
};

exports.deleteUserById = deleteUserById;