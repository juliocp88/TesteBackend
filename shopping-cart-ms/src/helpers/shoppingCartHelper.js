const dbAccess = require('../services/shoppingCartDatabase/queries');

const getShoppingCart = async (shoppingCartId) => {
    
    const [shoppingCart] = await dbAccess.getShoppingCart(shoppingCartId);

    if (shoppingCart){
        shoppingCart.products = [];
        shoppingCart.products = await dbAccess.getShoppingCartProducts(shoppingCartId);
    }else{
        console.log(`getShoppingCart: shoppingCartId ${shoppingCartId} not found`);
        const error = new Error(`Shopping Cart with Id ${shoppingCartId} not found`);
        error.httpStatusCode = 404;
        throw error;
    }
    return shoppingCart;
};

const addShoppingCartProduct = async (shoppingCartId, userId, productId = '', quantity, price) => {

    let totalPrice = 0;
    let totalQuantity = 0;
    let product = undefined; 
    let products = [];
    const actualProducts = await dbAccess.getShoppingCartProducts(shoppingCartId);
    actualProducts.forEach(element => {
        if (element.productId === productId){
            element.quantity = element.quantity + quantity;
            product = element;
        }
        totalPrice = totalPrice + element.quantity * element.price; 
        totalQuantity = totalQuantity + element.quantity;
    });

    products = [...actualProducts];
    if(!product){
        products.push({ productId, shoppingCartId, quantity, price });
        totalPrice = totalPrice + quantity * price; 
        totalQuantity = totalQuantity + quantity;
    }

    await dbAccess.createOrUpdateShoppingCart(shoppingCartId, userId, totalPrice, totalQuantity);
    await dbAccess.createOrUpdateShoppingCartProduct(shoppingCartId, productId, quantity, price);

    return { shoppingCartId, userId, totalPrice, totalQuantity, products };
};

const removeShoppingCartProduct = async (shoppingCartId, productId) => {

    let totalPrice = 0;
    let totalQuantity = 0;
    const shoppingCart = await getShoppingCart(shoppingCartId);
    shoppingCart.products.forEach(function(element, index, object)  {
        if (element.productId === productId){
            object.splice(index, 1);
        }else{
            totalPrice = totalPrice + element.quantity * element.price; 
            totalQuantity = totalQuantity + element.quantity;
        }
    });

    await dbAccess.createOrUpdateShoppingCart(shoppingCartId, shoppingCart.userId, totalPrice, totalQuantity);
    await dbAccess.removeShoppingCartProduct(shoppingCartId, productId);

    return shoppingCart;
};

module.exports = {
    getShoppingCart,
    addShoppingCartProduct,
    removeShoppingCartProduct
};