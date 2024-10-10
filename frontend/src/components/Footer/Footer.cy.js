import { mount } from 'cypress/react18';
import Footer from '.'

describe('Footer', () => {
  it('It renders the footer with the right text and links', () => {
    mount(<Footer />);
    cy.contains('Copyright 2024 - Talking About Testing').should('be.visible');
    cy.contains('Hotmart').should('be.visible').and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem');
    cy.contains('Udemy').should('be.visible').and('have.attr', 'href', 'https://udemy.com/user/walmyr');
    cy.contains('Blog').should('be.visible').and('have.attr', 'href', 'https://talkingabouttesting.com');
    cy.contains('YouTube').should('be.visible').and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');
  });
});