
describe('EngageSphere', () => {
    beforeEach(() => {
 
      cy.visit('http://localhost:3000')
      cy.setCookie('cookieConsent','accepted')
    })
  
    it('It finds no a11y issues in light mode in the customer table', () => {
      cy.pageAccessibility()
    })
  
    it('It finds no a11y issues in dark mode in the customer table', () => {
      cy.get('[aria-label*="theme"]').click().pageAccessibility()
    })
  
    it('It finds on a11y issues with the messenger\'s bubble button in dark mode', () => {
      cy.get('[aria-label*="theme"]').click()
      cy.get('[aria-label*="messenger"]').click().pageAccessibility()
    
    })
  
      it('It finds no a11y issues in light mode in the customer details and address view', () => {
        cy.pageAccessibility()
      })
  
      it('It finds no a11y issues in dark mode in the customer details and address view', () => {
        cy.get('[aria-label*="theme"]').click()
        cy.pageAccessibility()
      })

      it('It forces a violation on header contrast', () =>{
        cy.get('h1').invoke('css', 'color', '#f2d3d3')
        cy.get('h1').invoke('css', 'background-color', '#ffffff')
        cy.pageAccessibility()
      })

    })
  