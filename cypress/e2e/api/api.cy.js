const API_URL = Cypress.env('apiURL')
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

it('Recupera clientes com sucesso', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
  }).then(({status, body }) => {
    expect(status).to.eq(200);
    expect(body).to.have.property('customers').and.to.be.an('array');
  });
});

it('Realiza a paginação de clientes corretamente', () => {
  const totalPages = 5;
  for (let page = 1; page <= totalPages; page++)
    cy.request({
      method: 'GET',
      url: CUSTOMERS_API_URL,
      qs: {
        'page': page,
      }
    }).then(({status, body }) => {
      expect(status).to.eq(200);
      expect(body.pageInfo).to.have.property('currentPage', page);
    });
});

it('Filtra corretamente o limite de clientes', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'limit': 10,
    }
  }).then(({status, body }) => {
    expect(status).to.eq(200);
    expect(body.customers).to.have.length(10);
  });
})

it('Filtra clientes corretamente pelo tamanho', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'size': 'Small',
    }
  }).then(({status, body }) => {
    expect(status).to.eq(200);
    expect(body.customers[0]).to.have.property('size', 'Small')
  });
})

it('Filtra clientes corretamente pela indústria', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'industry': 'Logistics',
    }
  }).then(({status, body }) => {
    expect(status).to.eq(200);
    expect(body.customers[0]).to.have.property('industry', 'Logistics')
  });
})

it('Trata requisições inválidas (por exemplo, página negativa)', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'page': -1,
    },
    failOnStatusCode: false
  }).then(({status, body }) => {
    expect(status).to.eq(400);
    expect(body).to.have.property('error');
    expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
  });
})

it('Trata requisições inválidas (por exemplo, limite negativo)', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'limit': -1,
    },
    failOnStatusCode: false
  }).then(({status, body }) => {
    expect(status).to.eq(400);
    expect(body).to.have.property('error');
    expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
  });
})

it('Trata requisições inválidas (por exemplo, página como string)', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'page': 'invalidString',
    },
    failOnStatusCode: false
  }).then(({status, body }) => {
    expect(status).to.eq(400);
    expect(body).to.have.property('error');
    expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
  });
})

it('Trata requisições inválidas (por exemplo, limite como booleano)', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'page': true,
    },
    failOnStatusCode: false
  }).then(({status, body }) => {
    expect(status).to.eq(400);
    expect(body).to.have.property('error');
    expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
  });
})

it('Trata requisições inválidas (por exemplo, tamanho não suportado)', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'size': 'Logistics',
    },
    failOnStatusCode: false
  }).then(({status, body }) => {
    expect(status).to.eq(400);
    expect(body).to.have.property('error').and.to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
  });
})

it('Trata requisições inválidas (por exemplo, indústria não suportada)', () => {
  cy.request({
    method: 'GET',
    url: CUSTOMERS_API_URL,
    qs: {
      'industry': 'Small',
    },
    failOnStatusCode: false
  }).then(({status, body }) => {
    expect(status).to.eq(400);
    expect(body).to.have.property('error').and.to.eq('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.');
  });
})
