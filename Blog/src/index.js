const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db'); 
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});