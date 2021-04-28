const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /GET /api/shoppingCart/:shoppingCartId 422', () => {

    context('when retrieving a shoppingCart list with elements', () => {
        let shoppingCartId;

        it('when shoppingCartId is wrong type', async () => {
            shoppingCartId = 'a';
            const { body } = await request()
                .get(`/api/shoppingCart/${shoppingCartId}`)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'shoppingCartId', location: 'params', value: shoppingCartId } ]);
        });

    });
});
