"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logIn = exports.signUp = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _role = _interopRequireDefault(require("../models/role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, username, email, password, roles, newUser, foundRoles, role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // get the request body
            _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles; //create new user

            _context.t0 = _user["default"];
            _context.t1 = name;
            _context.t2 = username;
            _context.t3 = email;
            _context.next = 7;
            return _user["default"].encryptPassword(password);

          case 7:
            _context.t4 = _context.sent;
            _context.t5 = {
              name: _context.t1,
              username: _context.t2,
              email: _context.t3,
              password: _context.t4
            };
            newUser = new _context.t0(_context.t5);

            if (!roles) {
              _context.next = 17;
              break;
            }

            _context.next = 13;
            return _role["default"].find({
              name: {
                $in: roles
              }
            });

          case 13:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 21;
            break;

          case 17:
            _context.next = 19;
            return _role["default"].findOne({
              name: "user"
            });

          case 19:
            role = _context.sent;
            newUser.roles = [role._id];

          case 21:
            _context.next = 23;
            return newUser.save();

          case 23:
            savedUser = _context.sent;
            console.log(savedUser); // create token

            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400 // 24 horas

            });
            res.status(200).json({
              token: token
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var logIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, matchPassword, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 2:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "User not found"
            }));

          case 5:
            _context2.next = 7;
            return _user["default"].comparePassword(req.body.password, userFound.password);

          case 7:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: "Invalid password"
            }));

          case 10:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function logIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.logIn = logIn;