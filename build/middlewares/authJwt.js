"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUser = exports.isAdmin = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _user = _interopRequireDefault(require("../models/user"));

var _role = _interopRequireDefault(require("../models/role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({
      message: "No token provided"
    });

    const decoded = _jsonwebtoken.default.verify(token, _config.default.SECRET);

    req.userId = decoded.id;
    const user = await _user.default.findById(req.userId, {
      password: 0
    });
    if (!user) return res.status(404).json({
      message: "No user found"
    });
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

exports.verifyToken = verifyToken;

const isAdmin = async (req, res, next) => {
  const user = await _user.default.findById(req.userId);
  const roles = await _role.default.find({
    _id: {
      $in: user.roles
    }
  });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({
    message: "Require Admin role"
  });
};

exports.isAdmin = isAdmin;

const isUser = async (req, res, next) => {
  const user = await _user.default.findById(req.userId);
  const roles = await _role.default.find({
    _id: {
      $in: user.roles
    }
  });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "user") {
      next();
      return;
    }
  }

  return res.status(403).json({
    message: "Require User role"
  });
};

exports.isUser = isUser;