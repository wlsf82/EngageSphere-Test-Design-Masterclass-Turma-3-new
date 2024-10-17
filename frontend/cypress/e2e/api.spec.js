describe('API Testing - /customers', () => {
    const endpoint = '/customers';
  
    it('should return valid customers with default parameters', () => {
      cy.request(endpoint).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('customers');
        expect(response.body.pageInfo).to.have.property('currentPage', 1);
        expect(response.body.pageInfo).to.have.property('totalPages');
        expect(response.body.pageInfo).to.have.property('totalCustomers');
      });
    });
  
    it('should return a 400 error for invalid page or limit', () => {
      cy.request({
        method: 'GET',
        url: endpoint,
        qs: { page: -1, limit: 'invalid' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
      });
    });
  
    it('should return a 400 error for invalid size', () => {
      cy.request({
        method: 'GET',
        url: endpoint,
        qs: { size: 'InvalidSize' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
      });
    });
  
    it('should return a 400 error for invalid industry', () => {
      cy.request({
        method: 'GET',
        url: endpoint,
        qs: { industry: 'InvalidIndustry' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.');
      });
    });
  
    it('should return filtered customers by size and industry', () => {
      cy.request({
        method: 'GET',
        url: endpoint,
        qs: { size: 'Medium', industry: 'Technology' }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.customers).to.be.an('array');
        expect(response.body.customers.every(c => c.size === 'Medium')).to.be.true;
        expect(response.body.customers.every(c => c.industry === 'Technology')).to.be.true;
      });
    });
});  