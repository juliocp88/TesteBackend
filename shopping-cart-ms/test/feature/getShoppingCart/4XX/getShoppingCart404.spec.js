const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /GET /api/shoppingCart/:shoppingCartId 422', () => {

    context('when retrieving a shoppingCart list with elements', () => {
        let shoppingCartId;

        it('when shoppingCartId is wrong type', async () => {
            shoppingCartId = '1';
            const { body } = await request()
                .get(`/api/shoppingCart/${shoppingCartId}`)
                .expect(404);

            //BODY
            expect(body).to.be.deep.equal({ error: { code: 404, message: 'Shopping Cart with Id 1 not found' } });
        });

    });
});
