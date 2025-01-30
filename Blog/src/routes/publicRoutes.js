const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Rotas públicas para visualização de posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna todos os posts
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/posts', postController.getAllPosts);


/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Retorna um post pelo ID
 *     tags: [Public]
 *     parameters:
 *       - in: body
 *         name: text
 *         schema:
 *           type: string
 *         required: true
 *         description: texto de busca
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get('/posts/search', postController.searchPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get('/posts/:id', postController.getPostById);


module.exports = router;