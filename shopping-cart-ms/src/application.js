const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { getShoppingCartRules, listShoppingCartRules, addShoppingCartProductRules, removeShoppingCartProductRules, validate } = require('./helpers/validator');

const router = express.Router();
const app = express();

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
});

const shoppingCartController = require('./controllers/shoppingCartController');
router.get('/shoppingCart',  listShoppingCartRules(), validate, shoppingCartController.listShoppingCart);
router.get('/shoppingCart/:shoppingCartId', getShoppingCartRules(), validate, shoppingCartController.getShoppingCart);
router.post('/shoppingCart/:shoppingCartId/products', addShoppingCartProductRules(), validate, shoppingCartController.addShoppingCartProduct);
router.delete('/shoppingCart/:shoppingCartId/products/:productId', removeShoppingCartProductRules(), validate, shoppingCartController.removeShoppingCartProduct);

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(compression());
app.set('port', port);

module.exports = app;