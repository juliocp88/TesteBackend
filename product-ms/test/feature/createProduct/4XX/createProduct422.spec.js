const { expect } = require('chai');
const request = require('../../../support/request');
const productSchema = require('../../../../src/services/productDatabase/productSchema');

describe('API :: PRODUCT :: /POST /api/product 422', () => {

    context('when creating a product with invalid body fields', () => {
        let newProduct;

        it('when productId is not present', async () => {
            newProduct = {
                price: 12
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'productId', location: 'body' } ]);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.be.equal(null);
        });

        it('when price is not present', async () => {
            newProduct = {
                productId: '01'
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'price', location: 'body' } ]);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.be.equal(null);
        });

        it('when productId have wrong type', async () => {
            newProduct = {
                productId: 'a', 
                price: 12
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'productId', location: 'body', value: newProduct.productId } ]);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.be.equal(null);
        });

        it('when price have wrong type', async () => {
            newProduct = {
                productId: '4', 
                price: 'a'
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ { msg: 'Invalid value', param: 'price', location: 'body', value: newProduct.price } ]);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.be.equal(null);
        });

        it('when body is empty', async () => {
            newProduct = {
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ 
                { msg: 'Invalid value', param: 'productId', location: 'body' },
                { msg: 'Invalid value', param: 'price', location: 'body' }
            ]);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.be.equal(null);
        });

        it('when productId and price have wrong type', async () => {
            newProduct = {
                productId: 'a', 
                price: 'a'
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(422);

            //BODY
            expect(body).to.have.nested.property('errors');
            expect(body.errors).to.be.deep.equal([ 
                { msg: 'Invalid value', param: 'productId', location: 'body', value: newProduct.productId },
                { msg: 'Invalid value', param: 'price', location: 'body', value: newProduct.price }
            ]);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.be.equal(null);
        });

    });
});
