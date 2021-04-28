const { body, query, param, validationResult } = require('express-validator');

const getShoppingCartRules = () => {
    return [
        param('shoppingCartId').isNumeric()
    ];
};

const listShoppingCartRules = () => {
    return [
        query('offset').isInt().toInt().optional(),
        query('limit').isInt().toInt().optional()
    ];
};

const addShoppingCartProductRules = () => {
    return [
        param('shoppingCartId').isNumeric(),
        body('userId').isNumeric(),
        body('productId').isNumeric(), 
        body('quantity').isInt().toInt(), 
        body('price').isInt().toInt()       
    ];
};

const removeShoppingCartProductRules = () => {
    return [
        param('shoppingCartId').isNumeric(),
        param('productId').isNumeric()
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => {extractedErrors.push(err);});

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    getShoppingCartRules,
    listShoppingCartRules,
    addShoppingCartProductRules,
    removeShoppingCartProductRules,
    validate,
};