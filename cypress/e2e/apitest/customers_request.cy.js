/// <reference types="cypress" />

describe('',() => {
    context('Request all customers', () => {
        beforeEach('Get request', () => {
            cy.request().as('customers')
        })
        it('Check status code return for all customers', () => {
            expect($this.customers.status).to.eq(200)
        })
        it('Check length for return with all customers', () => {
            expect($this.customers.length).to.length(50)
        })
    })
    context('Request all customers with pagination', () => {
        it('Check pagination with all customers', () => {

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