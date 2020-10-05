"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const commentSchema = new _mongoose.Schema({
  author: {
    ref: "User",
    type: _mongoose.Schema.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  post: {
    ref: "Post",
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Comment', commentSchema);

exports.default = _default;