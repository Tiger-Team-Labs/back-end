"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;

var _post = _interopRequireDefault(require("../models/post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createPost = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      title,
      content,
      author,
      status,
      category
    } = req.body;
    var newPost = new _post.default({
      title,
      content,
      author,
      status,
      category
    });
    var productSaved = yield newPost.save();
    res.status(201).json(productSaved);
  });

  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPost = createPost;

var getPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var posts = yield _post.default.find();
    res.json(posts);
  });

  return function getPosts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPosts = getPosts;

var getPostById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var post = yield _post.default.findById(req.params.postId);
    res.status(200).json(post);
  });

  return function getPostById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPostById = getPostById;

var updatePostById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updatedPost = yield _post.default.findByIdAndUpdate(req.params.postId, req.body, {
      new: true
    });
    res.status(200).json(updatedPost);
  });

  return function updatePostById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updatePostById = updatePostById;

var deletePostById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    yield _post.default.findByIdAndDelete(req.params.postId);
    res.status(204).json();
  });

  return function deletePostById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deletePostById = deletePostById;