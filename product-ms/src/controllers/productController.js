const responseHelper = require('../helpers/responseHelper');
const dbAccess = require('../services/productDatabase/dbAccess');

const listProducts = async (req, res) => {
    try {
        console.log('listProducts: start');

        const { offset, limit } = req.query || {};
        const products = await dbAccess.listProducts(offset, limit);

        console.log('listProducts: finish');
        return responseHelper.returnSucess(res, products, 200);
    } catch (err) {
        console.log('listProducts error: ', err);
        return responseHelper.returnError(res, err);
    }
};

const createProduct = async (req, res) => {
    try {
        console.log('createProduct: start');
        
        const { productId, price } = req.body || {};
        const product = await dbAccess.insertProduct(productId, price);

        console.log('createProduct: finish');
        return responseHelper.returnSucess(res, product, 201);
    } catch (err) {
        console.log('createProduct error: ', err);
        return responseHelper.returnError(res, err);
    }
};

module.exports = {
    listProducts,
    createProduct
};