const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Private
 *   description: Rotas de administração e gerenciamento de posts
 */

/**
 * @swagger
 * /private/posts:
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
router.post('/posts', authenticate, postController.createPost);

/**
 * @swagger
 * /private/posts/{id}:
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
router.put('/posts/:id', authenticate, postController.updatePost);

/**
 * @swagger
 * /private/posts/:
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
router.get('/posts', authenticate, postController.getAllPosts);

/**
 * @swagger
 * /private/posts/{id}:
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
router.delete('/posts/:id', authenticate, postController.deletePost);

/**
 * @swagger
 * /private/posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID
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
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get('/post/:id', authenticate, postController.getPostById);


/**
 * @swagger
 * /private/user/professors:
 *   get:
 *     summary: Retorna todos os professores
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de professores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/user/professors', authenticate, userController.getAllProfessors);

/**
 * @swagger
 * /private/user/students:
 *   get:
 *     summary: Retorna todos os estudantes
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de estudantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/user/students', authenticate, userController.getAllStudents);

/**
 * @swagger
 * /private/user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *               name:
 *                  type: string
 *               permission:
 *                  type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/user', authenticate ,userController.createUser);

/**
 * @swagger
 * /private/user/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/user/:id', authenticate ,userController.deleteUser);

/**
 * @swagger
 * /private/user/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/user/:id', authenticate, userController.getUserById);

/**
 * @swagger
 * /private/user/email/{email}}:
 *   get:
 *     summary: Retorna um usuário pelo email
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: email do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/user/email/:email', authenticate, userController.getUserByEmail);


/**
 * @swagger
 * /private/user/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permission:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/user/:id', authenticate, userController.updateUser);

//Rotas de teste

router.delete('/user/mongo/:id', userController.deleteUserFromDb);

router.get('/user/', userController.getAllUsers);

module.exports = router;