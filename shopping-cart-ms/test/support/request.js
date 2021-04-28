const request = require('supertest');
const app = require('../../src/application');

module.exports = () => request(app);
