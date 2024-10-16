import 'cypress-axe';
import { faker } from '@faker-js/faker';

// Comando personalizado para simular falha de contraste de cores
Cypress.Commands.add('simulateContrastFailure', () => {
  cy.get('body').then(($body) => {
    $body.find('h1, h2, h3, p, span').each((index, el) => {
      cy.wrap(el).invoke('css', 'color', '#dddddd'); // Texto claro
      cy.wrap(el).invoke('css', 'background-color', '#ffffff'); // Fundo claro
    });
  });
});

// Comando personalizado para simular falta de alt em uma imagem
Cypress.Commands.add('simulateMissingAlt', () => {
  cy.get('body').then(($body) => {
    $body.append('<img src="https://via.placeholder.com/150" />'); // Imagem sem alt
  });
});

// Comando personalizado para simular um botão sem aria-label
Cypress.Commands.add('simulateMissingAriaLabel', () => {
  cy.get('body').then(($body) => {
    $body.append('<button></button>'); // Botão sem aria-label ou texto visível
  });
});


Cypress.Commands.add('validateslinksInTheFooter', () => {
  cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible');
  const stringsToValidate = [
    'Hotmart',
    'Udemy',
    'Blog',
    'YouTube'
  ];
  stringsToValidate.forEach((link) => {
    cy.contains(link).should('exist');
  });
});

//Valida o texto de saudação não informando um nome no campo de localização de cliente
Cypress.Commands.add('validatesGreetingNoGivenName', () => {

  cy.get('h2').within(() => {
    cy.contains('Hi').should('exist');
    cy.contains('there').should('exist');
    cy.contains('!').should('exist');
  });
});

//Valida o texto de saudação informando um nome no campo de localização de cliente
Cypress.Commands.add('validatesGreetingGivenName', () => {

  const clientName = faker.person.firstName();
  cy.get('#name').type(clientName);

  cy.get('h2').within(() => {
    cy.contains('Hi').should('exist');
    cy.contains(clientName).should('exist')
  });
});

Cypress.Commands.add('fillFormFromMessangerAndSend', () => {

  const titleMessage = faker.lorem.words({ min: 1, max: 3 });
  const email = faker.internet.email();
  const bodyMessage = faker.lorem.text();
  cy.get('.Messenger_openCloseButton__h0t40').click();
  cy.get('#messenger-name').type(titleMessage);
  cy.get('#email').type(email);
  cy.get('#message').type(bodyMessage);
  cy.get('.Messenger_sendButton__adJ20').click();
  cy.contains('div', 'Your message has been sent.').should('be.visible');
});

Cypress.Commands.add('fillFormMessangerAndClearInformations', () => {
  const titleMessage = faker.lorem.words({ min: 1, max: 3 });
  const email = faker.internet.email();
  const bodyMessage = faker.lorem.text();

  cy.get('.Messenger_openCloseButton__h0t40').click();

  cy.get('#messenger-name').type(titleMessage);
  cy.get('#email').type(email);
  cy.get('#message').type(bodyMessage);

  cy.get('#messenger-name').clear();
  cy.get('#email').clear();
  cy.get('#message').clear();

  cy.get('.Messenger_openCloseButton__h0t40').click();
  cy.contains('h2', 'How can we help you?').should('not.be.exist');
  cy.get('.Messenger_openCloseButton__h0t40').click();
  cy.contains('h2', 'How can we help you?').should('be.visible');
});


Cypress.Commands.add('startSession', () => {
  Cypress.on('window:before:load', window => {
    window.document.cookie = 'cookieConsent=accepted'
  })
  cy.visit('http://localhost:3000/');
});

Cypress.Commands.add('checkCompany', (index, size, industry, buttonCount) => {
  cy.get('table[class*="Table_container"] button[aria-label^="View company:"]')
    .eq(index)
    .click(); // Clica no botão "View"

  // Espera o botão "Mostrar Endereço" estar visível
  cy.get('button[class*="CustomerDetails_showAddressBtn"]', { timeout: 10000 }).should('be.visible').click();

  // Verifica se o parágrafo está presente
  cy.get('p').should('exist').then(($p) => {
    const text = $p.text().toLowerCase(); // Define 'text' aqui

    if (text.includes('no address available')) {
      cy.log(`Endereço não disponível para o item ${index + 1} na combinação Tamanho: "${size}" e Indústria: "${industry}"`);
      // Para a execução do teste sem falhar
      return; // Interrompe a execução da função
    } 

    cy.log(`Endereço disponível para o item ${index + 1} na combinação Tamanho: "${size}" e Indústria: "${industry}"`);

    // Volta para a tabela de empresas
    cy.contains('button', 'Back').click();

    // Aguarda a tabela de empresas estar visível novamente
    cy.get('table[class*="Table_container"]').should('be.visible');

    // Chama a próxima empresa, mas somente se o endereço estiver disponível
    if (index + 1 < buttonCount) {
      cy.checkCompany(index + 1, size, industry, buttonCount); // Chama a próxima empresa
      
    }
  });
});




