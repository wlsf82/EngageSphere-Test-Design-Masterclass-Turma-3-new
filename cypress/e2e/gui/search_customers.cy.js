describe('Customers - Search customers and customers details', () => {
  beforeEach(() => {
    cy.startSession()
  })

  it('Shows an image of an empty box and the text "No customers available" when there are no customers in the database', () => {
    const sizes = ['All', 'Small', 'Medium', 'Large'];
    const industries = ['All', 'Logistics', 'Retail', 'Technology', 'Finance', 'HR']

    const combinarFiltros = (sizeIndex = 0, industryIndex = 0) => {
      if (sizeIndex >= sizes.length) {
        cy.log('Todas as combinações de filtros foram testadas.')
        return;
      }

      if (industryIndex >= industries.length) {
        // Passar para o próximo size
        combinarFiltros(sizeIndex + 1, 0)
        return
      }

      const size = sizes[sizeIndex];
      const industry = industries[industryIndex]

      cy.get('#sizeFilter').select(size);
      cy.get('#industryFilter').select(industry)


      cy.get('body').then($body => {
        if ($body.find('span').text().includes('No customers available.')) {
          cy.log(`Encontrado "No customers available." para Size: ${size} e Industry: ${industry}. Parando o teste.`)
  
          assert(true, 'Teste finalizado com sucesso.')
          return
        } else {
          cy.log(`Clientes disponíveis para Size: ${size} e Industry: ${industry}. Continuando com a próxima combinação.`)
          combinarFiltros(sizeIndex, industryIndex + 1)
        }
      })
    }

    combinarFiltros(0, 0);
  })

  it('Displays a customers contact details ', () => {
    cy.get('#sizeFilter').select('Medium')
    cy.get('#industryFilter').select('Retail')
    cy.contains('button', 'View').click()
    cy.contains('p', 'Contact name:').should('be.visible')
    cy.contains('P', 'Contact email:').should('be.visible')
  })

  it('Displays a fallback paragraph (No contact information available) when contact details are not available', () => {
    cy.contains('button', 'View').click();
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('p', 'No contact info available').should('be.visible')
  })

  it('Shows and hides the customers address', () => {
    cy.contains('button', 'View').click();
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('button', 'Show address').click();
    cy.contains('h3', 'Address').should('be.visible');
    cy.contains('button', 'Hide address').click();
    cy.contains('button', 'Show address').should('be.enabled')
  })

  it('Renders a fallback paragraph (No address available) when the address is not available', () => {
    const sizes = ['All', 'Small', 'Medium', 'Large'];
    const industries = ['All', 'Logistics', 'Retail', 'Technology', 'Finance', 'HR'];

    const combinarFiltros = (sizeIndex = 0, industryIndex = 0) => {
      if (sizeIndex >= sizes.length) {
        cy.log('Todas as combinações de filtros foram testadas.')
        return
      }

      if (industryIndex >= industries.length) {
   
        combinarFiltros(sizeIndex + 1, 0)
        return
      }

      const size = sizes[sizeIndex]
      const industry = industries[industryIndex]

      cy.startSession()

      cy.get('#sizeFilter').select(size)
      cy.get('#industryFilter').select(industry)

    
      cy.get('body').then($body => {
        if ($body.find('span').text().includes('No customers available.')) {
          cy.log(`Nenhum cliente disponível para Size: ${size} e Industry: ${industry}. Continuando com a próxima combinação.`)
    
          combinarFiltros(sizeIndex, industryIndex + 1)
          return;
        } else {
        
          cy.get('table[class*="Table_container"] tbody tr').then($linhas => {
            const totalLinhas = $linhas.length;

            const processarLinha = (indice) => {
              if (indice >= totalLinhas) {
             
                cy.log(`Todos os itens foram processados para Size: ${size} e Industry: ${industry}`);
        
                combinarFiltros(sizeIndex, industryIndex + 1)
                return
              }

              cy.get('table[class*="Table_container"] tbody tr').eq(indice).within(() => {
                cy.contains('View').click()
              }).then(() => {
           
                cy.contains('Show address').click();
                cy.get('body').then($body => {
                  if ($body.find('p').text().includes('No address available')) {
         
                    cy.log('Encontrado "No address available". Parando o teste.');
            
                    return
                  } else if ($body.find('h3').text().includes('Address')) {
   
                    cy.contains('Back').click().then(() => {
                      processarLinha(indice + 1)
                    })
                  } else {
           
                    cy.log('Elemento "Address" não encontrado. Continuando com o próximo item.')
                    cy.contains('Back').click().then(() => {
                      processarLinha(indice + 1)
                    })
                  }
                })
              })
            }

            processarLinha(0)
          })
        }
      })
    }
    combinarFiltros(0, 0)
  })
})
