// cypress/e2e/api_clients.spec.js

describe('API de Clientes', () => {
  const BASE_URL = 'http://localhost:3001';
  const ENDPOINT = '/customers'; 


  it('CT01: Recupera clientes com sucesso', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('customers')
      expect(response.body).to.have.property('pageInfo')
     
    });
  });

  it('CT02: Realiza a paginação de clientes corretamente', () => {
    const page = 2;
    const limit = 10;

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { page, limit },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.customers).to.have.length.at.most(limit)

      cy.log(JSON.stringify(response.body.pageInfo))

  
      expect(response.body.pageInfo).to.have.property('currentPage', page)

      if (response.body.pageInfo.hasOwnProperty('limit')) {
        expect(response.body.pageInfo.limit).to.eq(limit)
      } else if (response.body.pageInfo.hasOwnProperty('pageSize')) {
        expect(response.body.pageInfo.pageSize).to.eq(limit)
      } else if (response.body.pageInfo.hasOwnProperty('perPage')) {
        expect(response.body.pageInfo.perPage).to.eq(limit)
      } else {
        cy.log('Nenhuma propriedade correspondente a "limit" foi encontrada em "pageInfo".')
      }

      expect(response.body.pageInfo).to.have.property('totalPages')
    
    })
  })


  it('CT03: Filtra corretamente o limite de clientes', () => {
    const limit = 5;

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { limit },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.customers).to.have.length.at.most(limit)
    });
  });


  it('CT04: Filtra clientes corretamente pelo tamanho', () => {
    const size = 'Medium'

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { size },
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.customers.forEach((client) => {
        expect(client.size).to.eq(size)
      })
    })
  })


  it('CT05: Filtra clientes corretamente pela indústria', () => {
    const industry = 'Technology';

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { industry },
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.customers.forEach((client) => {
        expect(client.industry).to.eq(industry);
      });
    });
  });


  it('CT06: Trata requisições inválidas com página negativa', () => {
    const page = -1;

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { page },
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });


  it('CT07: Trata requisições inválidas com limite negativo', () => {
    const limit = -10;

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { limit },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('CT08: Trata requisições inválidas com página como string', () => {
    const page = 'dois';

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { page },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });


  it('CT09: Trata requisições inválidas com limite como booleano', () => {
    const limit = true;

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { limit },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('CT10: Trata requisições inválidas com tamanho não suportado', () => {
    const size = 'Gigantic';

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { size },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property(
        'error',
        'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.'
      )
    })
  })


  it('CT11: Trata requisições inválidas com indústria não suportada', () => {
    const industry = 'Automotive';

    cy.request({
      method: 'GET',
      url: `${BASE_URL}${ENDPOINT}`,
      qs: { industry },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        'error',
        'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.'
      );
    });
  });
});
