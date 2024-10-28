const API_URL = Cypress.env('API_URL')
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('EngageSphere', () => {
  it('Should return a list of customers', () => {
    cy.request('GET', CUSTOMERS_API_URL)
      .then(({status, body}) => {
        expect(status).to.eq(200);
        expect(body).to.have.property('customers');
        expect(body.customers).to.be.an('array');
        expect(body.customers.length).to.be.greaterThan(0);
      });
  });

  it('Should return an error for a negative page number', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=-1`,
      failOnStatusCode: false,
    }).then(({status, body}) => {
      expect(status).to.eq(400);
      expect(body).to.have.property('error');
    });
  });

  it('Should return an error for a negative limit', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?limit=-10`,
      failOnStatusCode: false,
    }).then(({status, body}) => {
      expect(status).to.eq(400);
      expect(body).to.have.property('error');
    });
  });

  it('Should return an error for a page parameter as a string', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=abc`,
      failOnStatusCode: false,
    }).then(({status, body}) => {
      expect(status).to.eq(400);
      expect(body).to.have.property('error');
    });
  });

  it('Should return an error for a limit parameter as a boolean', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?limit=true`,
      failOnStatusCode: false,
    }).then(({status, body}) => {
      expect(status).to.eq(400);
      expect(body).to.have.property('error');
    });
  });

  it('Should return an error for an unsupported size', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?size=extra-large`,
      failOnStatusCode: false,
    }).then(({status, body}) => {
      expect(status).to.eq(400);
      expect(body).to.have.property('error');
    });
  });

  it('Should return an error for an unsupported industry', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?industry=unknown`,
      failOnStatusCode: false,
    }).then(({status, body}) => {
      expect(status).to.eq(400);
      expect(body).to.have.property('error');
    });
  });
});
