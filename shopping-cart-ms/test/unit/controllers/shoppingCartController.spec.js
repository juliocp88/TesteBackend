const { expect, spy } = require('chai');
const shoppingCartController = require('../../../src/controllers/shoppingCartController');
const responseHelper = require('../../../src/helpers/responseHelper');
const dbAccess = require('../../../src/services/shoppingCartDatabase/queries');
const shoppingCartHelper = require('../../../src/helpers/shoppingCartHelper');

describe(' Controllers :: shoppingCartController ', () => {
    
    describe('#listShoppingCart', () => {
        let req, 
            res,
            testReturn = { test: 'return' },
            testDbReturn = { testDb: 'test' };
        afterEach(() => spy.restore());

        context('when listShoppingCart is called and return success', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess', () => (testReturn));
                spy.on(responseHelper, 'returnError');
                spy.on(dbAccess, 'listShoppingCart', () => (testDbReturn));
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.listShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listShoppingCart).to.have.been.called.once.with.exactly(0, 10);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { docs: testDbReturn, offset: 0, limit: 10 });
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with query object present', async () => {
                req = {
                    query: {}
                }; 
                res = {};      

                const response = await shoppingCartController.listShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listShoppingCart).to.have.been.called.once.with.exactly(0, 10);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { docs: testDbReturn, offset: 0, limit: 10 });
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with offset and limit presents', async () => {
                req = {
                    query: { offset: 0, limit: 1}
                }; 
                res = {};      

                const response = await shoppingCartController.listShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listShoppingCart).to.have.been.called.once.with.exactly(0, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { docs: testDbReturn, offset: 0, limit: 1 });
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with offset present', async () => {
                req = {
                    query: { offset: 0 }
                }; 
                res = {};      

                const response = await shoppingCartController.listShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listShoppingCart).to.have.been.called.once.with.exactly(0, 10);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { docs: testDbReturn, offset: 0, limit: 10 });
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with limit present', async () => {
                req = {
                    query: { limit: 1}
                }; 
                res = {};      

                const response = await shoppingCartController.listShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listShoppingCart).to.have.been.called.once.with.exactly(0, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, { docs: testDbReturn, offset: 0, limit: 1 });
                expect(responseHelper.returnError).to.not.have.been.called();
            });
        });

        context('when listShoppingCart is called and return error', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess');
                spy.on(responseHelper, 'returnError', () => ({ test: 'return' }));
                spy.on(dbAccess, 'listShoppingCart', function() { throw { error: 'error' }; } );
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.listShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(dbAccess.listShoppingCart).to.have.been.called.once.with.exactly(0, 10);
                expect(responseHelper.returnSucess).to.not.have.been.called();
                expect(responseHelper.returnError).to.have.been.with.exactly(res, { error: 'error' } );
            });
        });

    });

    describe('#getShoppingCart', () => {
        let req, 
            res,
            testReturn = { test: 'return' },
            testDbReturn = { testDb: 'test' };
        afterEach(() => spy.restore());

        context('when getShoppingCart is called and return success', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess', () => (testReturn));
                spy.on(responseHelper, 'returnError', () => (testReturn));
                spy.on(shoppingCartHelper, 'getShoppingCart', () => (testDbReturn));
            });
    
            it('with params object not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.getShoppingCart(req, res);
                console.log('response');
                console.log(response);
                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.getShoppingCart).to.have.been.called.once.with.exactly(undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with params object present', async () => {
                req = {
                    params: {}
                }; 
                res = {};      

                const response = await shoppingCartController.getShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.getShoppingCart).to.have.been.called.once.with.exactly(undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with shoppingCartId present', async () => {
                req = {
                    params: { shoppingCartId: '1'}
                }; 
                res = {};      

                const response = await shoppingCartController.getShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.getShoppingCart).to.have.been.called.once.with.exactly('1');
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
        });

        context('when getShoppingCart is called and return error', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess');
                spy.on(responseHelper, 'returnError', () => ({ test: 'return' }));
                spy.on(shoppingCartHelper, 'getShoppingCart', function() { throw { error: 'error' }; } );
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.getShoppingCart(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.getShoppingCart).to.have.been.called.once.with.exactly(undefined);
                expect(responseHelper.returnSucess).to.not.have.been.called();
                expect(responseHelper.returnError).to.have.been.with.exactly(res, { error: 'error' } );
            });
        });

    });
    
    describe('#addShoppingCartProduct', () => {
        let req, 
            res,
            testReturn = { test: 'return' },
            testDbReturn = { testDb: 'test' };
        afterEach(() => spy.restore());

        context('when addShoppingCartProduct is called and return success', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess', () => (testReturn));
                spy.on(responseHelper, 'returnError', () => (testReturn));
                spy.on(shoppingCartHelper, 'addShoppingCartProduct', () => (testDbReturn));
            });
    
            it('with params and body objects not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.addShoppingCartProduct(req, res);
                console.log('response');
                console.log(response);
                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.addShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, undefined, undefined, undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with params and body objects present', async () => {
                req = {
                    params: {},
                    body: {}
                }; 
                res = {};      

                const response = await shoppingCartController.addShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.addShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, undefined, undefined, undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with shoppingCartId present', async () => {
                req = {
                    params: { shoppingCartId: '1'}
                }; 
                res = {};      

                const response = await shoppingCartController.addShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.addShoppingCartProduct).to.have.been.called.once.with.exactly('1', undefined, undefined, undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with body fields present', async () => {
                req = {
                    body: { 
                        userId: 'a', 
                        productId: 'b', 
                        quantity: 3, 
                        price: 1
                    }}; 
                res = {};      

                const response = await shoppingCartController.addShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.addShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, 'a', 'b', 3, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with params and body fields present', async () => {
                req = {
                    params: { shoppingCartId: '1'},
                    body: { 
                        userId: 'a', 
                        productId: 'b', 
                        quantity: 3, 
                        price: 1
                    }}; 
                res = {};      

                const response = await shoppingCartController.addShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.addShoppingCartProduct).to.have.been.called.once.with.exactly('1', 'a', 'b', 3, 1);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn, 201);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
        });

        context('when addShoppingCartProduct is called and return error', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess');
                spy.on(responseHelper, 'returnError', () => ({ test: 'return' }));
                spy.on(shoppingCartHelper, 'addShoppingCartProduct', function() { throw { error: 'error' }; } );
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.addShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.addShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, undefined, undefined, undefined, undefined);
                expect(responseHelper.returnSucess).to.not.have.been.called();
                expect(responseHelper.returnError).to.have.been.with.exactly(res, { error: 'error' } );
            });
        });

    });
    
    describe('#removeShoppingCartProduct', () => {
        let req, 
            res,
            testReturn = { test: 'return' },
            testDbReturn = { testDb: 'test' };
        afterEach(() => spy.restore());

        context('when removeShoppingCartProduct is called and return success', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess', () => (testReturn));
                spy.on(responseHelper, 'returnError', () => (testReturn));
                spy.on(shoppingCartHelper, 'removeShoppingCartProduct', () => (testDbReturn));
            });
    
            it('with params and body objects not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.removeShoppingCartProduct(req, res);
                console.log('response');
                console.log(response);
                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.removeShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with params object present', async () => {
                req = {
                    params: {}
                }; 
                res = {};      

                const response = await shoppingCartController.removeShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.removeShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with shoppingCartId present', async () => {
                req = {
                    params: { shoppingCartId: '1'}
                }; 
                res = {};      

                const response = await shoppingCartController.removeShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.removeShoppingCartProduct).to.have.been.called.once.with.exactly('1', undefined);
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with productId present', async () => {
                req = {
                    params: { productId: '2' }
                }; 
                res = {};      

                const response = await shoppingCartController.removeShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.removeShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, '2');
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
    
            it('with shoppingCartId and productId fields present', async () => {
                req = {
                    params: { shoppingCartId: '1', productId: '2'},
                }; 
                res = {};      

                const response = await shoppingCartController.removeShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.removeShoppingCartProduct).to.have.been.called.once.with.exactly('1', '2');
                expect(responseHelper.returnSucess).to.have.been.with.exactly(res, testDbReturn);
                expect(responseHelper.returnError).to.not.have.been.called();
            });
        });

        context('when addShoppingCartProduct is called and return error', () => {
            beforeEach(() => {
                spy.on(responseHelper, 'returnSucess');
                spy.on(responseHelper, 'returnError', () => ({ test: 'return' }));
                spy.on(shoppingCartHelper, 'removeShoppingCartProduct', function() { throw { error: 'error' }; } );
            });
    
            it('with query object not present', async () => {
                req = {}; 
                res = {};      

                const response = await shoppingCartController.removeShoppingCartProduct(req, res);

                expect(response).to.be.deep.equal({ test: 'return' });
                expect(shoppingCartHelper.removeShoppingCartProduct).to.have.been.called.once.with.exactly(undefined, undefined);
                expect(responseHelper.returnSucess).to.not.have.been.called();
                expect(responseHelper.returnError).to.have.been.with.exactly(res, { error: 'error' } );
            });
        });

    });

});
