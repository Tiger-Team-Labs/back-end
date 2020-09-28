"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const categorySchema = new _mongoose.Schema({
  name: String
});

var _default = (0, _mongoose.model)('Category', categorySchema);

exports.default = _default;