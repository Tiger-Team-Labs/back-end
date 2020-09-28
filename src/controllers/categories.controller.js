import Category from '../models/category'

export const createCategory = async (req, res) => {

    const {name} = req.body

    const newCategory = new Category({name});

    const categorySaved = await newCategory.save()

    res.status(201).json(categorySaved)
}

export const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories)
}

export const getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category)
}

export const updateCategoryById = async (req, res) => {
    const updateCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {
        new: true
    })
    res.status(200).json(updateCategory)
}

export const deleteCategoryById = async (req, res) => {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(204).json()
}