const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const spies = require('chai-spies');

require('dotenv').config();
chai.use(spies);
chai.use(dirtyChai);
chai.use(chaiChange);
