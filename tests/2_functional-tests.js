const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); // Make sure to adjust the path based on your actual file structure

chai.use(chaiHttp);
const { expect } = chai;

describe('Functional Tests', () => {
  it('Viewing one stock: GET request to /api/stock-prices/', (done) => {
    chai.request(app)
      .get('/api/stock-prices/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions as needed
        done();
      });
  });

  it('Viewing one stock and liking it: GET request to /api/stock-prices/', (done) => {
    chai.request(app)
      .get('/api/stock-prices/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions as needed, including liking the stock
        done();
      });
  });

  it('Viewing the same stock and liking it again: GET request to /api/stock-prices/', (done) => {
    chai.request(app)
      .get('/api/stock-prices/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions as needed, including liking the stock again
        done();
      });
  });

  it('Viewing two stocks: GET request to /api/stock-prices/', (done) => {
    chai.request(app)
      .get('/api/stock-prices/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions as needed, including checking two stocks
        done();
      });
  });

  it('Viewing two stocks and liking them: GET request to /api/stock-prices/', (done) => {
    chai.request(app)
      .get('/api/stock-prices/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions as needed, including liking both stocks
        done();
      });
  });
});