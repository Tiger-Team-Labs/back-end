"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const roleSchema = new _mongoose.Schema({
  name: String
});

var _default = (0, _mongoose.model)('Role', roleSchema);

exports.default = _default;