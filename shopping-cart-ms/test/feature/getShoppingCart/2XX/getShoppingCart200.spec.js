const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /GET /api/shoppingCart/:shoppingCartId 200', () => {

    context('when retrieving a shoppingCart list with elements', () => {
        let shoppingCartId;

        beforeEach(async () => {
            await request().post('/api/shoppingCart/1/products').send({ userId: '111', productId: '01', quantity: 3, price: 12 }).expect(201);
            await request().post('/api/shoppingCart/2/products').send({ userId: '121', productId: '02', quantity: 2, price: 2 }).expect(201);
            await request().post('/api/shoppingCart/3/products').send({ userId: '131', productId: '03', quantity: 1, price: 124 }).expect(201);
        });

        it('when geting an existing element', async () => {
            shoppingCartId = '1';
            const { body } = await request()
                .get(`/api/shoppingCart/${shoppingCartId}`)
                .expect(200);

            //BODY
            expect(body).to.be.deep.equal({
                shoppingCartId: '1',
                userId: '111',
                totalPrice: 36,
                totalQuantity: 3,
                products: [ { shoppingCartId: '1', productId: '01', quantity: 3, price: 12 } ]
            });

        });

    });
});
