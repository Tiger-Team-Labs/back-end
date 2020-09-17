"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logIn = exports.signUp = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _role = _interopRequireDefault(require("../models/role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    // get the request body
    var {
      name,
      username,
      email,
      password,
      roles
    } = req.body; //create new user

    var newUser = new _user.default({
      name,
      username,
      email,
      password: yield _user.default.encryptPassword(password)
    }); //check roles

    if (roles) {
      var foundRoles = yield _role.default.find({
        name: {
          $in: roles
        }
      });
      newUser.roles = foundRoles.map(role => role._id);
    } else {
      var role = yield _role.default.findOne({
        name: "user"
      });
      newUser.roles = [role._id];
    } // save user in mongoDB


    var savedUser = yield newUser.save();
    console.log(savedUser); // create token

    var token = _jsonwebtoken.default.sign({
      id: savedUser._id
    }, _config.default.SECRET, {
      expiresIn: 86400 // 24 horas

    });

    res.status(200).json({
      token
    });
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var logIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    //request body email or username
    var userFound = yield _user.default.findOne({
      email: req.body.email
    }).populate("roles");
    if (!userFound) return res.status(400).json({
      message: "User not found"
    });
    var matchPassword = yield _user.default.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({
      token: null,
      message: "Invalid password"
    });

    var token = _jsonwebtoken.default.sign({
      id: userFound._id
    }, _config.default.SECRET, {
      expiresIn: 86400
    });

    res.json({
      token
    });
  });

  return function logIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.logIn = logIn;