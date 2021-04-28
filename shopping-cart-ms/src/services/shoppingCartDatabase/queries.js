const dbAccess = require('./dbAccess');

const listShoppingCart = async (offset = 0, limit = 10) => {
    const query = `SELECT * 
                    FROM shopping_cart 
                    ORDER BY id
                    LIMIT $1 OFFSET $2; `;
    const params = [limit, offset];
    return await dbAccess.executeQuery(query, params);
};

const getShoppingCart = async (shoppingCartId) => {
    const query = `SELECT 
                        cart_id as "shoppingCartId",
                        user_identifier as "userId",
                        total_price as "totalPrice",
                        total_quantity as "totalQuantity" 
                    FROM shopping_cart
                    WHERE cart_id = $1; `;
    const params = [shoppingCartId];
    return await dbAccess.executeQuery(query, params);
};

const getShoppingCartProducts = async (shoppingCartId) => {
    const query = `SELECT 
                        cart_id as "shoppingCartId",
                        product_id as "productId",
                        quantity,
                        price
                    FROM cart_products
                    WHERE cart_id = $1; `;
    const params = [shoppingCartId];
    return await dbAccess.executeQuery(query, params);
};

const createOrUpdateShoppingCart = async (cartId, userId, totalPrice, totalQuantity) => {
    const query = `INSERT INTO shopping_cart (cart_id, user_identifier, total_price, total_quantity) 
                    VALUES($1, $2, $3, $4)
                    ON CONFLICT (cart_id) 
                    DO 
                        UPDATE SET total_price = $3, total_quantity = $4; `;
    const params = [cartId, userId, totalPrice, totalQuantity];
    return await dbAccess.executeQuery(query, params);
};

const createOrUpdateShoppingCartProduct = async (cartId, productId, quantity, price) => {
    const query = `INSERT INTO cart_products (cart_id, product_id, quantity, price) 
                    VALUES($1, $2, $3, $4)
                    ON CONFLICT (cart_id, product_id) 
                    DO 
                        UPDATE SET quantity = $3; `;
    const params = [cartId, productId, quantity, price];
    return await dbAccess.executeQuery(query, params);
};

const removeShoppingCartProduct = async (cartId, productId) => {
    const query = `DELETE FROM cart_products 
                    WHERE cart_id = $1 AND product_id = $2; `;
    const params = [cartId, productId];
    return await dbAccess.executeQuery(query, params);
};

module.exports = {
    listShoppingCart,
    getShoppingCart,
    getShoppingCartProducts,
    createOrUpdateShoppingCart,
    createOrUpdateShoppingCartProduct,
    removeShoppingCartProduct
};