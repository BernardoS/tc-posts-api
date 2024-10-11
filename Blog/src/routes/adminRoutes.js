const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rotas de administração e gerenciamento de posts
 */

/**
 * @swagger
 * /admin/posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', postController.createPost);

/**
 * @swagger
 * /admin/posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put('/:id', postController.updatePost);

/**
 * @swagger
 * /admin/posts:
 *   get:
 *     summary: Retorna todos os posts
 *     tags: [Admin]
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
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /admin/posts/{id}:
 *   delete:
 *     summary: Deleta um post
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', postController.deletePost);

/**
 * @swagger
 * /admin/posts/search:
 *   get:
 *     summary: Busca posts por título
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de posts encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/search', postController.searchPosts);

module.exports = router;