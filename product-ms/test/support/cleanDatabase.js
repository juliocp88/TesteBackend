

const mongoose = require('mongoose');
const productSchema = require('../../src/services/productDatabase/productSchema');

mongoose.connect(process.env.DB_PATH, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const cleanDatabase = async () => {
    await productSchema.deleteMany({});
};

module.exports = cleanDatabase;
