describe('EngageSphere e2e Tests', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/');
    cy.injectAxe();
  });
  
  it('Mantém os filtros ao voltar da visualização de detalhes do cliente', () => {
    cy.get('[data-testid="size-filter"]').select('Medium');
    cy.get('[data-testid="industry-filter"]').select('Technology');
    cy.contains('button', 'View').click();
    cy.contains('button', 'Back').click();
    cy.get('[data-testid="size-filter"]').should('have.value', 'Medium');
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Technology');
  });

  it('Retorna à lista de clientes ao clicar no botão "Voltar"', () => {
    cy.get('[data-testid="size-filter"]').select('Medium');
    cy.get('[data-testid="industry-filter"]').select('Technology');
    cy.contains('button', 'View').click();
    cy.contains('button', 'Back').click();
    cy.contains('[data-testid="table"]', 'Below is our customer list.')
      .should('be.visible');
  });

  it('Exibir o rodapé com o texto e links corretos', () => {
    cy.contains('p', 'Copyright 2024 - Talking About Testing')
      .should('be.visible');
    cy.contains('a', 'Hotmart')
      .should('be.visible')
      .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem');
    cy.contains('a', 'Udemy')
      .should('be.visible')
      .and('have.attr', 'href', 'https://udemy.com/user/walmyr');
    cy.contains('a', 'Blog')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talkingabouttesting.com');
    cy.contains('a', 'YouTube')
      .should('be.visible')
      .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');
  });

  it('Exibe a saudação "Hi there" quando nenhum nome é fornecido', () => {
    cy.contains('h2', 'Hi there!');
  });

  it('Exibe a saudação "Hi Joao" quando o nome é fornecido', () => {
    cy.get('[data-testid="name"]').type('Joao');
    cy.contains('h2', 'Hi Joao!');
  });

  it('Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto', () => {
    cy.get('[class^="Header_container"]').should('contain', 'EngageSphere');
    cy.get('[class^="ThemeToggle_button"]').should('be.visible');
    cy.get('[data-testid="name"]').should('be.visible');
  });

  it('Abre e fecha o messenger', () => {
    cy.get('[class^="Messenger_openCloseButton"]')
      .should('have.attr', 'aria-label', 'Open messenger');
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('[class^="Messenger_openCloseButton"]')
      .should('have.attr', 'aria-label', 'Close messenger');
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('[class^="Messenger_openCloseButton"]')
      .should('have.attr', 'aria-label', 'Open messenger');
  });

  it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('#messenger-name').should('have.attr', 'required');
    cy.get('#email').should('have.attr', 'required');
    cy.get('#message').should('have.attr', 'required');
    cy.get('#messenger-name:first').should('be.focused');
  })

  it('Mostra e oculta uma mensagem de sucesso ao enviar o formulário do messenger com sucesso', () => {
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.clock()
    cy.get('#messenger-name').type('joao');
    cy.get('#email').type('joao@teste.com');
    cy.get('#message').type('Testando');
    cy.get('[class^="Messenger_sendButton"]').click();
    cy.contains('Your message has been sent').should('be.visible')
    cy.tick(3000)
    cy.contains('Your message has been sent').should('not.exist')
  })

  it('Limpa todos os campos do formulário do messenger ao preenchê-los, fechar o messenger e abri-lo novamente', () => {
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').type('joao');
    cy.get('#email').type('joao@teste.com');
    cy.get('#message').type('Testando');
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').should('contain', '');
    cy.get('#email').should('contain', '');
    cy.get('#message').should('contain', '');
  })

  it('Mostra as colunas Nome da Empresa e Ação, e oculta as colunas ID, Indústria, Número de Funcionários e Tamanho em um viewport móvel', () => {
    cy.viewport('iphone-x');
    cy.contains('th', 'Company name').should('be.visible');
    cy.contains('th', 'Action').should('be.visible');
    cy.contains('th', 'ID').should('not.be.visible');
    cy.contains('th', 'Number of employees').should('not.be.visible');
    cy.contains('th', 'Size').should('not.be.visible');
  })

  it('Não encontra problemas de acessibilidade no modo claro na tabela de clientes', () => {
    cy.checkA11y();
  })

  it('Não encontra problemas de acessibilidade no modo escuro na tabela de clientes', () => {
    cy.get('[class^="ThemeToggle_button"]').click();
    cy.checkA11y();
  })

  it('Não encontra problemas de acessibilidade no modo claro na visualização de detalhes e endereço do cliente', () => {
    cy.contains('button', 'View').click();
    cy.contains('button', 'Show address').click();
    cy.checkA11y();
  })

  it('Não encontra problemas de acessibilidade no modo escuro na visualização de detalhes e endereço do cliente', () => {
    cy.contains('button', 'View').click();
    cy.contains('button', 'Show address').click();
    cy.get('[class^="ThemeToggle_button"]').click();
    cy.checkA11y();
  })

  it('Não encontra problemas de acessibilidade no botão flutuante do messenger no modo escuro', () => {
    cy.get('[class^="ThemeToggle_button"]').click();
    cy.checkA11y('[class^="Messenger_openCloseButton"]');
  })
});
