const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /POST /api/shoppingCart/:shoppingCartId/products 422', () => {

    context('when creating a product with invalid body fields', () => {
        let shoppingCartId, newShoppingCartProduct;

        it('when userId is not present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                productId: '01', 
                quantity: 2,
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'userId', location: 'body' } ]);
        });

        it('when productId is not present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '1',
                quantity: 2,
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'productId', location: 'body' } ]);
        });

        it('when quantity is not present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '1',
                productId: '01', 
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'quantity', location: 'body' } ]);
        });

        it('when price is not present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '1',
                productId: '01', 
                quantity: 2
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'price', location: 'body' } ]);
        });

        it('when body is empty', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ 
                { msg: 'Invalid value', param: 'userId', location: 'body' },
                { msg: 'Invalid value', param: 'productId', location: 'body' },
                { msg: 'Invalid value', param: 'quantity', location: 'body' },
                { msg: 'Invalid value', param: 'price', location: 'body' },
            ]);
        });

        it('when userId have wrong type present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: 'a',
                productId: '01', 
                quantity: 2,
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'userId', location: 'body', value: 'a' } ]);
        });

        it('when productId have wrong type present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '1',
                productId: 'a', 
                quantity: 2,
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'productId', location: 'body', value: 'a' } ]);
        });

        it('when quantity have wrong type present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '1',
                productId: '2', 
                quantity: 'a',
                price: 12
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'quantity', location: 'body', value: 'a' } ]);
        });

        it('when price have wrong type present', async () => {
            shoppingCartId = '4';
            newShoppingCartProduct = {
                userId: '1',
                productId: '2', 
                quantity: 1,
                price: 'a'
            };

            const { body } = await request()
                .post(`/api/shoppingCart/${shoppingCartId}/products`)
                .send(newShoppingCartProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'price', location: 'body', value: 'a' } ]);
        });

    });
});
