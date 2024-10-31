// cypress/e2e/api/customers.cy.js

describe('Customers API', () => {
  const CUSTOMERS_API_URL = '/customers';

  it('returns a list of customers with default pagination', () => {
    cy.request(CUSTOMERS_API_URL).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.have.property('customers').that.is.an('array');
      expect(body.customers).to.have.length(10);
      expect(body).to.have.property('pageInfo');
      expect(body.pageInfo.currentPage).to.eq(1);
      expect(body.pageInfo).to.have.property('totalPages');
      expect(body.pageInfo).to.have.property('totalCustomers');
    });
  });

  it('handles custom pagination', () => {
    cy.request(`${CUSTOMERS_API_URL}?page=2&limit=5`).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.customers).to.have.length(5);
      expect(body.pageInfo.currentPage).to.eq(2);
    });
  });

  it('filters customers by size', () => {
    cy.request(`${CUSTOMERS_API_URL}?size=Small`).then(({ status, body }) => {
      expect(status).to.eq(200);
      body.customers.forEach((customer) => {
        expect(customer.size).to.eq('Small');
      });
    });
  });

  it('filters customers by industry', () => {
    cy.request(`${CUSTOMERS_API_URL}?industry=Technology`).then(({ status, body }) => {
      expect(status).to.eq(200);
      body.customers.forEach((customer) => {
        expect(customer.industry).to.eq('Technology');
      });
    });
  });

  it('returns an error for invalid industry', () => {
    cy.request({
      url: `${CUSTOMERS_API_URL}?industry=InvalidIndustry`,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      expect(status).to.eq(400);
      expect(body.error).to.eq('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.');
    });
  });

  it('returns the correct customer data structure', () => {
    cy.request(CUSTOMERS_API_URL).then(({ status, body }) => {
      expect(status).to.eq(200);
      
      if (body.customers.length > 0) {
        const customer = body.customers[0];
        expect(customer).to.have.all.keys('id', 'name', 'employees', 'industry', 'contactInfo', 'address', 'size');

        if (customer.contactInfo) {
          expect(customer.contactInfo).to.have.all.keys('name', 'email');
        }

        if (customer.address) {
          expect(customer.address).to.have.all.keys('street', 'city', 'state', 'zipCode', 'country');
        }
      }
    });
  });
});