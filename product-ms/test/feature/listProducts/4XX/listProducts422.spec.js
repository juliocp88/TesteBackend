const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: PRODUCT :: /GET /api/product 200', () => {

    context('when retrieving a product list with elements', () => {
        let offset, limit;

        it('when sending limit with wrong type', async () => {
            limit = 'a';
            const { body } = await request()
                .get('/api/product')
                .query({limit})
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'limit', location: 'query', value: limit } ]);

        });

        it('when sending offset with wrong type', async () => {
            offset = 'a';
            const { body } = await request()
                .get('/api/product')
                .query({offset})
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'offset', location: 'query', value: limit } ]);

        });
    });

});
