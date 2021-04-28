const { expect, spy } = require('chai');
const productController = require('../../../src/controllers/productController');
const responseHelper = require('../../../src/helpers/responseHelper');
const dbAccess = require('../../../src/services/productDatabase/dbAccess');

describe(' Controllers :: productController ', () => {
    
    describe('#listProducts', () => {
        let req, 
            res;
        afterEach(() => spy.restore());

        context('when listProducts is called and return success', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess', () => ({ test: 'return' }));
                spy.on(responseHelper, 'returnError');
                spy.on(dbAccess, 'listProducts', () => ({ test: 'test' }));
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await productController.listProducts(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listProducts).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 200);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with query object present', async () => {
                req = {
                    query: {}
                }; 
                res = {};      

                const response = await productController.listProducts(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listProducts).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 200);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with offset and limit presents', async () => {
                req = {
                    query: { offset: 0, limit: 1}
                }; 
                res = {};      

                const response = await productController.listProducts(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listProducts).to.have.been.called.once.with.exactly(0, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 200);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with offset present', async () => {
                req = {
                    query: { offset: 0 }
                }; 
                res = {};      

                const response = await productController.listProducts(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listProducts).to.have.been.called.once.with.exactly(0, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 200);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with limit present', async () => {
                req = {
                    query: { limit: 1}
                }; 
                res = {};      

                const response = await productController.listProducts(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listProducts).to.have.been.called.once.with.exactly(undefined, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 200);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
        });

        context('when listProducts is called and return error', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess');
                spy.on(responseHelper, 'returnError', () => ({ test: 'return' }));
                spy.on(dbAccess, 'listProducts', function() { throw { error: 'error' }; } );
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await productController.listProducts(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listProducts).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.not.have.been.called();
                expect(responseHelper.returnError).to.have.been.with.exactly(res, { error: 'error' } );
            });
        });

    });

    describe('#createProduct', () => {
        let req, 
            res;
        afterEach(() => spy.restore());

        context('when createProduct is called and return success', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess', () => ({ test: 'return' }));
                spy.on(responseHelper, 'returnError');
                spy.on(dbAccess, 'insertProduct', () => ({ test: 'test' }));
            });
    
            it('with body object not present', async () => {
                req = {}; 
                res = {};      

                const response = await productController.createProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.insertProduct).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with body object present', async () => {
                req = {
                    query: {}
                }; 
                res = {};      

                const response = await productController.createProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.insertProduct).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with productId and price presents', async () => {
                req = {
                    body: { productId: '0', price: 1}
                }; 
                res = {};      

                const response = await productController.createProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.insertProduct).to.have.been.called.once.with.exactly('0', 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with productId present', async () => {
                req = {
                    body: { productId: '1' }
                }; 
                res = {};      

                const response = await productController.createProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.insertProduct).to.have.been.called.once.with.exactly('1', undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with price present', async () => {
                req = {
                    body: { price: 1}
                }; 
                res = {};      

                const response = await productController.createProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.insertProduct).to.have.been.called.once.with.exactly(undefined, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { test: 'test' }, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
        });

        context('when createProduct is called and return error', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess');
                spy.on(responseHelper, 'returnError', () => ({ test: 'return' }));
                spy.on(dbAccess, 'insertProduct', function() { throw { error: 'error' }; } );
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await productController.createProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.insertProduct).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.not.have.been.called();
                expect(responseHelper.returnError).to.have.been.with.exactly(res, { error: 'error' } );
            });
        });

    });

});
