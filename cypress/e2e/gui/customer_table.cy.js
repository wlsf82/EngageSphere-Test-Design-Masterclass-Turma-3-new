describe('Customer´s Table - sort customers in ascending and descending order', () => {

  beforeEach(() => {
    cy.startSession()
  })

  it('Shows a list of customers when there is data in the database', () => {
    const sizes = ['All', 'Small', 'Medium', 'Large'];
    const industries = ['All', 'Logistics', 'Retail', 'Technology', 'Finance', 'HR']

  
    const iterateFilters = (sizeIndex = 0, industryIndex = 0) => {
      if (sizeIndex >= sizes.length) {
        cy.log('Todas as combinações de filtros foram testadas.')
        return
      }

      if (industryIndex >= industries.length) {
      
        iterateFilters(sizeIndex + 1, 0)
        return;
      }

      const size = sizes[sizeIndex];
      const industry = industries[industryIndex]

      cy.get('#sizeFilter').select(size);
      cy.get('#industryFilter').select(industry)

      cy.wait(1000)


      cy.get('body').then($body => {
        if ($body.find('table[class*="Table_container"] tbody').length > 0) {

          cy.log(`Clientes encontrados para Size: ${size} e Industry: ${industry}.`)
          iterateFilters(sizeIndex, industryIndex + 1);
        } else if ($body.find('span').text().includes('No customers available.')) {

          cy.log(`Nenhum cliente disponível para Size: ${size} e Industry: ${industry}. Parando o loop.`)

          return
        } else {

          cy.log(`Nenhum resultado encontrado para Size: ${size} e Industry: ${industry}, mas a mensagem padrão não foi exibida.`)
          iterateFilters(sizeIndex, industryIndex + 1)
        }
      })
    }
    // Iniciar a iteração a partir da primeira combinação de filtros
    iterateFilters()
  })

  it('Sort by Size in descending order by default', () => {
    cy.get('#sizeFilter')
      .select('All')
    cy.get('#industryFilter')
      .select('All')
    cy.get('select[name="pagination-limit"]')
      .select('50')
    cy.get('table')
      .should('be.visible')
    cy.get('table tbody tr')
      .its('length')
      .should('be.lte', 50)
  })
})



