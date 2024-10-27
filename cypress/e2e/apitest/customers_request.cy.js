/// <reference types="cypress" />

describe('All test intermediary API', {tags: 'api', env: {baseUrl: 'http://localhost:3001/customers'}}, () => {

    context('Request all customers', () => {
        beforeEach('Get request', () => {
            cy.request(Cypress.env('baseUrl')).as('customers')
        })

        it('Check status code return for all customers', () => {
            cy.get('@customers').then(({ status }) =>{
                expect(status).to.eq(200)
            })
        })

        it('Check length for return with all customers', () => {
            cy.get('@customers').then(({ body }) =>{
                expect(body.customers).to.length(10)
            })
        })
    })

    context('Request all customers with pagination', () => {
        const pagination = [1,2,3,4,5,6,7]
        it.each(pagination)('Check pagination with all customers', (page) => {
            cy.request(`${Cypress.env('baseUrl')}?page=${page}`).should(({status, body}) => {
                expect(status).to.eq(200)
                expect(body.pageInfo.currentPage).to.eq(page)
            })
        })
    })

    context('Request with get limit customer', () =>{
        const limit = [1,2,3,4,5,6,7,8,9,10]
        it.each(limit)('Filter to customers with inside limit', (limit) => {
            cy.request(`${Cypress.env('baseUrl')}?page=1&limit=${limit}`).then(({status, body}) => { 
                expect(status).to.eq(200)
                expect(body.customers).to.length(limit)
            })
        })
    })
    
    context('Request with get industry customers', () => {
        const industry = ['Logistics', 'Retail', 'HR', 'Logistics']
        it.each(industry)('Filter to customers with industry', (industry) => {
            cy.request(`${Cypress.env('baseUrl')}?page=1&industry=${industry}`).then(({status, body}) => { 
                expect(status).to.eq(200)
                expect(body.customers[0].industry).to.eq(industry)
            })
        })
    })
    context('Request with get size customers', () => {
        const sizes = ['Small','Medium','Enterprise','Large Enterprise','Very Large Enterprise']
        it.each(sizes)('Filter to customer with size', (sizes) => {
            cy.request(`${Cypress.env('baseUrl')}?page=1&size=${sizes}&industry=All`).then(({status, body}) => { 
                expect(status).to.eq(200)
                expect(body.customers[0].size).to.eq(sizes)
            })
        })
    })
    
    context('Bad Requests', () => {
        it('Check message for invalid page', () => {
            cy.request({url: `${Cypress.env('baseUrl')}?page=0`, failOnStatusCode: false}).then(({status, body}) => { 
                expect(status).to.eq(400)
                expect(body.error).to.contain('Invalid page or limit. Both must be positive numbers.')
            }) 
        })

        it('Check message for invalid limit', () => {
            cy.request({url: `${Cypress.env('baseUrl')}?page=1&limit=0`, failOnStatusCode: false}).then(({status, body}) => { 
                expect(status).to.eq(400)
                expect(body.error).to.contain('Invalid page or limit. Both must be positive numbers.')
            }) 
        })

        it('Check message for invalid page with insert string', () => {
            cy.request({url: `${Cypress.env('baseUrl')}?page=teste&limit=0`, failOnStatusCode: false}).then(({status, body}) => { 
                expect(status).to.eq(400)
                expect(body.error).to.contain('Invalid page or limit. Both must be positive numbers.')
            }) 
        })

        it('Check message for invalid limit with insert boolean', () => {
            cy.request({url: `${Cypress.env('baseUrl')}?page=teste&limit=true`, failOnStatusCode: false}).then(({status, body}) => { 
                expect(status).to.eq(400)
                expect(body.error).to.contain('Invalid page or limit. Both must be positive numbers.')
            })
        })

        it('Check message for invalid size', () => {
            const message = 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.'
            cy.request({ url: `${Cypress.env('baseUrl')}?page=1&limit=10&size=0`, failOnStatusCode: false}).then(({status, body}) => { 
                expect(status).to.eq(400)
                expect(body.error).to.contain(message)
            })
        })

        it('Check message for invalid industry', () => {
            const message = 'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.'
            cy.request({ url: `${Cypress.env('baseUrl')}?page=1&limit=10&size=All&industry=0`, failOnStatusCode: false}).then(({status, body}) => { 
                expect(status).to.eq(400)
                expect(body.error).to.contain(message)
            })
        })
    })    
})

