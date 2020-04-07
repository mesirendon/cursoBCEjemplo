const Hello = artifacts.require("Hello");

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Hello', (accounts) => {
  const [
    owner,
    unauthorized,
  ] = accounts;

  describe('Deployment', () => {
    it('should deploy the contract without errors', () => {
      return Hello.deployed().then(( instance ) => {
        hello = instance;
        expect(hello).not.be.an('error');
      });
    });
    it('should get an instance registered to the rightfull owner', () => {
      return hello.owner().then(( response ) => {
        expect(response).to.eq(owner);
      });
    });
  });
  describe('Business', () => {
    it('should get an empty text', () => {
      return hello.text().then(( response ) => {
        expect(response)
      });
    });
    it('should allow the owner to change the text', () => {
      return hello.write('Hola soy el owner', {from: owner}).then(( response ) => {
        expect(response.tx).to.match(/0x[a-fA-F0-9]{64}/);
      });
    });
    it('should not allow anyone else to change the text', () => {
      return expect(hello.write('Hola este texto nunca se deberia reflejar', {from: unauthorized}))
        .to.be.eventually.rejected;
    });
    it('should get the original owner set text', () => {
      return hello.text().then(( response ) => {
        expect(response).to.eq('Hola soy el owner');
      });
    });
  });
});
