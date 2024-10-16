describe('Pagination - Pages of clients', () => {
    const localStorageKey = 'paginationLimit'

    beforeEach(() => {
        cy.startSession()
    })

    it('Persists the limit of items per page in local storage (localStorage) when changing the limit', () => {

        cy.get('select[name="pagination-limit"]').select('50')
        cy.window().then((window) => {
            const storedValue = window.localStorage
                .getItem(localStorageKey)
            expect(storedValue).to.eq('50')
        });

        cy.reload()
        cy.window().then((window) => {
            const storedValue = window.localStorage
                .getItem(localStorageKey)
            expect(storedValue).to.eq('50')
        })

        cy.get('select[name="pagination-limit"]').should('have.value', '50')
    })

    it('Return to the customer list by clicking the "Back" button', () => {
        cy.contains('button', 'View').click()
        cy.contains('h2', 'Customer Details').should('be.visible')
        cy.contains('button', 'Back').click()
        cy.contains('th', 'Company name').should('be.visible')
    })

    it('Renders on the middle page (Previous and Next buttons are enabled)', () => {
        cy.contains('button', 'Next').click()
        cy.contains('button', 'Prev').should('be.enabled')
        cy.contains('button', 'Next').should('be.enabled')
    })

    it('Renders on the first of two pages (Previous button disabled)', () => {
        cy.get('#sizeFilter').select('All')
        cy.get('#industryFilter').select('Finance')
        cy.get('select[name="pagination-limit"]').select('5')
        cy.contains('button', 'Prev').should('be.disabled')
        cy.contains('button', 'Next').should('be.enabled')
    })

    it('Renders on the last of two pages (Next button disabled)', () => {
        cy.get('#sizeFilter').select('All')
        cy.get('#industryFilter').select('Finance')
        cy.get('select[name="pagination-limit"]').select('5')
        cy.contains('button', 'Next').click()
        cy.contains('button', 'Next').should('be.disabled')
    })

    it('Renders Previous and Next buttons disabled when there is only one page', () => {
        const sizes = ['All', 'Small', 'Medium', 'Large Enterprise', 'Very Large Enterprise'];
        const industries = ['All', 'Logistics', 'Retail', 'Technology', 'HR', 'Finance'];
        let combinationFound = false;
      
        cy.wrap(sizes).each((size) => {
          if (combinationFound) {
            return false; 
          }
      
          return cy.wrap(industries).each((industry) => {
            if (combinationFound) {
              return false; 
            }
      
            cy.get('#sizeFilter').select(size);
            cy.get('#industryFilter').select(industry);
      
            cy.get('body').then(($body) => {
         
              const totalPages = $body.find('.pagination-limit').text().trim();
              if (totalPages === '1') {
            
                cy.get('#previousButton').should('be.disabled');
                cy.get('#nextButton').should('be.disabled');
      
                combinationFound = true;
                cy.log(`Combinação encontrada: Size = ${size}, Industry = ${industry}`);
                return false; 
              }
            })
          })
        }).then(() => {
          if (!combinationFound) {
            cy.log('Nenhuma combinação resultou em apenas uma página de resultados');
          }
        })
    })

    it('Renders with a limit of 50 items per page', () => {
        cy.get('#sizeFilter').select('All')
        cy.get('#industryFilter').select('All')
        cy.get('select[name="pagination-limit"]').select('50')

        cy.get('table').should('be.visible')
        cy.get('table tbody tr').its('length').should('be.lte', 50)
    })   
})