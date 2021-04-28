const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const spies = require('chai-spies');

require('dotenv').config();
const cleanDatabase = require('./cleanDatabase');

chai.use(spies);
chai.use(dirtyChai);
chai.use(chaiChange);

afterEach(async () => cleanDatabase());
