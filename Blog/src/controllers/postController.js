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

    const queryString = req.query.q;

    if(queryString != null && queryString != undefined && queryString != ""){

        const posts = await Post.find({
            $or: [
                { title: new RegExp(queryString, 'i') },
                { description: new RegExp(queryString, 'i') },
                { content: new RegExp(queryString, 'i') }
            ]
        });

        res.json(posts);

    }else{
        res.status(404).send('String de busca vazia! favor digitar o texto.');
    }
   
};