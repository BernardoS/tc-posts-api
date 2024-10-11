const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'API para gerenciamento de posts de blog',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        tags: [
            {
                name: 'Public',
                description: 'Rotas públicas para visualização de posts',
            },
            {
                name: 'Admin',
                description: 'Rotas de administração e gerenciamento de posts',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};