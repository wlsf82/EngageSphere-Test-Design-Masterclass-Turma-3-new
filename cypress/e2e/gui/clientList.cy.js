// cypress/e2e/gui/clientList.cy.js

describe('Lista de Clientes', () => {
    const API_URL = Cypress.env('API_URL');
  
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.document.cookie = 'cookieConsent=accepted';
        },
      });
    });
  
    it('Mantém os filtros ao retornar da visualização de detalhes do cliente', () => {
      cy.get('[data-testid="size-filter"]').select('Small');
      cy.get('[data-testid="customer-row"]').first().click();
      cy.get('[data-testid="back-button"]').click();
      cy.get('[data-testid="size-filter"]').should('have.value', 'Small');
    });
  
    it('Filtra por tamanho pequeno', () => {
      cy.get('[data-testid="size-filter"]').select('Small');
      cy.get('[data-testid="customer-row"]').each(($row) => {
        cy.wrap($row).find('[data-testid="customer-size"]').should('contain', 'Small');
      });
    });
  
    it('Persiste o limite de itens por página no armazenamento local ao alterar o limite', () => {
      cy.get('[data-testid="items-per-page"]').select('50');
      cy.reload();
      cy.get('[data-testid="items-per-page"]').should('have.value', '50');
    });
  
    it('Retorna para a lista de clientes ao clicar no botão "Voltar"', () => {
      cy.get('[data-testid="customer-row"]').first().click();
      cy.get('[data-testid="back-button"]').click();
      cy.url().should('not.include', '/customer/');
    });
  
    it('Mostra a imagem de uma caixa vazia e o texto "Nenhum cliente disponível" quando não há clientes no banco de dados', () => {
      cy.intercept('GET', `${API_URL}/customers*`, { body: { customers: [] } }).as('getEmptyCustomers');
      cy.visit('/');
      cy.wait('@getEmptyCustomers');
      cy.get('[data-testid="empty-state"]').should('be.visible');
      cy.contains('Nenhum cliente disponível').should('be.visible');
    });
  
    it('Desabilita o campo de entrada de texto do nome quando não há clientes no banco de dados', () => {
      cy.intercept('GET', `${API_URL}/customers*`, { body: { customers: [] } }).as('getEmptyCustomers');
      cy.visit('/');
      cy.wait('@getEmptyCustomers');
      cy.get('[data-testid="name-filter"]').should('be.disabled');
    });
  
    it('Mostra um elemento de fallback Carregando... antes da busca inicial dos clientes', () => {
      cy.intercept('GET', `${API_URL}/customers*`, { delay: 1000, body: { customers: [] } }).as('getDelayedCustomers');
      cy.visit('/');
      cy.contains('Carregando...').should('be.visible');
      cy.wait('@getDelayedCustomers');
    });
  
    it('retorna uma lista de clientes com paginação padrão', () => {
      cy.request(`${API_URL}/customers`).then(({ status, body }) => {
        cy.log('Response status:', status);
        cy.log('Response body:', JSON.stringify(body));
  
        expect(status).to.eq(200);
        expect(body).to.have.property('customers').that.is.an('array');
        expect(body.customers).to.have.length(10);
        expect(body).to.have.property('pageInfo');
        expect(body.pageInfo.currentPage).to.eq(1);
      });
    });
  
    it('lida com paginação personalizada', () => {
      cy.request(`${API_URL}/customers?page=2&limit=5`).then(({ status, body }) => {
        cy.log('Response status:', status);
        cy.log('Response body:', JSON.stringify(body));
  
        expect(status).to.eq(200);
        expect(body.customers).to.have.length(5);
        expect(body.pageInfo.currentPage).to.eq(2);
      });
    });
  
    it('filtra clientes por tamanho', () => {
      cy.request(`${API_URL}/customers?size=Small`).then(({ status, body }) => {
        cy.log('Response status:', status);
        cy.log('Response body:', JSON.stringify(body));
  
        expect(status).to.eq(200);
        body.customers.forEach((customer) => {
          expect(customer.size).to.eq('Small');
        });
      });
    });
  
    it('filtra clientes por indústria', () => {
      cy.request(`${API_URL}/customers?industry=Technology`).then(({ status, body }) => {
        cy.log('Response status:', status);
        cy.log('Response body:', JSON.stringify(body));
  
        expect(status).to.eq(200);
        body.customers.forEach((customer) => {
          expect(customer.industry).to.eq('Technology');
        });
      });
    });
  });