const API_URL = Cypress.env('API_URL')
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`
const tamanhos = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']
const industrias = ['Logistics', 'Retail', 'Technology', 'HR', 'Finance']

describe('API Test', () => {
  it('Verifica o código de status 200', () => {
    cy.request(CUSTOMERS_API_URL)
      .its('status')
      .should('eq', 200)
  })

  tamanhos.forEach((tamanho) => {
    it(`Filtra clientes corretamente pelo tamanho ${tamanho}`, () => {
      cy.request(`${CUSTOMERS_API_URL}?size=${tamanho}`).then(({ status, body }) => {
        expect(status).to.eq(200)
        // Verifica se body.customers é um array
        expect(body.customers).to.be.an('array')
        // Valida se todos os clientes retornados têm o tamanho correto
        body.customers.forEach((customer) => {
          expect(customer.size).to.eq(tamanho)
        })
      })
    })
  })

  industrias.forEach((industria) => {
    it(`Filtra clientes corretamente pela indústria ${industria}`, () => {
      cy.request(`${CUSTOMERS_API_URL}?industry=${industria}`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.customers).to.be.an('array');
        body.customers.forEach((customer) => {
          expect(customer.industry).to.eq(industria)
        })
      })
    })
  })
})


