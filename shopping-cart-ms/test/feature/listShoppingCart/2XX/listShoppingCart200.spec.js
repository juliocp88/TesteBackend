const { expect } = require('chai');
const request = require('../../../support/request');

describe('API :: SHOPPINGCART :: /GET /api/shoppingCart 200', () => {

    context('when retrieving a shoppingCart list with elements', () => {
        let offset, limit;

        beforeEach(async () => {
            await request().post('/api/shoppingCart/1/products').send({ userId: '111', productId: '01', quantity: 3, price: 12 }).expect(201);
            await request().post('/api/shoppingCart/2/products').send({ userId: '121', productId: '02', quantity: 2, price: 2 }).expect(201);
            await request().post('/api/shoppingCart/3/products').send({ userId: '131', productId: '03', quantity: 1, price: 124 }).expect(201);
        });

        it('when not sending limit and offset', async () => {

            const { body } = await request()
                .get('/api/shoppingCart')
                .expect(200);

            //BODY
            expect(body.limit).to.be.equal(10);
            expect(body.offset).to.be.equal(0);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(3);
            expect(body.docs[0]).to.have.nested.property('id');
            expect(body.docs[0].cart_id).to.be.equal('1');
            expect(body.docs[0].user_identifier).to.be.equal('111');
            expect(body.docs[0].total_price).to.be.equal(36);
            expect(body.docs[0].total_quantity).to.be.equal(3);
            expect(body.docs[1]).to.have.nested.property('id');
            expect(body.docs[1].cart_id).to.be.equal('2');
            expect(body.docs[1].user_identifier).to.be.equal('121');
            expect(body.docs[1].total_price).to.be.equal(4);
            expect(body.docs[1].total_quantity).to.be.equal(2);
            expect(body.docs[2]).to.have.nested.property('id');
            expect(body.docs[2].cart_id).to.be.equal('3');
            expect(body.docs[2].user_identifier).to.be.equal('131');
            expect(body.docs[2].total_price).to.be.equal(124);
            expect(body.docs[2].total_quantity).to.be.equal(1);

        });

        it('when sending offset', async () => {
            offset = 1;
            const { body } = await request()
                .get('/api/shoppingCart')
                .query({offset})
                .expect(200);

            //BODY
            expect(body.limit).to.be.equal(10);
            expect(body.offset).to.be.equal(1);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(2);
            expect(body.docs[0]).to.have.nested.property('id');
            expect(body.docs[0].cart_id).to.be.equal('2');
            expect(body.docs[0].user_identifier).to.be.equal('121');
            expect(body.docs[0].total_price).to.be.equal(4);
            expect(body.docs[0].total_quantity).to.be.equal(2);
            expect(body.docs[1]).to.have.nested.property('id');
            expect(body.docs[1].cart_id).to.be.equal('3');
            expect(body.docs[1].user_identifier).to.be.equal('131');
            expect(body.docs[1].total_price).to.be.equal(124);
            expect(body.docs[1].total_quantity).to.be.equal(1);

        });

        it('when sending limit ', async () => {
            limit = 2;
            const { body } = await request()
                .get('/api/shoppingCart')
                .query({limit})
                .expect(200);

            //BODY
            expect(body.limit).to.be.equal(2);
            expect(body.offset).to.be.equal(0);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(2);
            expect(body.docs[0]).to.have.nested.property('id');
            expect(body.docs[0].cart_id).to.be.equal('1');
            expect(body.docs[0].user_identifier).to.be.equal('111');
            expect(body.docs[0].total_price).to.be.equal(36);
            expect(body.docs[0].total_quantity).to.be.equal(3);
            expect(body.docs[1]).to.have.nested.property('id');
            expect(body.docs[1].cart_id).to.be.equal('2');
            expect(body.docs[1].user_identifier).to.be.equal('121');
            expect(body.docs[1].total_price).to.be.equal(4);
            expect(body.docs[1].total_quantity).to.be.equal(2);

        });

        it('when sending limit and offset', async () => {
            limit = 1;
            offset = 1;
            const { body } = await request()
                .get('/api/shoppingCart')
                .query({limit, offset})
                .expect(200);

            //BODY
            expect(body.limit).to.be.equal(1);
            expect(body.offset).to.be.equal(1);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(1);
            expect(body.docs[0]).to.have.nested.property('id');
            expect(body.docs[0].cart_id).to.be.equal('2');
            expect(body.docs[0].user_identifier).to.be.equal('121');
            expect(body.docs[0].total_price).to.be.equal(4);
            expect(body.docs[0].total_quantity).to.be.equal(2);
        });

    });

    context('when retrieving a shoppingCart list with no elements', () => {
        
        it('when not sending limit and offset', async () => {

            const { body } = await request()
                .get('/api/shoppingCart')
                .expect(200);

            //BODY
            expect(body.limit).to.be.equal(10);
            expect(body.offset).to.be.equal(0);
            expect(body.docs).to.be.an.instanceOf(Array);
            expect(body.docs.length).to.be.equal(0);
        });

    });
});
