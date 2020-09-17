"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;

var _post = _interopRequireDefault(require("../models/post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createPost = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, title, content, author, status, category, newPost, productSaved;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, content = _req$body.content, author = _req$body.author, status = _req$body.status, category = _req$body.category;
            newPost = new _post["default"]({
              title: title,
              content: content,
              author: author,
              status: status,
              category: category
            });
            _context.next = 4;
            return newPost.save();

          case 4:
            productSaved = _context.sent;
            res.status(201).json(productSaved);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPost = createPost;

var getPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var posts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _post["default"].find();

          case 2:
            posts = _context2.sent;
            res.json(posts);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getPosts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPosts = getPosts;

var getPostById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var post;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _post["default"].findById(req.params.postId);

          case 2:
            post = _context3.sent;
            res.status(200).json(post);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getPostById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPostById = getPostById;

var updatePostById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedPost;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _post["default"].findByIdAndUpdate(req.params.postId, req.body, {
              "new": true
            });

          case 2:
            updatedPost = _context4.sent;
            res.status(200).json(updatedPost);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updatePostById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updatePostById = updatePostById;

var deletePostById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _post["default"].findByIdAndDelete(req.params.postId);

          case 2:
            res.status(204).json();

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deletePostById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deletePostById = deletePostById;