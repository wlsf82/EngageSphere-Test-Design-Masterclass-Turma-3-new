describe('EngageSphere', () => {
  it('returns the correct status and body structure', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('customers')

      expect(body.customers[0]).to.have.property('id')
      expect(body.customers[0]).to.have.property('name')
      expect(body.customers[0]).to.have.property('employees')
      expect(body.customers[0]).to.have.property('industry')
      expect(body.customers[0]).to.have.property('contactInfo')
      expect(body.customers[0]).to.have.property('address')
      expect(body.customers[0]).to.have.property('size')

      if (body.customers[0].contactInfo) {
        expect(body.customers[0].contactInfo).to.have.property('name')
        expect(body.customers[0].contactInfo).to.have.property('email')
      }

      if (body.customers[0].address) {
        expect(body.customers[0].address).to.have.property('street')
        expect(body.customers[0].address).to.have.property('city')
        expect(body.customers[0].address).to.have.property('state')
        expect(body.customers[0].address).to.have.property('zipCode')
        expect(body.customers[0].address).to.have.property('country')
      }

      expect(body).to.have.property('pageInfo')
      expect(body.pageInfo).to.have.property('currentPage')
      expect(body.pageInfo).to.have.property('totalPages')
      expect(body.pageInfo).to.have.property('totalCustomers')
    })
  })

  it('paginates the customer list correctly', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`,
      qs: {
        'page': 6
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.pageInfo).to.have.property('currentPage', 6)
    })
  })

  it('filters the limit of customers correctly', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`,
      qs: {
        'limit': 10
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.customers).to.have.length(10)
    })
  })

  it('filters customers by size correctly', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`,
      qs: {
        'size': 'Small'
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.customers[0]).to.have.property('size', 'Small')
    })
  })

  it('filters customers by industry correctly', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`,
      qs: {
        'industry': 'Logistics'
      }
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.customers[0]).to.have.property('industry', 'Logistics')
    })
  })

  context('Invalid Requests', () => {

    const invalidData = [
      {
        scenario: 'negative page',
        page: -1,
        limit: 5,
        size: 'All',
        industry: 'All',
        errorMessage: 'Invalid page or limit. Both must be positive numbers.'
      },
      {
        scenario: 'negative limit',
        page: 1,
        limit: -5,
        size: 'All',
        industry: 'All',
        errorMessage: 'Invalid page or limit. Both must be positive numbers.'
      },
      {
        scenario: 'page as a string',
        page: 'one',
        limit: 5,
        size: 'All',
        industry: 'All',
        errorMessage: 'Invalid page or limit. Both must be positive numbers.'
      },
      {
        scenario: 'limit as a boolean',
        page: 1,
        limit: true,
        size: 'All',
        industry: 'All',
        errorMessage: 'Invalid page or limit. Both must be positive numbers.'
      },
      {
        scenario: 'unsupported size',
        page: 1,
        limit: 5,
        size: 'Big',
        industry: 'All',
        errorMessage: 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.'
      },
      {
        scenario: 'unsupported industry',
        page: 1,
        limit: 5,
        size: 'All',
        industry: 'Food',
        errorMessage: 'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.'
      }
    ]

    invalidData.forEach(data => {
      it(`handles invalid requests gracefully (e.g., ${data.scenario})`, () => {
        cy.api({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/customers`,
          qs: {
            'page': data.page,
            'limit': data.limit,
            'size': data.size,
            'industry': data.industry
          },
          failOnStatusCode: false
        }).then(({ status, body }) => {
          expect(status).to.eq(400)
          expect(body).to.have.property('error', data.errorMessage)
        })
      })
    })
  })
})
