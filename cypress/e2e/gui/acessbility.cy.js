describe('Accessibility - Check accessibility in Light and Dark mode', () => {

  beforeEach(() => {
    cy.startSession();
  });


  it('No accessibility issues found in light mode in customer table', () => {
    cy.injectAxe();
    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
    cy.checkA11y(null, null, terminalLog)

    function terminalLog(violations) {
      if (violations.length) {
        cy.log(`${violations.length} problemas de acessibilidade encontrados`)
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.log(`ID: ${id}`);
          cy.log(`Impacto: ${impact}`);
          cy.log(`Descrição: ${description}`)
          nodes.forEach(({ target }) => {
            cy.log(`Elemento: ${target}`)
          })
        })
      }
    }
  })

  it('No accessibility issues found in dark mode in customer table', () => {
    cy.injectAxe()
    cy.get('button').should('have.attr', 'aria-label', 'theme light activated');
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click();
    cy.checkA11y(null, null, terminalLog)

    function terminalLog(violations) {
      if (violations.length) {
        cy.log(`${violations.length} problemas de acessibilidade encontrados`);
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.log(`ID: ${id}`);
          cy.log(`Impacto: ${impact}`);
          cy.log(`Descrição: ${description}`)
          nodes.forEach(({ target }) => {
            cy.log(`Elemento: ${target}`)
          });
        })
      }
    }
  })

  it('No accessibility issues in light mode in customer details and address view', () => {
    cy.injectAxe()

    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click()
    cy.checkA11y(null, null, terminalLog)

    function terminalLog(violations) {
      if (violations.length) {
        cy.log(`${violations.length} problemas de acessibilidade encontrados`);
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.log(`ID: ${id}`)
          cy.log(`Impacto: ${impact}`)
          cy.log(`Descrição: ${description}`)
          nodes.forEach(({ target }) => {
            cy.log(`Elemento: ${target}`)
          })
        })
      }
    }
  })

  it('No accessibility issues in dark mode in customer address and details view', () => {
    cy.injectAxe()

    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click()
    cy.checkA11y(null, null, terminalLog)

    function terminalLog(violations) {
      if (violations.length) {
        cy.log(`${violations.length} problemas de acessibilidade encontrados`);
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.log(`ID: ${id}`);
          cy.log(`Impacto: ${impact}`)
          cy.log(`Descrição: ${description}`)
          nodes.forEach(({ target }) => {
            cy.log(`Elemento: ${target}`)
          })
        })
      }
    }
  })

  it('Finds accessibility issues in light mode and counts how many were found', () => {
    cy.injectAxe();
    cy.get('button').should('have.attr', 'aria-label', 'theme light activated');
    cy.simulateContrastFailure();


    cy.checkA11y(null, null, (violations) => {
      if (violations.length > 0) {
        cy.log(`Problemas de acessibilidade encontrados: ${violations.length}`);
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.log(`ID: ${id}`);
          cy.log(`Impacto: ${impact}`);
          cy.log(`Descrição: ${description}`)
          nodes.forEach(({ target }) => {
            cy.log(`Elemento: ${target}`)
          });
        })
      } else {
        cy.log('Nenhum problema de acessibilidade encontrado');
      }
    }, { skipFailures: true })
  
  })

  it('Find accessibility issues in dark mode and count how many were found', () => {
    cy.injectAxe()

    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click()
    cy.simulateContrastFailure()

    cy.checkA11y(null, null, (violations) => {
      if (violations.length > 0) {
        cy.log(`Problemas de acessibilidade encontrados: ${violations.length}`)
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.log(`ID: ${id}`)
          cy.log(`Impacto: ${impact}`)
          cy.log(`Descrição: ${description}`)
          nodes.forEach(({ target }) => {
            cy.log(`Elemento: ${target}`)
          });
        });
      } else {
        cy.log('Nenhum problema de acessibilidade encontrado')
      }
    }, { skipFailures: true })
  })

  it('No accessibility issues with floating messenger button in dark mode', () => {
    cy.injectAxe()

    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click()
    cy.get('.Messenger_openCloseButton__h0t40')
      .should('be.visible')
      .should('have.attr', 'aria-label', 'Open messenger')

    cy.get('button[aria-label="Open messenger"]').then(($btn) => {
      cy.checkA11y($btn, {
        
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      })
    })

    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.log(`${violations.length} violações de acessibilidade encontradas`)
        violations.forEach((violation) => {
          cy.log(`${violation.id}: ${violation.description}`);
        })
        
        throw new Error('Acessibilidade falhou com base nas violações encontradas')
      }
    })
  })
  
})