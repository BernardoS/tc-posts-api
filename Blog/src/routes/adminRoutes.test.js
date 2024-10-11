const request = require('supertest');
const express = require('express');
const adminRoutes = require('./adminRoutes');
const postController = require('../controllers/postController');

const app = express();
app.use(express.json());
app.use('/admin/posts', adminRoutes);

jest.mock('../controllers/postController');

describe('Admin Routes', () => {
    it('should create a new post', async () => {
        postController.createPost.mockImplementation((req, res) => res.json(req.body));
        const response = await request(app).post('/admin/posts').send({ title: 'New Post', content: 'Content', author: 'Author' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ title: 'New Post', content: 'Content', author: 'Author' });
    });

    it('should update a post', async () => {
        postController.updatePost.mockImplementation((req, res) => res.json(req.body));
        const response = await request(app).put('/admin/posts/1').send({ title: 'Updated Post' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ title: 'Updated Post' });
    });

    it('should delete a post', async () => {
        postController.deletePost.mockImplementation((req, res) => res.json({ message: 'Post deleted' }));
        const response = await request(app).delete('/admin/posts/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Post deleted' });
    });

    it('should search posts', async () => {
        postController.searchPosts.mockImplementation((req, res) => res.json([{ title: 'Test Post' }]));
        const response = await request(app).get('/admin/posts/search?q=Test');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: 'Test Post' }]);
    });
});