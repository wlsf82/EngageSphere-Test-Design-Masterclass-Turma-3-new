describe('Validate the API requests', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

  context('Pagination and limits', () => {
    it('Get customers successfully', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
      }).then(({ status }) => {
        expect(status).to.equal(200);
      });
    })

    it('Change the page and check the first customers', () => {
      let firstCustomerId = '';
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
      }).then(({ status, body }) => {
        expect(status).to.equal(200)
        firstCustomerId = body.customers[0].id;
      })

      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=2`,
      }).then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body.customers[0].id).to.not.equal(firstCustomerId)
      })
    })

    it('Change the limits of customers per page', () => {
      cy.request({
        method: 'GET',
        url: CUSTOMERS_API_URL,
      }).then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body.pageInfo.totalPages).to.equal(5);
      })

      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=1&limit=20`,
      }).then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body.pageInfo.totalPages).to.equal(3);
      })
    })
  });
  context('Filters', () => {
    it('Filter small size companies', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?size=Small`,
      }).then(({ status, body }) => {
        expect(status).to.equal(200);
        // Check if all returned companies have less than 100 employees
        const allCompaniesHaveLessThan100Employees = body.customers.every(customer => customer.employees < 100);
        expect(allCompaniesHaveLessThan100Employees).to.be.true;
      })
    })

    it('Filters logistics companies', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?industry=Logistics`,
      }).then(({ status, body }) => {
        expect(status).to.equal(200);
        // Check if all returned companies are in the logistics industry
        const allCompaniesAreLogistics = body.customers.every(customer => customer.industry === "Logistics");
        expect(allCompaniesAreLogistics).to.be.true;
      })
    })
  })

  context('Negative scenarios', () => {
    context('Pagination and limits', () => {
      it('Request a negative page', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=-1`,
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.equal(400);
          expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
        })
      })

      it('Request a negative limit', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?limit=-10`,
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.equal(400);
          expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
        })
      })

      it('Request text page', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=cicero&limit=-10`,
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.equal(400);
          expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
        })
      })

      it('Request bool limit', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?page=cicero&limit=` + true,
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.equal(400);
          expect(body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.')
        })
      })
    })
    context('Filters', () => {
      it('Request an invalid company size', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?size=Cicero`,
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.equal(400);
          expect(body).to.have.property('error', 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
        })
      })

      it('Request an invalid company industry', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}?industry=Cicero`,
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.equal(400);
          expect(body).to.have.property('error', 'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.')
        })
      })
    })
  })
})
