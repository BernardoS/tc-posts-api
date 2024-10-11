const request = require('supertest');
const express = require('express');
const publicRoutes = require('./publicRoutes');
const postController = require('../controllers/postController');

const app = express();
app.use(express.json());
app.use('/posts', publicRoutes);

jest.mock('../controllers/postController');

describe('Public Routes', () => {
    it('should get all posts', async () => {
        postController.getAllPosts.mockImplementation((req, res) => res.json([{ title: 'Test Post' }]));
        const response = await request(app).get('/posts');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: 'Test Post' }]);
    });

    it('should get post by id', async () => {
        postController.getPostById.mockImplementation((req, res) => res.json({ title: 'Test Post' }));
        const response = await request(app).get('/posts/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ title: 'Test Post' });
    });
});