"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const postSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  status: {
    type: Boolean
  },
  category: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Post', postSchema);

exports.default = _default;