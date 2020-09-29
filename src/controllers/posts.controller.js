import Post from '../models/post'
import Comment from '../models/comment'

export const createPost = async (req, res) => {
    
    const {title, content, author, status, categories} = req.body

    const newPost = new Post({title, content, author: req.userId, status, categories});

    const postSaved = await newPost.save()

    res.status(201).json(postSaved)
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

// Creat comment
export const createComment = async (req, res) => {
    // Find post
    const post = await Post.findOne({ _id: req.params.postId });

  //Create a comment
  const comment = new Comment();
  comment.content = req.body.content;
  comment.post = post._id;
  comment.author = req.userId;
  await comment.save();

  // Associate post with comment
  post.comments.push(comment._id);
  await post.save();

  res.send(comment);
}

// Get comments in post
export const readComment = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
        "comments"
      );
      res.send(post);
}

// Edit comment
export const updateCommentById = async (req, res) => {
    const updatedComment = await Comment.findByIdAndUpdate({_id: req.params.commentId}, req.body, {
        new:true
    })
    res.status(200).json(updatedComment)
}

// Delete comment
export const deleteCommentById = async (req, res) => {
    await Comment.findByIdAndDelete(req.params.commentId)
    res.send({ message: "Comment Successfully Deleted" })
}