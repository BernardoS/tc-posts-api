const mongoose = require('mongoose');

const dbconfig = {
    url: 'mongodb://mongo:27017/blog' // Atualize a URL conforme necessário
};

mongoose.connect(dbconfig.url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;