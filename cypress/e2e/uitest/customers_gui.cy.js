/// <reference types="cypress" />

describe('Tests customers gui', {tags: 'gui', env:{baseUrl: 'http://localhost:3000/'}},() => {
    context('Home customers', () => {
        beforeEach(() => {
            cy.setCookieSession('accepted')
            cy.visit(Cypress.env('baseUrl'))
        })

        const industries = ['Logistic', 'Retail', 'Technology', 'HR', 'Finance']
        it.each(industries)('Filter with industries', (industries) => {
            cy.intercept('GET', '**&industry=*').as('wait')
            cy.get('[data-testid="industry-filter"]').select(industries)
            cy.wait('@wait')

            cy.get('[data-testid="table"] > table > tbody > tr').then((elements) => {
                cy.wrap(elements).each(() => {
                    cy.contains('tr', industries)
                })
            })
        })

        const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']
        it.each(sizes)('Filter with sizes', (sizes) => {
            cy.intercept('GET', '**&size=*').as('wait')
            cy.get('[data-testid="size-filter"]').select(sizes)
            cy.wait('@wait')

            cy.get('[data-testid="table"] > table > tbody > tr').then((elements) => {
                cy.wrap(elements).each(() => {
                    cy.contains('tr', sizes)
                })
            })
        })

        it('Check maintain filter when returning from view details customers ', () => {
            cy.get('[data-testid="size-filter"]').as('select')
            cy.get('@select').select('Small')
            cy.get('[data-testid="table"] > table > tbody > tr').as('list')
            cy.get('@list').first().last().find('button').should('be.visible').click()
            cy.contains('h2', 'Customer Details').should('be.visible')

            cy.contains('button', 'Back').should('be.visible').click()

            cy.get('@select').should('be.visible').invoke('val').should('eq', 'Small')
        })
    })
})


