const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - permission
 *         - name
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         permission:
 *           type: string
 *       example:
 *         email: "E-mail do usúário"
 *         name: "Nome do usúário"
 *         permission: "Permissão do usuário"
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validação simples de e-mail
        },
        message: (props) => `${props.value} não é um e-mail válido!`,
      },
    },
    name: {
      type: String,
      required: true
    },
    permission: {
      type: String,
      required: true,
      enum: ["professor", "student", "blocked"],
      default: "blocked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", postSchema);
