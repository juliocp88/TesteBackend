

const mongoose = require('mongoose');
const productSchema = require('./productSchema');

mongoose.connect(process.env.DB_PATH, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const insertProduct = async (productId, price) => {
    try {
        console.log(`insertProduct: productId: ${productId} price: ${price} `);
        return await productSchema.create({ productId, price });
    } catch (error) {
        if ( error && error.code === 11000 ) {
            error.httpStatusCode = 409;
            error.message = 'Product already exists';
        }
        throw error;
    }
};

const listProducts = async (offset = 0, limit = 10) => {
    console.log(`listProducts: offset: ${offset} limit: ${limit} `);
    return await productSchema.paginate({}, { offset, limit }, { versionKey: false });
};

module.exports = {
    insertProduct,
    listProducts
};