/// <reference types="Cypress" />

//API Test Suit
describe('API Tests', () => {

    it('Recupera clientes com sucesso', () => {
        //Realiza uma request para a página e verifica se a resposta é 200
        cy.request('https://engage-sphere.vercel.app').should(function (response) {
            console.log(response)
            const { status } = response
            expect(status).to.equal(200)
        })
    })
})