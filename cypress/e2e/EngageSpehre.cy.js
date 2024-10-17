// cypress/e2e/api/EngageSphere.cy.js
describe('API de Clientes', () => {
  const API_URL = Cypress.env('API_URL');

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.document.cookie = 'cookieConsent=accepted';
      },
    });
  });

  it('retorna uma lista de clientes com paginação padrão', () => {
    cy.request(`${API_URL}/customers`).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(200);
      expect(body).to.have.property('customers').that.is.an('array');
      expect(body.customers).to.have.length(10);
      expect(body).to.have.property('pageInfo');
      expect(body.pageInfo.currentPage).to.eq(1);
    });
  });

  it('lida com paginação personalizada', () => {
    cy.request(`${API_URL}/customers?page=2&limit=5`).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(200);
      expect(body.customers).to.have.length(5);
      expect(body.pageInfo.currentPage).to.eq(2);
    });
  });

  it('filtra clientes por tamanho', () => {
    cy.request(`${API_URL}/customers?size=Small`).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(200);
      body.customers.forEach((customer) => {
        expect(customer.size).to.eq('Small');
      });
    });
  });

  it('filtra clientes por indústria', () => {
    cy.request(`${API_URL}/customers?industry=Technology`).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(200);
      body.customers.forEach((customer) => {
        expect(customer.industry).to.eq('Technology');
      });
    });
  });

  it('lida com parâmetro de página inválido', () => {
    cy.request({
      url: `${API_URL}/customers?page=invalid`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(400);
      expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('lida com parâmetro de tamanho inválido', () => {
    cy.request({
      url: `${API_URL}/customers?size=Invalid`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(400);
      expect(body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
    });
  });

  it('lida com parâmetro de indústria inválido', () => {
    cy.request({
      url: `${API_URL}/customers?industry=Invalid`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(400);
      expect(body.error).to.eq('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.');
    });
  });

  it('retorna a estrutura correta dos dados do cliente', () => {
    cy.request(`${API_URL}/customers`).then(({ status, body }) => {
      cy.log('Response status:', status);
      cy.log('Response body:', JSON.stringify(body));

      expect(status).to.eq(200);
      const customer = body.customers[0];
      expect(customer).to.have.all.keys('id', 'name', 'employees', 'industry', 'contactInfo', 'address', 'size');
      expect(customer.contactInfo).to.have.all.keys('name', 'email');
      expect(customer.address).to.have.all.keys('street', 'city', 'state', 'zipCode', 'country');
    });
  });
});