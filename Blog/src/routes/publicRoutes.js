const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

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

router.get('/user/', userController.getAllUsers);

router.get('/user/professor', userController.getAllProfessors);

router.get('/user/students', userController.getAllStudents);

router.post('/user', userController.createUser);

router.delete('/user/:id', userController.deleteUser);

router.delete('/user/mongo/:id', userController.deleteUserFromDb);


module.exports = router;