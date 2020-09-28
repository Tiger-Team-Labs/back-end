"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCategoryById = exports.updateCategoryById = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;

var _category = _interopRequireDefault(require("../models/category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createCategory = async (req, res) => {
  const {
    name
  } = req.body;
  const newCategory = new _category.default({
    name
  });
  const categorySaved = await newCategory.save();
  res.status(201).json(categorySaved);
};

exports.createCategory = createCategory;

const getCategories = async (req, res) => {
  const categories = await _category.default.find();
  res.json(categories);
};

exports.getCategories = getCategories;

const getCategoryById = async (req, res) => {
  const category = await _category.default.findById(req.params.categoryId);
  res.status(200).json(category);
};

exports.getCategoryById = getCategoryById;

const updateCategoryById = async (req, res) => {
  const updateCategory = await _category.default.findByIdAndUpdate(req.params.categoryId, req.body, {
    new: true
  });
  res.status(200).json(updateCategory);
};

exports.updateCategoryById = updateCategoryById;

const deleteCategoryById = async (req, res) => {
  await _category.default.findByIdAndDelete(req.params.categoryId);
  res.status(204).json();
};

exports.deleteCategoryById = deleteCategoryById;