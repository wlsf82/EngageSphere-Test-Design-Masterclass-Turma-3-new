const path = require("path");

describe('Home Page -', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/')
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
    cy.get('#sizeFilter').select('Small')
    cy.get('#industryFilter').select('HR')
    cy.get('svg[title="image of an empty box"]')
  })

  it('It shows and hides the customer address', () => {
    cy.contains('button', 'View').click()
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.get('button[class*="CustomerDetails_showAddressBtn"]').click()
    cy.contains('h3', 'Address').should('be.visible')
    cy.get('button[class*="CustomerDetails_hideAddressBtn"]').click()
  })

  it('It renders the contact details of a customer', () => {
    cy.get('#sizeFilter').select('Enterprise') 
    cy.contains('button', 'View').click()
    cy.contains('p', 'Brando').should('be.visible')
    cy.contains('p', 'Brando_Kozey48@gmail.com').should('be.visible')
  })

  it('See welcome message with entered name', () => {
    cy.get('#name').type('Pedro')
    cy.get('h2').contains('Hi Pedro!').should('be.visible')
  })

  context('Download CSV', () => {
    beforeEach(() => {
      Cypress.on('window:before:load', window => {
        window.document.cookie = 'cookieConsent=accepted'
      })
      cy.visit('/')
    })

    it.only('It correctly downloads a list of customers as a CSV file', () => {
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(path.join(downloadsFolder, "customers.csv")).should("exist");
    })
  });

  
})
