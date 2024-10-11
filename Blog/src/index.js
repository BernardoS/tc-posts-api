const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db'); 
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const swaggerConfig = require('./config/swagger'); // Adicione esta linha

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/posts', publicRoutes);
app.use('/admin/posts', adminRoutes);

swaggerConfig(app); // Adicione esta linha

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});