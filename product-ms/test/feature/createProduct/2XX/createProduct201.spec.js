const { expect } = require('chai');
const request = require('../../../support/request');
const productSchema = require('../../../../src/services/productDatabase/productSchema');

describe('API :: PRODUCT :: /POST /api/product 201', () => {

    context('when creating a product', () => {
        let newProduct;

        it('create a product with string productId', async () => {
            newProduct = {
                productId: '01', 
                price: 12
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(201);

            //BODY
            expect(body).to.have.nested.property('_id');
            expect(body.productId).to.be.equal(newProduct.productId);
            expect(body.price).to.be.equal(newProduct.price);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.have.nested.property('_id');
            expect(databaseData.productId).to.be.equal(newProduct.productId);
            expect(databaseData.price).to.be.equal(newProduct.price);
        });

        it('create a product with integer productId', async () => {
            newProduct = {
                productId: 2, 
                price: 12
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(201);

            //BODY
            expect(body).to.have.nested.property('_id');
            expect(body.productId).to.be.equal('2');
            expect(body.price).to.be.equal(newProduct.price);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.have.nested.property('_id');
            expect(databaseData.productId).to.be.equal('2');
            expect(databaseData.price).to.be.equal(newProduct.price);
        });

        it('create a product with string price', async () => {
            newProduct = {
                productId: '3', 
                price: '12'
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(201);

            //BODY
            expect(body).to.have.nested.property('_id');
            expect(body.productId).to.be.equal(newProduct.productId);
            expect(body.price).to.be.equal(12);

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.have.nested.property('_id');
            expect(databaseData.productId).to.be.equal(newProduct.productId);
            expect(databaseData.price).to.be.equal(12);
        });

    });
});
