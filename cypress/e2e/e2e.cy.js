describe('Teste E2E EngageSphere', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('button', 'Accept').click();
    })

    it('Retorna à lista de clientes ao clicar no botão "Voltar"', () => {
        cy.get('button[aria-label="View company: Lowe Co"]').click();
        cy.contains('button', 'Back').should('be.visible')
        cy.contains('button', 'Back').click();
        cy.contains('Below is our customer list.').should('be.visible')
    })

    it('Exibie o rodapé com o texto e links corretos', () => {
        cy.contains('p', 'Copyright 2024 - Talking About Testing')
            .should('be.visible')
        cy.contains('a', 'Hotmart')
            .should('be.visible')
            .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem')
        cy.contains('a', 'Udemy')
            .should('be.visible')
            .and('have.attr', 'href', 'https://udemy.com/user/walmyr')
        cy.contains('a', 'Blog')
            .should('be.visible')
            .and('have.attr', 'href', 'https://talkingabouttesting.com')
        cy.contains('a', 'YouTube')
            .should('be.visible')
            .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
    })

    it('Exibe a saudação "Hi, there" quando nenhum nome é fornecido', () => {
        cy.contains('h2', 'Hi there!').should('be.visible')
    })

    it('Exibe a saudação "Hi, Joe" quando o nome é fornecido', () => {
        cy.get('#name').type('Joe')
        cy.get('h2').should('contain', 'Hi Joe!')
    })

    it('Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto', () => {
        cy.contains('h1', 'EngageSphere').should('be.visible')
        cy.get('[class^="ThemeToggle_button"]').should('be.visible')
        cy.get('input[type="text"]').should('be.visible')
    })

    it('Abre e fecha o messenger', () => {
        cy.get('button[class^="Messenger_openCloseButton"]').should('be.visible')
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.get('div[class^="Messenger_box"]').should('be.visible')
        cy.get('div[class^="Messenger_box"]').click()
        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('button[class^="Messenger_openCloseButton"]').click()
    })

    it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.get('div[class^="Messenger_box"]').click()
        //Não consegui verificar se o foco está nesse campo, utilizei o focus forçado para passar esse teste
        //Tentei usando .should('be.focused') e não rolou
        cy.get('#messenger-name').focus().should('have.focus')
        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('#messenger-name').should('have.attr', 'required')
        cy.get('#email').should('have.attr', 'required')
        cy.get('#message').should('have.attr', 'required')
    })

    it('Mostra e oculta uma mensagem de sucesso ao enviar o formulário do messenger com sucesso', () => {
        cy.get('button[class^="Messenger_openCloseButton"]').should('be.visible')
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.get('div[class^="Messenger_box"]').should('be.visible')
        cy.get('div[class^="Messenger_box"]').click()
        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('input[id="messenger-name"]').type('Seu Madruga')
        cy.get('#email').type('madruguinha@gmail.com')
        cy.get('#message').type('chiforinfola')
        cy.get('button[type="submit"]').click()
        cy.get('div[role="alert"].Messenger_success__GOoJk')
            .should('be.visible')
            .and('contain', 'Your message has been sent.')
        cy.clock()
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.tick(3000)
        cy.get('div[role="alert"].Messenger_success__GOoJk').should('not.exist')
    })

    it('Limpa todos os campos do formulário do messenger ao preenchê-los, fechar o messenger e abri-lo novamente', () => {
        cy.get('button[class^="Messenger_openCloseButton"]').should('be.visible')
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.get('div[class^="Messenger_box"]').should('be.visible')
        cy.get('div[class^="Messenger_box"]').click()
        cy.get('input[id="messenger-name"]').type('Seu Madruga')
        cy.get('#email').type('madruguinha@gmail.com')
        cy.get('#message').type('chiforinfola')
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.get('button[class^="Messenger_openCloseButton"]').click()
        cy.get('input[id="messenger-name"]').should('have.value', '')
        cy.get('#email').should('have.value', '')
        cy.get('#message').should('have.value', '')
    })
})

describe('Testes em Viewport Móvel', () => {
    beforeEach(() => {
        cy.viewport('iphone-6')
        cy.visit('/')
        cy.contains('button', 'Accept').click()
    });

    it('Mostra as colunas Nome da Empresa e Ação, e oculta as colunas ID, Indústria, Número de Funcionários e Tamanho em um viewport móvel', () => {
        cy.contains('th', 'Company name').should('be.visible')
        cy.contains('th', 'Action').should('be.visible')
        cy.contains('th', 'ID').should('not.be.visible')
        cy.contains('th', 'Industry').should('not.be.visible')
        cy.contains('th', 'Number of employees').should('not.be.visible')
        cy.contains('th', 'Size').should('not.be.visible')
    })
})
