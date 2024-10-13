# Blog API

API para gerenciamento de posts de blog.

## Estrutura do Projeto


## Pré-requisitos

- [Node.js](https://nodejs.org/) v14.x ou superior
- [Docker](https://www.docker.com/get-started)

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/blog-api.git
    cd blog-api
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## Configuração do Banco de Dados

O projeto está configurado para usar o MongoDB. Certifique-se de que o MongoDB está em execução e acessível na URL configurada em `src/config/db.js`.

## Executando o Projeto

### Usando Docker

1. Construa e inicie os serviços usando Docker Compose:
    ```sh
    docker-compose up --build
    ```

2. Acesse a aplicação em `http://localhost:3000`.

### Usando Node.js

1. Inicie o servidor:
    ```sh
    npm start
    ```

2. Acesse a aplicação em `http://localhost:3000`.

## Testes

Para rodar os testes, use o comando:
```sh
npm test

```

## Documentação da API

A documentação da API é gerada usando Swagger. Para acessar a documentação, inicie o servidor e acesse http://localhost:3000/api-docs.

Estrutura dos Endpoints

1. Rotas Públicas
```sh
GET /posts: Retorna todos os posts
GET /posts/{id}: Retorna um post pelo ID
```

2. Rotas de Administração
```sh
POST /admin/posts: Cria um novo post
PUT /admin/posts/{id}: Atualiza um post existente
DELETE /admin/posts/{id}: Deleta um post
GET /admin/posts/search: Busca posts por título
```

Este arquivo `README.md` fornece uma visão geral do projeto, incluindo a estrutura do projeto, instruções de instalação, configuração do banco de dados, execução do projeto, testes, documentação da API, estrutura dos endpoints, contribuição e licença.