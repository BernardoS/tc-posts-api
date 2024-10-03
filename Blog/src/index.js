const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const abconfig = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(dbconfig.url, { useNewuriParser: true, useunifiedTopology: true });

app.use(bodyParser.json());
app.use('/posts', postRoutes);

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});