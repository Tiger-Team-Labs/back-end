"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var postsCtrl = _interopRequireWildcard(require("../controllers/posts.controller"));

var _middlewares = require("../middlewares");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const router = (0, _express.Router)();
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isUser], postsCtrl.createPost);
router.get('/', postsCtrl.getPosts);
router.get('/:postId', postsCtrl.getPostById);
router.put('/:postId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isUser], postsCtrl.updatePostById);
router.delete('/:postId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isUser], postsCtrl.deletePostById);
router.post('/:postId/comment', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isUser], postsCtrl.createComment);
router.get('/:postId/comment', postsCtrl.readComment);
router.put('/comment/:commentId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isUser], postsCtrl.updateCommentById);
router.delete('/comment/:commentId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isUser], postsCtrl.deleteCommentById);
var _default = router;
exports.default = _default;