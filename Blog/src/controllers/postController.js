const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
};

exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
};

exports.updatePost = async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
};

exports.searchPosts = async (req, res) => {
    const keyword = req.query.q;
    const posts = await Post.find({ $or: [{ title: new RegExp(keyword, 'i') }, { content: new RegExp(keyword, 'i') }] });
    res.json(posts);
};