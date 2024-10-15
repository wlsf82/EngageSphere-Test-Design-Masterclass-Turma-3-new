describe('EngageSphere e2e Tests', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })

    cy.visit('/');
  });
  
  it('Mantém os filtros ao voltar da visualização de detalhes do cliente', () => {
    cy.filterClient();
    cy.get('tbody > :nth-child(1) > :nth-child(6)').click();
    cy.contains('button', 'Back').click();
    cy.validateFilter();
  });

  it('Retorna à lista de clientes ao clicar no botão "Voltar"', () => {
    cy.filterClient();
    cy.get('tbody > :nth-child(1) > :nth-child(6)').click();
    cy.contains('button', 'Back').click();
    cy.get('[data-testid="table"]').should('contain', 'Below is our customer list.')
      .and('contain', 'Click on the View button of each of them to see their contact details.')
  });

  it('Exibir o rodapé com o texto e links corretos', () => {
    cy.get('[data-testid="footer"]').should('be.visible')
      .and('contain', 'Copyright 2024 - Talking About Testing')
      .and('contain', 'Hotmart')
      .and('contain', 'Udemy')
      .and('contain', 'Blog')
      .and('contain', 'YouTube')

    cy.get('[data-testid="footer"] a').eq(0).should('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem');
    cy.get('[data-testid="footer"] a').eq(1).should('have.attr', 'href', 'https://udemy.com/user/walmyr');
    cy.get('[data-testid="footer"] a').eq(2).should('have.attr', 'href', 'https://talkingabouttesting.com');
    cy.get('[data-testid="footer"] a').eq(3).should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');
  });

  it('Exibe a saudação "Hi there" quando nenhum nome é fornecido', () => {
    cy.get('[data-testid="name"]').should('have.value', '')
    cy.contains('h2', 'Hi there!')
  });

  it('Exibe a saudação "Hi Joao" quando o nome é fornecido', () => {
    cy.get('[data-testid="name"]').type('Joao')
    cy.contains('h2', 'Hi Joao!')
  });

  it('Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto', () => {
    cy.get('.Header_container__NIoI4').should('contain', 'EngageSphere')
    cy.get('.ThemeToggle_button__YJE2A').should('be.visible')
    cy.get('[data-testid="name"]').should('be.visible')
  });

  it('Abre e fecha o messenger', () => {
    cy.get('.Messenger_openCloseButton__nHnVG')
      .should('have.attr', 'aria-label', 'Open messenger');
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    cy.get('.Messenger_openCloseButton__nHnVG')
      .should('have.attr', 'aria-label', 'Close messenger');
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    cy.get('.Messenger_openCloseButton__nHnVG')
      .should('have.attr', 'aria-label', 'Open messenger');
  });

  it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    
    cy.get('button[type="submit"]').click();

    cy.get('#messenger-name').then(($input) => {
      expect($input[0].validationMessage).to.eq('Preencha este campo.');
    });
    
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq('Preencha este campo.');
    });

    cy.get('#message').then(($textarea) => {
      expect($textarea[0].validationMessage).to.eq('Preencha este campo.');
    });
  })

  it('Mostra e oculta uma mensagem de sucesso ao enviar o formulário do messenger com sucesso', () => {
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    cy.fillMessageData();
    cy.get('.Messenger_sendButton__C7oum').click();
    cy.get('.Messenger_success__mzX3n').should('be.visible')
      .should('contain', 'Your message has been sent.')
      cy.wait(3500)
      .should('not.exist');
  })

  it('Limpa todos os campos do formulário do messenger ao preenchê-los, fechar o messenger e abri-lo novamente', () => {
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    cy.fillMessageData();
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    cy.get('.Messenger_openCloseButton__nHnVG').click();
    cy.get('#messenger-name').should('contain', '');
    cy.get('#email').should('contain', '');
    cy.get('#message').should('contain', '');
  })

  it('Mostra as colunas Nome da Empresa e Ação, e oculta as colunas ID, Indústria, Número de Funcionários e Tamanho em um viewport móvel', () => {
    cy.viewport('iphone-x');
    cy.get('.Table_container__GUbUJ > thead > tr > th:nth-child(2)').should('be.visible');
    cy.get('.Table_container__GUbUJ > thead > tr > th:nth-child(6)').should('be.visible');
    cy.get('.Table_container__GUbUJ > thead > tr > th:nth-child(1)').should('not.be.visible');
    cy.get('.Table_container__GUbUJ > thead > tr > th:nth-child(3)').should('not.be.visible');
    cy.get('.Table_container__GUbUJ > thead > tr > th:nth-child(4)').should('not.be.visible');
    cy.get('.Table_container__GUbUJ > thead > tr > th:nth-child(5)').should('not.be.visible');
  })
})