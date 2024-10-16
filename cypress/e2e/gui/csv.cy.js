describe('CSV File - Download a CSV file and assert header only', () => {
    const path = require('path')

    it('CT21 - Correctly downloads a customer list as a CSV file with header validation only', () => {
        cy.startSession();
        cy.contains('button', 'Download CSV').click()

        const downloadsFolder = Cypress.config('downloadsFolder')
        cy.wait(5000)

        cy.task('getDownloadedFile', { downloadsFolder }).then((fileName) => {
            if (!fileName) {
                throw new Error('Nenhum arquivo CSV foi baixado.')
            }
            const filePath = path.join(downloadsFolder, fileName)
            cy.readFile(filePath, { timeout: 10000 }).should('exist')
            cy.fixture('expectedCsvHeader.json').then((expectedData) => {
                cy.readFile(filePath).then((fileContent) => {
                    const csvHeader = fileContent.split('\n')[0].split(',')
                    csvHeader.forEach((headerField, index) => {
                        expect(headerField.trim()).to.equal(expectedData.header[index])
                    })
                })
            })
        })
    })
})
