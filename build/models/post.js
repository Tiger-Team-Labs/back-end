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
    ref: "User",
    type: _mongoose.Schema.ObjectId,
    required: true
  },
  status: {
    type: Boolean
  },
  categories: {
    ref: "Category",
    type: _mongoose.Schema.Types.ObjectId
  },
  comments: [{
    ref: "Comment",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Post', postSchema);

exports.default = _default;