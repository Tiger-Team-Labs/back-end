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

const signUp = async (req, res) => {
  // get the request body
  const {
    name,
    username,
    email,
    password,
    roles
  } = req.body; //create new user

  const newUser = new _user.default({
    name,
    username,
    email,
    password: await _user.default.encryptPassword(password)
  }); //check roles

  if (roles) {
    const foundRoles = await _role.default.find({
      name: {
        $in: roles
      }
    });
    newUser.roles = foundRoles.map(role => role._id);
  } else {
    const role = await _role.default.findOne({
      name: "user"
    });
    newUser.roles = [role._id];
  } // save user in mongoDB


  const savedUser = await newUser.save();
  console.log(savedUser); // create token

  const token = _jsonwebtoken.default.sign({
    id: savedUser._id
  }, _config.default.SECRET, {
    expiresIn: 86400 // 24 horas

  });

  res.status(200).json({
    username,
    token
  });
};

exports.signUp = signUp;

const logIn = async (req, res) => {
  //request body email or username
  const userFound = await _user.default.findOne({
    email: req.body.email
  }).populate("roles");
  if (!userFound) return res.status(400).json({
    message: "User not found"
  });
  const matchPassword = await _user.default.comparePassword(req.body.password, userFound.password);
  if (!matchPassword) return res.status(401).json({
    token: null,
    message: "Invalid password"
  });

  const token = _jsonwebtoken.default.sign({
    id: userFound._id
  }, _config.default.SECRET, {
    expiresIn: 86400
  });

  res.json({
    token
  });
};

exports.logIn = logIn;