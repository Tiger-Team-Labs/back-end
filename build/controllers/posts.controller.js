"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCommentById = exports.updateCommentById = exports.readComment = exports.createComment = exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;

var _post = _interopRequireDefault(require("../models/post"));

var _comment = _interopRequireDefault(require("../models/comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createPost = async (req, res) => {
  const {
    title,
    content,
    author,
    status,
    categories
  } = req.body;
  const newPost = new _post.default({
    title,
    content,
    author: req.userId,
    status,
    categories
  });
  const postSaved = await newPost.save();
  res.status(201).json(postSaved);
};

exports.createPost = createPost;

const getPosts = async (req, res) => {
  const posts = await _post.default.find();
  res.json(posts);
};

exports.getPosts = getPosts;

const getPostById = async (req, res) => {
  const post = await _post.default.findById(req.params.postId);
  res.status(200).json(post);
};

exports.getPostById = getPostById;

const updatePostById = async (req, res) => {
  const updatedPost = await _post.default.findByIdAndUpdate(req.params.postId, req.body, {
    new: true
  });
  res.status(200).json(updatedPost);
};

exports.updatePostById = updatePostById;

const deletePostById = async (req, res) => {
  await _post.default.findByIdAndDelete(req.params.postId);
  res.status(204).json();
}; // Creat comment


exports.deletePostById = deletePostById;

const createComment = async (req, res) => {
  // Find post
  const post = await _post.default.findOne({
    _id: req.params.postId
  }); //Create a comment

  const comment = new _comment.default();
  comment.content = req.body.content;
  comment.post = post._id;
  comment.author = req.userId;
  await comment.save(); // Associate post with comment

  post.comments.push(comment._id);
  await post.save();
  res.send(comment);
}; // Get comments in post


exports.createComment = createComment;

const readComment = async (req, res) => {
  const post = await _post.default.findOne({
    _id: req.params.postId
  }).populate("comments");
  res.send(post);
}; // Edit comment


exports.readComment = readComment;

const updateCommentById = async (req, res) => {
  const updatedComment = await _comment.default.findByIdAndUpdate({
    _id: req.params.commentId
  }, req.body, {
    new: true
  });
  res.status(200).json(updatedComment);
}; // Delete comment


exports.updateCommentById = updateCommentById;

const deleteCommentById = async (req, res) => {
  await _comment.default.findByIdAndDelete(req.params.commentId);
  res.send({
    message: "Comment Successfully Deleted"
  });
};

exports.deleteCommentById = deleteCommentById;