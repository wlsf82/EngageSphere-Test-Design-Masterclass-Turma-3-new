const path = require("path");

describe('Top menu', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('div[class*="CookieConsent_banner"]').findAllByText('Accept').click()
    })
  
    it('It filters by all sizes (Small, Medium, Enterprise, Large Enterprise, Very Large Enterprise)', () => {
        cy.get('select').find('option[value="All"]').should("be.selected");
        cy.get('#sizeFilter').select('Small') 
        cy.get('table tbody tr').should('have.length', 1)
        cy.get('#sizeFilter').select('Medium') 
        cy.get('table tbody tr').should('have.length', 3)
        cy.get('#sizeFilter').select('Enterprise') 
        cy.get('table tbody tr').should('have.length', 3)
        cy.get('#sizeFilter').select('Large Enterprise') 
        cy.get('table tbody tr').should('have.length', 2)
        cy.get('#sizeFilter').select('Very Large Enterprise') 
        cy.get('table tbody tr').should('have.length', 1)
    })

    it('It shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
        cy.get('#sizeFilter').select('Very Large Enterprise')
        cy.get('#industryFilter').select('HR')
        cy.get('div[class*="EmptyState_noCustomersAvailableText"]').should('be.visible')
    })

    it('It shows and hides the customer address', () => {
        cy.get('table').findAllByText('View').first().click()
        cy.get('h2').contains('Customer Details').should('be.visible')
        cy.get('button[class*="CustomerDetails_showAddressBtn"]').click()
        cy.get('h3').contains('Address').should('be.visible')
        cy.get('button[class*="CustomerDetails_hideAddressBtn"]').click()
    })

    it('It renders the contact details of a customer', () => {
        cy.get('#sizeFilter').select('Enterprise') 
        cy.get('table').findAllByText('View').first().click()
        cy.get('p').contains('Brando').should('be.visible')
        cy.get('p').contains('Brando_Kozey48@gmail.com').should('be.visible')
    })

    it('See welcome message with entered name', () => {
        cy.get('#name').type('Pedro')
        cy.get('h2').contains('Hi Pedro!').should('be.visible')
    })

    it('It correctly downloads a list of customers as a CSV file', () => {
        const downloadsFolder = Cypress.config("downloadsFolder");
        cy.readFile(path.join(downloadsFolder, "customers.csv")).should("exist");
    })

})