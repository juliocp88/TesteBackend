const shoppingCartHelper = require('../helpers/shoppingCartHelper');
const dbAccess = require('../services/shoppingCartDatabase/queries');
const responseHelper = require('../helpers/responseHelper');

const listShoppingCart = async (req, res) => {
    try {
        console.log('listShoppingCart: start');

        const { offset = 0, limit = 10 } = req.query || {};
        console.log('listShoppingCart', `offset ${offset} limit ${limit}`);

        const shoppingCarts = await dbAccess.listShoppingCart(offset, limit);

        console.log('listShoppingCart: finish');
        return responseHelper.returnSucess(res, { docs: shoppingCarts, offset, limit });
    } catch (error) {
        console.log('listShoppingCart: error', error);
        return responseHelper.returnError(res, error);
    }
};

const getShoppingCart = async (req, res) => {
    try {
        console.log('getShoppingCart: start');

        const { shoppingCartId } = req.params || {};
        console.log('getShoppingCart', `shoppingCartId ${shoppingCartId}`);

        const shoppingCart = await shoppingCartHelper.getShoppingCart(shoppingCartId);

        console.log('getShoppingCart: finish');
        return responseHelper.returnSucess(res, shoppingCart);
    } catch (error) {
        console.log('getShoppingCart: error', error);
        return responseHelper.returnError(res, error);
    }
};

const addShoppingCartProduct = async (req, res) => {
    try {
        console.log('addShoppingCartProduct: start');

        const { shoppingCartId } = req.params || {};
        const { userId, 
            productId, 
            quantity, 
            price 
        } = req.body || {};
        console.log(`addShoppingCartProduct: shoppingCartId: ${shoppingCartId} userId: ${userId} productId: ${productId} quantity: ${quantity} price: ${price} `);

        const shoppingCart = await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);
        
        console.log('addShoppingCartProduct: finish');
        return responseHelper.returnSucess(res, shoppingCart, 201);
    } catch (error) {
        console.log('addShoppingCartProduct: error', error);
        return responseHelper.returnError(res, error);
    }
};

const removeShoppingCartProduct = async (req, res) => {
    try {
        console.log('removeShoppingCartProduct: start');

        const { shoppingCartId, productId } = req.params || {};
        console.log(`removeShoppingCartProduct: shoppingCartId: ${shoppingCartId} productId: ${productId} `);

        const shoppingCart = await shoppingCartHelper.removeShoppingCartProduct(shoppingCartId, productId);

        console.log('removeShoppingCartProduct: finish');
        return responseHelper.returnSucess(res, shoppingCart);
    } catch (error) {
        console.log('removeShoppingCartProduct: error', error);
        return responseHelper.returnError(res, error);
    }
};

module.exports = {
    listShoppingCart,
    getShoppingCart,
    addShoppingCartProduct,
    removeShoppingCartProduct
};