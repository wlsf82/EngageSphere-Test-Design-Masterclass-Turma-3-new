describe('GUI Tests', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/');
  });

  const selectCompanySize = (size) => {
    cy.get('[data-testid="size-filter"]').select(size);
  };

  const clickViewCompanyButton = (companyName) => {
    cy.get('[data-testid="table"] tbody tr').contains(companyName)
      .parent()
      .within(() => {
        cy.get('button').contains('View').click();
      });
  };

  const clickBackButton = () => {
    cy.get('button').contains('Back').click();
  }

  const clickFirstViewButton = () => {
    cy.get('[data-testid="table"] tbody tr')
      .first()
      .within(() => {
        cy.get('button').contains('View').click();
      });
  }

  it('Should maintain filters when returning from customer details', () => {
    selectCompanySize('Small');
    cy.get('[data-testid="table"] tbody tr').should('have.length', 1).and('contain.text', 'Small');
    clickViewCompanyButton('Jacobs Co');
    cy.contains('Customer Details');
    clickBackButton();
    cy.get('[data-testid="table"] tbody tr').should('have.length', 1).and('contain.text', 'Small');
  });

  it('Should return to the customer list after clicking back', () => {
    clickFirstViewButton();
    cy.contains('Customer Details');
    clickBackButton();
    cy.get('[data-testid="table"] tbody tr').should('have.length', 10)
  });

  //não consegui pensar em uma maneira simples de fazer esse cara, queria verificar se cada link estava mandando pro lugar correto tbm
  it('Should display the footer with the correct text and links', () => {
    cy.get('footer')
      .should('be.visible')
      .contains('Copyright 2024 - Talking About Testing');
  
    const links = [
      { text: 'Hotmart', href: 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem' },
      { text: 'Udemy', href: 'https://udemy.com/user/walmyr' },
      { text: 'Blog', href: 'https://talkingabouttesting.com' },
      { text: 'YouTube', href: 'https://youtube.com/@talkingabouttesting' }
    ];

    cy.get('footer a')
      .should('have.length', links.length)
      .each(($el, index) => {
        cy.wrap($el).should('have.text', links[index].text);
        cy.wrap($el).should('have.attr', 'href', links[index].href);
      });
  });

  it('Should displays the greeting "Hi, there" when no name is given', () => {
    cy.get('input[type="text"]').should('have.value', '');
    cy.get('[data-testid="table"] h2').should('contain.text', 'Hi there!');
  });

  it('Should displays the greeting "Hi, Joe" when the name Joe is given', () => {
    cy.get('input[type="text"]').type('Joe');
    cy.get('[data-testid="table"] h2').should('contain.text', 'Hi Joe!');
  });

  it('Should display title, theme switcher and input fielda', () => {
    cy.get('h1').should('contain.text', 'EngageSphere');
    cy.get('.ThemeToggle_button__dKJr0').should('be.visible')
    cy.get('input[type="text"]').should('be.visible');
  });

  it('Should open and close the messenger', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('.Messenger_header__7JITT').should('contain.text', 'How can we help you?');
    cy.get('[aria-label="Close messenger"]').click();
  });

  it('Should ensures that all messenger fields are mandatory and that the first one is focused', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('.Messenger_input__xCorb, textarea').each(($el) => {
      cy.wrap($el).should('have.attr', 'required');
    });
    cy.get('.Messenger_input__xCorb').first().should('have.focus');
  });

  it('Should show and hide a success message upon successfully sending the messenger form', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('#messenger-name').type('Eduardo Effting');
    cy.get('#email').type('eduardoeffs@gmail.com');
    cy.get('#message').type('Test message');
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should('be.visible').and('contain', 'Your message has been sent.');
    cy.wait(3000);
    cy.get('[role="alert"]').should('not.exist');
  });

  it('Should clears all messenger form fields when you fill them in, close the messenger, and open it again', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('#messenger-name').type('Eduardo Effting');
    cy.get('#email').type('eduardoeffs@gmail.com');
    cy.get('#message').type('Test message');
    cy.get('button[type="submit"]').click();
    cy.get('.Messenger_input__xCorb, textarea').each(($el) => {
      cy.wrap($el).should('have.value', '');
    });
    cy.get('[aria-label="Close messenger"]').click();
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('.Messenger_input__xCorb, textarea').each(($el) => {
      cy.wrap($el).should('have.value', '');
    });
  });

  it('Should display "Company name" and "Action" columns and hide "ID", "Industry", "Number of employees", and "Size" columns', () => {
    cy.viewport('iphone-6');
    cy.get('table')
      .contains('Company name')
      .should('be.visible');
    cy.get('table')
      .contains('Action')
      .should('be.visible');
    cy.get('table')
      .contains('ID')
      .should('not.be.visible');
    cy.get('table')
      .contains('Industry')
      .should('not.be.visible');
    cy.get('table')
      .contains('Number of employees')
      .should('not.be.visible');
    cy.get('table')
      .contains('Size')
      .should('not.be.visible');
  });
});