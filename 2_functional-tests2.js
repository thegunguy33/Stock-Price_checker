// test file
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Import the exported server

chai.use(chaiHttp);
const expect = chai.expect;
describe('Stock Price Checker API Functional Tests', () => {
  it('should view one stock', (done) => {
    chai.request(app)
      .get('/api/stock-prices?stock=GOOGL')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('stock', 'GOOGL');
        expect(res.body).to.have.property('price');
        done();
      });
  });

  it('should view one stock and like it', (done) => {
    chai.request(app)
      .get('/api/stock-prices?stock=GOOGL&like=true')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('stock', 'GOOGL');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('likes', 1);
        done();
      });
  });

  it('should view the same stock and like it again', (done) => {
    chai.request(app)
      .get('/api/stock-prices?stock=GOOGL&like=true')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('stock', 'GOOGL');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('likes', 2);
        done();
      });
  });

  it('should view two stocks', (done) => {
    chai.request(app)
      .get('/api/stock-prices?stock=GOOGL&stock=MSFT')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('stockData').that.is.an('array');
        expect(res.body.stockData).to.have.lengthOf(2);
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('price');
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('price');
        done();
      });
  });

  it('should view two stocks and like them', (done) => {
    chai.request(app)
      .get('/api/stock-prices?stock=GOOGL&stock=MSFT&like=true')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('stockData').that.is.an('array');
        expect(res.body.stockData).to.have.lengthOf(2);
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('price');
        expect(res.body.stockData[0]).to.have.property('rel_likes');
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('price');
        expect(res.body.stockData[1]).to.have.property('rel_likes');
        done();
      });
  });
});