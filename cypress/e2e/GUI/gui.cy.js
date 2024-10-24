/// <reference types="cypress" />
describe('GUI Tests', () => {
    beforeEach(function () {
        cy.visit('/')
        cy.contains('button', 'Accept').click()
    })

    it('Mostra as colunas Nome da Empresa e Acao, e oculta as colunas ID, Industria, Numero de Funcionarios e Tamanho em um viewport movel', () => {
        cy.viewport(320, 480)
        cy.contains('Company name').should('be.visible')
        cy.contains('Action').should('be.visible')
        cy.contains('Industry').should('not.be.visible')
        cy.contains('Number of employees').should('not.be.visible')
        cy.contains('Size').should('not.be.visible')
    })

    it('Exibe o cabecalho com um titulo, alternador de tema e um campo de entrada de texto', () => {
        cy.contains('EngageSphere').should('be.visible')
        cy.get('[class^="ThemeToggle_container"]').should('be.visible')
        cy.get('input[id="name"]').should('be.visible')
    })

    it('Exibe a saudacao "Hi there" quando nenhum nome e fornecido', () => { 
        cy.contains('h2', 'Hi there!').should('be.visible')
    })

    it('Exibe a saudacao "Hi Joe" quando o nome e fornecido', () => {
        cy.get('input[data-testid="name"]').type('Joe')
        cy.contains('h2', 'Hi Joe!').should('be.visible')
    })

    it('Exibe o rodape com o texto e links corretos', () => {
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

    it('Verifica se e possivel alterar entre os temas corretamente', () => {
        cy.get('[class^="ThemeToggle_container"]').click()
        cy.get('body[data-theme="dark"]').should('be.visible')
        cy.get('[class^="ThemeToggle_container"]').click()
        cy.get('body[data-theme="light"]').should('be.visible')
    })

    it('Mantem os filtros ao voltar da visualizacao de detalhes do cliente', () => {
        cy.get('select[data-testid="size-filter"]').select('Small')
        cy.get('select[data-testid="industry-filter"]').select('Logistics')
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
        cy.contains('button', 'Back').click()
        cy.contains('Below is our customer list.').should('be.visible')
        cy.get('select[data-testid="size-filter"]').should('have.value', 'Small')
        cy.get('select[data-testid="industry-filter"]').should('have.value', 'Logistics')
    })

    it('Verifica se e possivel acessar os detalhes do cliente', () => {
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
    })

    it('Verifica se e possivel expandir e recolher o endereco do cliente', () => {
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
        cy.contains('Show address').click()
        cy.contains('Hide address').should('be.visible')
        cy.contains('Hide address').click()
        cy.contains('Show address').should('be.visible')
    })

    it('Retorna a lista de clientes ao clicar no botao "Voltar"', () => {
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
        cy.contains('button', 'Back').click()
        cy.contains('Below is our customer list.').should('be.visible')
    })

    it('Abre e fecha o messenger', () => {
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('[aria-label="Close messenger"]').should('be.visible')
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('[aria-label="Open messenger"]').should('be.visible')
    })

    it('Garante que todos os campos do messenger sao obrigatorios e que o primeiro esta focado', () => {
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('[class^="Messenger_form"]')
            .find('input[type="text"]')
            .should('be.focused')
            .and('have.attr', 'required')
        cy.get('[class^="Messenger_form"]')
            .find('input[type="email"]')
            .should('have.attr', 'required')
        cy.get('[class^="Messenger_form"]')
            .find('textarea')
            .should('have.attr', 'required')
    })

    it('Verifica se e possivel enviar uma mensagem pelo messenger com e-mail invalido', () => {
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('[aria-label="Close messenger"]').should('be.visible')
        cy.get('input[id="messenger-name"]').type('Joe')
        cy.get('input[id="email"]').type('testexample.com')
        cy.get('textarea[id="message"]').type('Test')
        cy.get('input[type="email"]').should('be.visible')
    })

    it('Mostra e oculta uma mensagem de sucesso ao enviar o formulario do messenger com sucesso', () => {
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.clock()
        cy.get('input[id="messenger-name"]').type('Joe')
        cy.get('input[id="email"]').type('test@example.com')
        cy.get('textarea[id="message"]').type('Test')
        cy.get('button[type="submit"]').click()
        cy.contains('Your message has been sent').should('be.visible')
        cy.tick(3000)
        cy.contains('div.Messenger_success_nqnL1').should('not.exist')
    })

    it('Limpa todos os campos do formulario do messenger ao preenche-los, fechar o messenger e abri-lo novamente', () => {
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('input[id="messenger-name"]').type('Joe')
        cy.get('input[id="email"]').type('test@example.com')
        cy.get('textarea[id="message"]').type('Test')
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('[class^="Messenger_openCloseButton"]').click()
        cy.get('input[id="messenger-name"]').should('be.empty')
        cy.get('input[id="email"]').should('be.empty')
        cy.get('textarea[id="message"]').should('be.empty')
    })
})