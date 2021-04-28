
function selectProxyHost(req) {
    if (req.path.startsWith('/api/shoppingCart'))
        return process.env.SHOPPING_CART_MS_PATH;
    else if (req.path.startsWith('/api/product'))
        return process.env.PRODUCT_MS_PATH;
}

module.exports = selectProxyHost;