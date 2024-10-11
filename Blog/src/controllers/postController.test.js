const mongoose = require('mongoose');
const Post = require('../models/Post');
const postController = require('./postController');

jest.mock('../models/Post');

describe('Post Controller', () => {
    let req, res;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    }, 30000); 

    afterAll(async () => {
        await mongoose.connection.close();
    }, 30000); 

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn()
        };
    });

    it('should create a new post', async () => {
        req.body = { title: 'New Post', content: 'Content', author: 'Author' };
        Post.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(req.body)
        }));
        await postController.createPost(req, res);
        expect(res.json).toHaveBeenCalledWith(req.body);
    }, 10000); // Aumente o tempo limite para 10 segundos

    it('should get all posts', async () => {
        Post.find.mockResolvedValue([{ title: 'Test Post' }]);
        await postController.getAllPosts(req, res);
        expect(res.json).toHaveBeenCalledWith([{ title: 'Test Post' }]);
    });

    it('should get post by id', async () => {
        req.params = { id: '1' };
        Post.findById.mockResolvedValue({ title: 'Test Post' });
        await postController.getPostById(req, res);
        expect(res.json).toHaveBeenCalledWith({ title: 'Test Post' });
    });

    it('should update a post', async () => {
        req.params = { id: '1' };
        req.body = { title: 'Updated Post' };
        Post.findByIdAndUpdate.mockResolvedValue(req.body);
        await postController.updatePost(req, res);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should delete a post', async () => {
        req.params = { id: '1' };
        Post.findByIdAndDelete.mockResolvedValue({});
        await postController.deletePost(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted' });
    });

    it('should search posts', async () => {
        req.query = { q: 'Test' };
        Post.find.mockResolvedValue([{ title: 'Test Post' }]);
        await postController.searchPosts(req, res);
        expect(res.json).toHaveBeenCalledWith([{ title: 'Test Post' }]);
    });
});