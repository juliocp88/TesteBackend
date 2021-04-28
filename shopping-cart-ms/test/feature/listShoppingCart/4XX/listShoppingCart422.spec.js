const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /GET /api/shoppingCart 422', () => {

    context('when retrieving a shoppingCart list with elements', () => {
        let offset, limit;

        it('when sending limit with wrong type', async () => {
            limit = 'a';
            const { body } = await request()
                .get('/api/shoppingCart')
                .query({limit})
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'limit', location: 'query', value: limit } ]);

        });

        it('when sending offset with wrong type', async () => {
            offset = 'a';
            const { body } = await request()
                .get('/api/shoppingCart')
                .query({offset})
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'offset', location: 'query', value: limit } ]);

        });
    });

});
