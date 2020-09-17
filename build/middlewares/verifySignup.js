"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDuplicateUsernameOrEmail = void 0;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await _user.default.findOne({
      username: req.body.username
    });
    if (user) return res.status(400).json({
      message: "The user already exists"
    });
    const email = await _user.default.findOne({
      email: req.body.email
    });
    if (email) return res.status(400).json({
      message: "The email already exists"
    });
    next();
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;