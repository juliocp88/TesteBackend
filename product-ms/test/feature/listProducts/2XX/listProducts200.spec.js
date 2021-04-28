const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: PRODUCT :: /GET /api/product 200', () => {

    context('when retrieving a product list with elements', () => {
        let offset, limit;

        beforeEach(async () => {
            await request().post('/api/product').send({ productId: '01', price: 12 }).expect(201);
            await request().post('/api/product').send({ productId: '02', price: 122 }).expect(201);
            await request().post('/api/product').send({ productId: '03', price: 124 }).expect(201);
        });

        it('when not sending limit and offset', async () => {

            const { body } = await request()
                .get('/api/product')
                .expect(200);

            //BODY
            expect(body.total).to.be.equal(3);
            expect(body.limit).to.be.equal(10);
            expect(body.offset).to.be.equal(0);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(3);
            expect(body.docs[0]).to.have.nested.property('_id');
            expect(body.docs[0].productId).to.be.equal('01');
            expect(body.docs[0].price).to.be.equal(12);
            expect(body.docs[1]).to.have.nested.property('_id');
            expect(body.docs[1].productId).to.be.equal('02');
            expect(body.docs[1].price).to.be.equal(122);
            expect(body.docs[2]).to.have.nested.property('_id');
            expect(body.docs[2].productId).to.be.equal('03');
            expect(body.docs[2].price).to.be.equal(124);

        });

        it('when sending offset', async () => {
            offset = 1;
            const { body } = await request()
                .get('/api/product')
                .query({offset})
                .expect(200);

            //BODY
            expect(body.total).to.be.equal(3);
            expect(body.limit).to.be.equal(10);
            expect(body.offset).to.be.equal(1);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(2);
            expect(body.docs[0]).to.have.nested.property('_id');
            expect(body.docs[0].productId).to.be.equal('02');
            expect(body.docs[0].price).to.be.equal(122);
            expect(body.docs[1]).to.have.nested.property('_id');
            expect(body.docs[1].productId).to.be.equal('03');
            expect(body.docs[1].price).to.be.equal(124);

        });

        it('when sending limit ', async () => {
            limit = 2;
            const { body } = await request()
                .get('/api/product')
                .query({limit})
                .expect(200);

            //BODY
            expect(body.total).to.be.equal(3);
            expect(body.limit).to.be.equal(2);
            expect(body.offset).to.be.equal(0);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(2);
            expect(body.docs[0]).to.have.nested.property('_id');
            expect(body.docs[0].productId).to.be.equal('01');
            expect(body.docs[0].price).to.be.equal(12);
            expect(body.docs[1]).to.have.nested.property('_id');
            expect(body.docs[1].productId).to.be.equal('02');
            expect(body.docs[1].price).to.be.equal(122);

        });

        it('when sending limit and offset', async () => {
            limit = 1;
            offset = 1;
            const { body } = await request()
                .get('/api/product')
                .query({limit, offset})
                .expect(200);

            //BODY
            expect(body.total).to.be.equal(3);
            expect(body.limit).to.be.equal(1);
            expect(body.offset).to.be.equal(1);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(1);
            expect(body.docs[0]).to.have.nested.property('_id');
            expect(body.docs[0].productId).to.be.equal('02');
            expect(body.docs[0].price).to.be.equal(122);

        });

    });

    context('when retrieving a product list with no elements', () => {
        
        it('when not sending limit and offset', async () => {

            const { body } = await request()
                .get('/api/product')
                .expect(200);

            //BODY
            expect(body.total).to.be.equal(0);
            expect(body.limit).to.be.equal(10);
            expect(body.offset).to.be.equal(0);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(0);
        });

    });
});
