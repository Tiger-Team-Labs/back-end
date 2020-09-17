import Post from '../models/post'

export const createPost = async (req, res) => {
    
    const {title, content, author, status, category} = req.body

    const newPost = new Post({title, content, author, status, category});

    const productSaved = await newPost.save()

    res.status(201).json(productSaved)
}

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts)
}

export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post)
    
}

export const updatePostById = async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
        new: true 
    })
    res.status(200).json(updatedPost)
}

export const deletePostById = async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId)
    res.status(204).json()
}