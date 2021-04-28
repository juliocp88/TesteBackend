const { expect, spy } = require('chai');
const shoppingCartHelper = require('../../../src/helpers/shoppingCartHelper');
const dbAccess = require('../../../src/services/shoppingCartDatabase/queries');

describe(' Helpers :: shoppingCartHelper ', () => {
    
    describe('#getShoppingCart', () => {
        let shoppingCartId,
            testDbReturn = { testDb: 'test' };
        afterEach(() => spy.restore());

        context('when getShoppingCart is called and return success', () => {
            it('with shoppingCartId undefined', async () => {
                spy.on(dbAccess, 'getShoppingCart', () => ([testDbReturn]));
                spy.on(dbAccess, 'getShoppingCartProducts', () => ([1, 2, 3]));
                shoppingCartId = undefined;     
                let returnExpect = {
                    testDb: 'test',
                    products: [1, 2, 3]
                };

                const response = await shoppingCartHelper.getShoppingCart(shoppingCartId);

                expect(response).to.be.deep.equal(returnExpect);
                expect(dbAccess.getShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId);
                expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
            });
    
            it('with shoppingCartId present', async () => {
                spy.on(dbAccess, 'getShoppingCart', () => ([testDbReturn]));
                spy.on(dbAccess, 'getShoppingCartProducts', () => ([1, 2, 3]));
                shoppingCartId = '1';     
                let returnExpect = {
                    testDb: 'test',
                    products: [1, 2, 3]
                };

                const response = await shoppingCartHelper.getShoppingCart(shoppingCartId);

                expect(response).to.be.deep.equal(returnExpect);
                expect(dbAccess.getShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId);
                expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
            });
    
            it('with shoppingCartId present', async () => {
                spy.on(dbAccess, 'getShoppingCart', () => ([testDbReturn, { test: 'a'}]));
                spy.on(dbAccess, 'getShoppingCartProducts', () => ([1, 2, 3]));
                shoppingCartId = '1';     
                let returnExpect = {
                    testDb: 'test',
                    products: [1, 2, 3]
                };

                const response = await shoppingCartHelper.getShoppingCart(shoppingCartId);

                expect(response).to.be.deep.equal(returnExpect);
                expect(dbAccess.getShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId);
                expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
            });
        });

        context('when getShoppingCart is called and return error', () => {

            it('with getShoppingCart returning a empty list', async () => {
                spy.on(dbAccess, 'getShoppingCart', () => ([]));
                spy.on(dbAccess, 'getShoppingCartProducts', () => ([1, 2, 3]));
                shoppingCartId = 'a';

                try {
                    await shoppingCartHelper.getShoppingCart(shoppingCartId);
                } catch (error) {
                    expect(error).to.be.an.instanceOf(Error);
                    expect(dbAccess.getShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId);
                    expect(dbAccess.getShoppingCartProducts).to.not.have.been.called();
                }
            });
    
            it('with getShoppingCart returning a exeption', async () => {
                spy.on(dbAccess, 'getShoppingCart', function() { throw { error: 'error' }; } );
                spy.on(dbAccess, 'getShoppingCartProducts', () => ([1, 2, 3]));
                shoppingCartId = 'a';

                try {
                    await shoppingCartHelper.getShoppingCart(shoppingCartId);
                } catch (error) {
                    expect(error).to.be.deep.equal({ error: 'error' });
                    expect(dbAccess.getShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId);
                    expect(dbAccess.getShoppingCartProducts).to.not.have.been.called();
                }
            });
    
            it('with getShoppingCartProducts returning a exeption', async () => {
                spy.on(dbAccess, 'getShoppingCart', () => ([testDbReturn]));
                spy.on(dbAccess, 'getShoppingCartProducts', function() { throw { error: 'error' }; } );
                shoppingCartId = 'a';

                try {
                    await shoppingCartHelper.getShoppingCart(shoppingCartId);
                } catch (error) {
                    expect(error).to.be.deep.equal({ error: 'error' });
                    expect(dbAccess.getShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId);
                    expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                }
            });
        });

    });

    describe('#addShoppingCartProduct', () => {
        let shoppingCartId, userId, productId, quantity, price, totalPrice, totalQuantity,
            productsReturn = [{productId: '77', quantity: 1, price: 3}, {quantity: 2, price: 2}];
        afterEach(() => spy.restore());

        context('when addShoppingCartProduct is called and return success', () => {

            beforeEach(() => {
                spy.on(dbAccess, 'getShoppingCartProducts', () => (productsReturn));
                spy.on(dbAccess, 'createOrUpdateShoppingCart', () => ({}));
                spy.on(dbAccess, 'createOrUpdateShoppingCartProduct', () => ({}));
            });

            it('with all feilds undefined', async () => {
                shoppingCartId = undefined; 
                userId = undefined; 
                productId = undefined; 
                quantity = undefined; 
                price = undefined; 
                totalPrice = NaN;
                totalQuantity = NaN;

                const response = await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);

                let returnExpect = {
                    shoppingCartId,
                    userId,
                    totalPrice,
                    totalQuantity,
                    products: [{productId: '77', quantity: 1, price: 3}, {quantity: 2, price: 2}, {productId: '', shoppingCartId, quantity, price}]
                };

                expect(response).to.be.deep.equal(returnExpect);
                expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                expect(dbAccess.createOrUpdateShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId, userId, totalPrice, totalQuantity);
                expect(dbAccess.createOrUpdateShoppingCartProduct).to.have.been.called.once.with.exactly(shoppingCartId, '', quantity, price);
            });

            it('with all feilds present and a new product', async () => {
                shoppingCartId = '11'; 
                userId = '22'; 
                productId = '33'; 
                quantity = 2; 
                price = 5; 
                totalPrice = 17;
                totalQuantity = 5;

                const response = await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);

                let returnExpect = {
                    shoppingCartId,
                    userId,
                    totalPrice,
                    totalQuantity,
                    products: [{productId: '77', quantity: 1, price: 3}, {quantity: 2, price: 2}, {productId: productId, shoppingCartId, quantity, price}]
                };

                expect(response).to.be.deep.equal(returnExpect);
                expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                expect(dbAccess.createOrUpdateShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId, userId, totalPrice, totalQuantity);
                expect(dbAccess.createOrUpdateShoppingCartProduct).to.have.been.called.once.with.exactly(shoppingCartId, productId, quantity, price);
            });

            it('with all feilds present and an existing product', async () => {
                shoppingCartId = '11'; 
                userId = '22'; 
                productId = '77'; 
                quantity = 2; 
                price = 5; 
                totalPrice = 13;
                totalQuantity = 5;

                const response = await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);

                let returnExpect = {
                    shoppingCartId,
                    userId,
                    totalPrice,
                    totalQuantity,
                    products: [{productId: '77', quantity: 3, price: 3}, {quantity: 2, price: 2}]
                };

                expect(response).to.be.deep.equal(returnExpect);
                expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                expect(dbAccess.createOrUpdateShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId, userId, totalPrice, totalQuantity);
                expect(dbAccess.createOrUpdateShoppingCartProduct).to.have.been.called.once.with.exactly(shoppingCartId, productId, quantity, price);
            });
        });

        context('when addShoppingCartProduct is called and return error', () => {
            let errorReturn = { error: 'error' };
            shoppingCartId = '11'; 
            userId = '22';
            productId = '77'; 
            quantity = 2;
            price = 5;
            it('with all feilds present and an existing product', async () => {
                spy.on(dbAccess, 'getShoppingCartProducts', function() { throw { error: 'error' }; } );
                spy.on(dbAccess, 'createOrUpdateShoppingCart', () => ({}));
                spy.on(dbAccess, 'createOrUpdateShoppingCartProduct', () => ({}));

                try {
                    await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);
                } catch (error) {
                    expect(error).to.be.deep.equal(errorReturn);
                    expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                    expect(dbAccess.createOrUpdateShoppingCart).to.not.have.been.called();
                    expect(dbAccess.createOrUpdateShoppingCartProduct).to.not.have.been.called();
                }
            });

            it('with all feilds present and an existing product', async () => {
                spy.on(dbAccess, 'getShoppingCartProducts', () => (productsReturn));
                spy.on(dbAccess, 'createOrUpdateShoppingCart', function() { throw { error: 'error' }; } );
                spy.on(dbAccess, 'createOrUpdateShoppingCartProduct', () => ({}));
                
                totalPrice = 19;
                totalQuantity = 7;

                try {
                    await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);
                } catch (error) {
                    expect(error).to.be.deep.equal(errorReturn);
                    expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                    expect(dbAccess.createOrUpdateShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId, userId, totalPrice, totalQuantity);
                    expect(dbAccess.createOrUpdateShoppingCartProduct).to.not.have.been.called();
                }
            });

            it('with all feilds present and an existing product', async () => {
                spy.on(dbAccess, 'getShoppingCartProducts', () => (productsReturn));
                spy.on(dbAccess, 'createOrUpdateShoppingCart', () => ({}));
                spy.on(dbAccess, 'createOrUpdateShoppingCartProduct', function() { throw { error: 'error' }; } );
                
                totalPrice = 25;
                totalQuantity = 9;

                try {
                    await shoppingCartHelper.addShoppingCartProduct(shoppingCartId, userId, productId, quantity, price);
                } catch (error) {
                    expect(error).to.be.deep.equal(errorReturn);
                    expect(dbAccess.getShoppingCartProducts).to.have.been.called.once.with.exactly(shoppingCartId);
                    expect(dbAccess.createOrUpdateShoppingCart).to.have.been.called.once.with.exactly(shoppingCartId, userId, totalPrice, totalQuantity);
                    expect(dbAccess.createOrUpdateShoppingCartProduct).to.have.been.called.once.with.exactly(shoppingCartId, productId, quantity, price);
                }
            });
        });

    });

});
