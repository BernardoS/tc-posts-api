const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         author:
 *           type: string
 *         createDate:
 *           type: date
 *         modifyDate:
 *           type: date
 *       example:
 *         title: "Exemplo de Post"
 *         content: "Conteúdo do post"
 *         author: "Autor do post"
 */
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createDate: { type: Date, required: false },
    modifyDate: { type: Date, default: Date.now  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);