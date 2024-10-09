// tetse exercicios iniciais !!//
describe('API de Clientes', { defaultCommandTimeout: 10000 }, () => {
    const API_URL = 'http://localhost:3001'
    const UI_URL = 'http://localhost:3000'
  
    const clickCookieConsent = () => {
      cy.wait(2000) // Espera 2 segundos para garantir que a página carregou completamente
      cy.get('body').then($body => {
        if ($body.find('.CookieConsent_buttons__94qJE > :nth-child(1) > button').length > 0) {
          cy.get('.CookieConsent_buttons__94qJE > :nth-child(1) > button')
            .click({ force: true })
            .then(() => {
              cy.log('Cookie consent clicked');
            });
        } else {
          cy.log('Cookie consent button not found');
        }
      });
    }
  
    beforeEach(() => {
      cy.visit(UI_URL, {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('cookieConsent', 'true');
        },
      })
      clickCookieConsent()
    })
  
    it('retorna uma lista de clientes com paginação padrão', () => {
      cy.request(`${API_URL}/customers`).then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body).to.have.property('customers')
        expect(body.customers).to.have.length(10)
        expect(body).to.have.property('pageInfo')
        expect(body.pageInfo.currentPage).to.eq(1)
      })
    })
  
    it('lida com paginação personalizada', () => {
      cy.request(`${API_URL}/customers?page=2&limit=5`).then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.customers).to.have.length(5)
        expect(body.pageInfo.currentPage).to.eq('2')
      })
    })
  
    it('filtra clientes por tamanho', () => {
      cy.request(`${API_URL}/customers?size=Small`).then(({ status, body }) => {
        expect(status).to.eq(200)
        body.customers.forEach((customer) => {
          expect(customer.size).to.eq('Small')
        })
      })
    })
  
    it('filtra clientes por indústria', () => {
      cy.request(`${API_URL}/customers?industry=Technology`).then(({ status, body }) => {
        expect(status).to.eq(200)
        body.customers.forEach((customer) => {
          expect(customer.industry).to.eq('Technology')
        })
      })
    })
  
    it('lida com parâmetro de página inválido', () => {
      cy.request({
        url: `${API_URL}/customers?page=invalid`,
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
      })
    })
  
    it('lida com parâmetro de tamanho inválido', () => {
      cy.request({
        url: `${API_URL}/customers?size=Invalid`,
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
      })
    })
  
    it('lida com parâmetro de indústria inválido', () => {
      cy.request({
        url: `${API_URL}/customers?industry=Invalid`,
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.eq(400)
        expect(body.error).to.eq('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.')
      })
    })
  
    it('retorna a estrutura correta dos dados do cliente', () => {
      cy.request(`${API_URL}/customers`).then(({ status, body }) => {
        expect(status).to.eq(200)
        const customer = body.customers[0]
        expect(customer).to.have.all.keys('id', 'name', 'employees', 'industry', 'contactInfo', 'address', 'size')
        if (customer.contactInfo) {
          expect(customer.contactInfo).to.have.all.keys('name', 'email')
        }
        if (customer.address) {
          expect(customer.address).to.have.all.keys('street', 'city', 'state', 'zipCode', 'country')
        }
      })
    })
  })