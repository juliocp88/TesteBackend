const { body, query, validationResult } = require('express-validator');

const listProductsRules = () => {
    return [
        query('offset').isInt().toInt().optional(),
        query('limit').isInt().toInt().optional()
    ];
};

const createProductRules = () => {
    return [
        body('productId').isNumeric(), 
        body('price').isNumeric()       
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
    listProductsRules, 
    createProductRules,
    validate,
};