const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { listProductsRules, createProductRules, validate } = require('./helpers/validator');

const router = express.Router();
const app = express();

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
});

const productController = require('./controllers/productController');
router.get('/product', listProductsRules(), validate, productController.listProducts);
router.post('/product', createProductRules(), validate, productController.createProduct);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(compression());
app.set('port', port);

module.exports = app;