const { expect, spy } = require('chai');
const productSchema = require('../../../../src/services/productDatabase/productSchema');
const dbAccess = require('../../../../src/services/productDatabase/dbAccess');

describe(' Services :: productDatabase :: dbAcess ', () => {
    
    describe('#insertProduct', () => {
        let productId, price;
        afterEach(() => spy.restore());

        context('when insertProduct is called and return success', () => {
            beforeEach(() => {
                spy.on(productSchema, 'create', () => ({ test: 'return' }));
            });
    
            it('with productId and price undefined', async () => {
                productId = undefined;
                price = undefined;
                const response = await dbAccess.insertProduct(productId, price);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(productSchema.create).to.have.been.called.once.with.exactly({ productId: undefined, price: undefined});
            });
    
            it('with productId present and price undefined', async () => {
                productId = '123';
                price = undefined;
                const response = await dbAccess.insertProduct(productId, price);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(productSchema.create).to.have.been.called.once.with.exactly({ productId: '123', price: undefined});
            });
    
            it('with productId and price presents', async () => {
                productId = '123';
                price = 135;
                const response = await dbAccess.insertProduct(productId, price);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(productSchema.create).to.have.been.called.once.with.exactly({ productId: '123', price: 135});
            });
    
        });

        context('when insertProduct is called and throw an error', () => {
            beforeEach(() => {
                productId = '135';
                price = 246;
            });
    
            it('without error.code', async () => {
                spy.on(productSchema, 'create',  function() { throw { error: 'error' }; } );
                try {
                    await dbAccess.insertProduct(productId, price);
                } catch (error) {
                    expect(error).to.be.deep.equal({ error: 'error' });
                    expect(productSchema.create).to.have.been.called.once.with.exactly({ productId: '135', price: 246});
                }
            });
    
            it('with error.code = 11000 as string', async () => {
                spy.on(productSchema, 'create',  function() { throw { error: 'error', code: '11000' }; } );
                try {
                    await dbAccess.insertProduct(productId, price);
                } catch (error) {
                    expect(error).to.be.deep.equal({ error: 'error', code: '11000' });
                    expect(productSchema.create).to.have.been.called.once.with.exactly({ productId: '135', price: 246});
                }
            });
    
            it('with error.code = 11000 as integer', async () => {
                spy.on(productSchema, 'create',  function() { throw { error: 'error', code: 11000 }; } );
                try {
                    await dbAccess.insertProduct(productId, price);
                } catch (error) {
                    expect(error).to.be.deep.equal({ error: 'error', code: 11000, httpStatusCode: 409, message: 'Product already exists' });
                    expect(productSchema.create).to.have.been.called.once.with.exactly({ productId: '135', price: 246});
                }
            });
    
        });

    });

    describe('#listProducts', () => {
        let offset, limit;
        afterEach(() => spy.restore());

        context('when listProducts is called and return success', () => {
            beforeEach(() => {
                spy.on(productSchema, 'paginate', () => ({ test: 'return' }));
            });
    
            it('with offset and limit undefined', async () => {
                offset = undefined;
                limit = undefined;
                const response = await dbAccess.listProducts(offset, limit);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(productSchema.paginate).to.have.been.called.once.with.exactly({}, { offset: 0, limit: 10 }, { versionKey: false });
            });
    
            it('with offset present and limit undefined', async () => {
                offset = 4;
                limit = undefined;
                const response = await dbAccess.listProducts(offset, limit);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(productSchema.paginate).to.have.been.called.once.with.exactly({}, { offset: 4, limit: 10 }, { versionKey: false });
            });
    
            it('with offset and limit present', async () => {
                offset = 4;
                limit = 2;
                const response = await dbAccess.listProducts(offset, limit);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(productSchema.paginate).to.have.been.called.once.with.exactly({}, { offset: 4, limit: 2 }, { versionKey: false });
            });
    
        });

        context('when listProducts is called and throw an error', () => {
            beforeEach(() => {
                spy.on(productSchema, 'paginate',  function() { throw { error: 'error' }; } );
            });
    
            it('with error', async () => {
                try {
                    await dbAccess.listProducts(offset, limit);
                } catch (error) {
                    expect(error).to.be.deep.equal({ error: 'error' });
                }
            });
    
        });


    });

});
