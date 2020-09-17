"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;

var _post = _interopRequireDefault(require("../models/post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createPost = async (req, res) => {
  const {
    title,
    content,
    author,
    status,
    category
  } = req.body;
  const newPost = new _post.default({
    title,
    content,
    author,
    status,
    category
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
};

exports.deletePostById = deletePostById;