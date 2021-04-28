const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /POST /shoppingCart/:shoppingCartId/products 201', () => {

    context('when creating a product', () => {
        let newShoppingCartProduct, shoppingCartId;

        it('create a shoppingCart with string shoppingCartId', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '11',
                productId: '01', 
                quantity: 2,
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(201);

            //BODY
            expect(body).to.be.deep.equal({
                shoppingCartId: '4',
                userId: '11',
                totalPrice: 24,
                totalQuantity: 2,
                products: [ { productId: '01', shoppingCartId: '4', quantity: 2, price: 12 } ]
            });
        });

        it('create a shoppingCart with integer shoppingCartId', async () => {
            shoppingCartId = 5;
            newShoppingCartProduct = {
                userId: '11',
                productId: '01', 
                quantity: 2,
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(201);

            //BODY
            expect(body).to.be.deep.equal({
                shoppingCartId: '5',
                userId: '11',
                totalPrice: 24,
                totalQuantity: 2,
                products: [ { productId: '01', shoppingCartId: '5', quantity: 2, price: 12 } ]
            });
        });

        it('create a shoppingCart with string quantity and price', async () => {
            shoppingCartId = 5;
            newShoppingCartProduct = {
                userId: '11',
                productId: '01', 
                quantity: '2',
                price: '12'
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(201);

            //BODY
            expect(body).to.be.deep.equal({
                shoppingCartId: '5',
                userId: '11',
                totalPrice: 24,
                totalQuantity: 2,
                products: [ { productId: '01', shoppingCartId: '5', quantity: 2, price: 12 } ]
            });
        });

    });
});
