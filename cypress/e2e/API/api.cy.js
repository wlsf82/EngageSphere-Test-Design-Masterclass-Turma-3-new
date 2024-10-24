/// <reference types="cypress" />
describe('API Tests', () => {
    it('Realiza uma request para a pagina e verifica se a resposta é um statusCode 200 ', () => {
        cy.request('/').should(function ({ status }) {
            expect(status).to.equal(200)
        })
    })
})
