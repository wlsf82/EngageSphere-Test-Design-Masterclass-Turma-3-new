/// <reference types="cypress" />



describe('',() => {
    context('Request all customers', () => {
        beforeEach('Get request', () => {
            cy.request(Cypress.env('baseUrl')).as('customers')
        })
        it('Check status code return for all customers', () => {
            cy.get('@customers').then((response) =>{
                expect(response.status).to.eq(200)
            })
        })
        it('Check length for return with all customers', () => {
            cy.get('@customers').then((response) =>{
                expect(response.body.customers).to.length(10)
            })
        })
    })
    context('Request all customers with pagination', () => {
        const pagination = [1,2,3,4,5,6,7]
        it.each(pagination)('Check pagination with all customers', (page) => {
            cy.request(`${Cypress.env('baseUrl')}?page=${page}`).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.pageInfo.currentPage).to.eq(page)
            })
        })
    })

    it('Filter to customers with inside limit', () => {

    })
    it('Filter to customers with industry', () => {

    })
    it('Filter to customer with size', () => {

    })
    it('Check message for invalid request', () => {

    })
    it('Check message for invalid page', () => {

    })
    it('Check message for invalid limit', () => {

    })
    it('Check message for invalid page with insert string', () => {

    })
    it('Check message for invalid limit with insert boolean', () => {

    })
    it('Check message for invalid size', () => {

    })
    it('Check message for invalida industry', () => {

    })
})