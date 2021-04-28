const { expect } = require('chai');
const request = require('../../../support/request');
const productSchema = require('../../../../src/services/productDatabase/productSchema');

describe('API :: PRODUCT :: /POST /api/product 409', () => {

    context('when creating a product with invalid body fields', () => {
        let newProduct;

        it('when productId is not present', async () => {
            newProduct = {
                productId: '01', 
                price: 12
            };

            const { body } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(201);

            const { body: body2 } = await request()
                .post('/api/product')
                .send(newProduct)
                .expect(409);

            //BODY
            expect(body).to.have.nested.property('_id');
            expect(body.productId).to.be.equal(newProduct.productId);
            expect(body.price).to.be.equal(newProduct.price);
            //BODY2
            expect(body2).to.have.nested.property('error');
            expect(body2.error.code).to.be.equal(409);
            expect(body2.error.message).to.be.equal('Product already exists');

            //DATABASE
            const databaseData = await productSchema.findOne({ productId: body.productId });
            expect(databaseData).to.have.nested.property('_id');
            expect(databaseData.productId).to.be.equal(newProduct.productId);
            expect(databaseData.price).to.be.equal(newProduct.price);
        });

    });
});
