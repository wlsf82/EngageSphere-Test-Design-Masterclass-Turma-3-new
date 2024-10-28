import CustomerDetails from '.';

describe('Customer Details', () => {
  it('renders a fallback paragraph when contact details are not available', () => {
    cy.mount(<CustomerDetails customer={{}} />);
    
    cy.contains('No contact info available').should('be.visible');
  });

  it('renders a fallback paragraph when address details are not available', () => {
    cy.mount(<CustomerDetails customer={{}} />);

    cy.getByClassThatStartsWith('CustomerDetails_showAddressBtn').click();

    cy.contains('No address available').should('be.visible');
  });
});
