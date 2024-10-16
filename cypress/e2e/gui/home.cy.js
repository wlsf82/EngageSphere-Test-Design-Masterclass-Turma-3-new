import { faker } from "@faker-js/faker";

describe('Home', () => {

    beforeEach(() => {
        cy.startSession()
    })

    it(`Disable name text field when there are no customers in the database`, () => {
        const sizes = ['All', 'Small', 'Medium', 'Large Enterprise', 'Very Large Enterprise']
        const industries = ['All', 'Logistics', 'Retail', 'Technology', 'HR', 'Finance']


        cy.wrap(false).as('combinationFound')

        cy.wrap(sizes).each((size) => {
            return cy.get('@combinationFound').then((found) => {
                if (found) {
                    return false
                }

                return cy.wrap(industries).each((industry) => {
                    return cy.get('@combinationFound').then((found) => {
                        if (found) {
                            return false
                        }

                        cy.get('#sizeFilter').select(size);
                        cy.get('#industryFilter').select(industry);
                        cy.get('body').then(($body) => {
                            if ($body.text().includes('No customers available')) {
                                cy.log(`Combinação encontrada: Size = ${size}, Industry = ${industry}`);

                                cy.wrap(true).as('combinationFound');
                                return false
                            }
                        })
                    })
                })
            })
        }).then(() => {
            cy.get('@combinationFound').then((found) => {
                if (!found) {
                    cy.log('Nenhuma combinação resultou em "No customers available"')
                }
            })
        })
        cy.get('#name').should('be.disabled')
    })

    it('Shows a "Loading..." fallback element before the initial customer search', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('p', 'Loading...', { timeout: 10000 }).should('be.visible')
    })

    it('Displays the footer with the correct text and links*', () => {
        cy.validateslinksInTheFooter()
    })

    it('Displays the greeting "Hi, there" when no name is given', () => {
        cy.validatesGreetingNoGivenName()
    })

    it('Displays "Hi, Joe" greeting when name is given', () => {
        cy.validatesGreetingGivenName()
    })

    it('Displays the header with a title, theme switcher, and text input field', () => {
        cy.title().should('eq', 'EngageSphere');
        cy.get('button[class*="ThemeToggle_button"]').should('exist')
        cy.get('input[type="text"]')
            .type('Validating this field')
            .should('have.value', 'Validating this field')
    })

    it('Check if element dimensions change after filling text field with short text', () => {
        const shortText = faker.lorem.text(10)
        let initialWidth, initialHeight

        cy.get('div[class*=App_tableContainer]')
            .then($element => {
                initialWidth = $element[0].offsetWidth
                initialHeight = $element[0].offsetHeight

                cy.log(`Dimensões iniciais - Largura: ${initialWidth}, Altura: ${initialHeight}`)
            })


    
        cy.get('#name') 
            .type(shortText)

        cy.get('div[class*=App_tableContainer]')
            .then($element => {
                const newWidth = $element[0].offsetWidth;
                const newHeight = $element[0].offsetHeight;

                cy.log(`Dimensões após preenchimento - Largura: ${newWidth}, Altura: ${newHeight}`)

                if (newWidth !== initialWidth || newHeight !== initialHeight) {
                    cy.log(`Layout foi impactado! Dimensões mudaram - Largura: ${newWidth}, Altura: ${newHeight}`)
                } else {
                    cy.log('Layout permaneceu inalterado.')
                }

            })
    })

    it('Check if the element dimensions change after filling the text field with very long text', () => {
        const nameText = faker.lorem.words(300);
        let initialWidth, initialHeight;
        cy.get('div[class*=App_tableContainer]')
            .then($element => {
                initialWidth = $element[0].offsetWidth
                initialHeight = $element[0].offsetHeight
                cy.log(`Initial dimensions - Width: ${initialWidth}, Height: ${initialHeight}`)
            })

        cy.get('#name')
            .type(nameText)

        cy.get('div[class*=App_tableContainer]')
            .then($element => {
                const newWidth = $element[0].offsetWidth
                const newHeight = $element[0].offsetHeight

                cy.log(`Dimensions after filling - Width: ${newWidth}, Height: ${newHeight}`)

                if (newWidth !== initialWidth || newHeight !== initialHeight) {
                    cy.log(`Layout has been impacted! Dimensions have changed - Width: ${newWidth}, Height: ${newHeight}`)
                } else {
                    cy.log('The Layout remained unchanged.')
                }
            })
    })
})
