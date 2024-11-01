const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;

describe('API Testing - /customers', () => {
  
    it('should return valid customers with default parameters', () => {
      cy.request(CUSTOMERS_API_URL).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.have.property('customers');
        expect(body.pageInfo).to.have.property('currentPage', 1);
        expect(body.pageInfo).to.have.property('totalPages');
        expect(body.pageInfo).to.have.property('totalCustomers');
      });
    });
  
    it('should return a 400 error for invalid page', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: { page: -1 },
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.');
      });
    });
    
    it('should return a 400 error for invalid limit', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: { limit: 'invalid' },
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.include('Invalid page or limit. Both must be positive numbers.');
      });
    });    
  
    it('should return a 400 error for invalid size', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: { size: 'InvalidSize' },
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.include('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
      });
    });    
  
    it('should return a 400 error for invalid industry', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: { industry: 'InvalidIndustry' },
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.include('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.');
      });
    });
  
    it('should return filtered customers by size and industry', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
        qs: { size: 'Medium', industry: 'Technology' }
      }).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.customers).to.be.an('array');
        expect(body.customers.every(c => c.size === 'Medium')).to.be.true;
        expect(body.customers.every(c => c.industry === 'Technology')).to.be.true;
      });
    });
});  