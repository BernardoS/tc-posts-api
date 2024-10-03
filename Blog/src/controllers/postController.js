const Post = require('..node/models/Post');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
}

exports.getPostById = async (req, res) => {
    const posts = await Post.findById(req.params.id);
    res.json(posts);
}

exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
}

exports.updatePost = async (req, res) => {
    const updatePost = await Post.findByIdAnUpdate(req.params.id, req.body, { new: true });
    res.json(updatePost);
}

exports.deletePost = async (req, res) => {
    await Post.findByIdAnDelete(req.params.id);
    res.json({ message: 'Post Deletado'});
}

exports.searchPosts = async (req, res)=> {
    const keyword = req.query.q;
    const posts = await Post.find({ $or: [{ title: new RegExp(keyword, 'i') }, { content: new RegExp(keyword, 'i' ) }] });
    res.json(posts);
};