const dbAccess = require('../../src/services/shoppingCartDatabase/dbAccess');

const cleanDatabase = async () => {
    let query = 'DELETE FROM shopping_cart ';
    await dbAccess.executeQuery(query);
    query = 'DELETE FROM cart_products ';
    await dbAccess.executeQuery(query);
};

module.exports = cleanDatabase;
