/// <reference types="Cypress" />

//GUI Test Suit
describe('GUI Tests', () => {
    beforeEach(function () {
        cy.visit('https://engage-sphere.vercel.app')
    })

    it('Mostra as colunas Nome da Empresa e Acao, e oculta as colunas ID, Industria, Numero de Funcionarios e Tamanho em um viewport movel', () => {

        //Abre a aplicação com viewport de mobile
        cy.viewport(320, 480)

        //Checa as colunas que devem ser apresentadas corretamente (Company Name e Action)
        cy.contains('Company name').should('be.visible')
        cy.contains('Action').should('be.visible')

        //Checa as colunas que devem estar ocultas (Industry, Number of employees e Size)
        cy.contains('Industry').should('not.be.visible')
        cy.contains('Number of employees').should('not.be.visible')
        cy.contains('Size').should('not.be.visible')

    })

    it('Exibe o cabecalho com um titulo, alternador de tema e um campo de entrada de texto', () => {
        //Verifica se as informações do rodapé estão sendo apresentadas corretamente
        cy.contains('EngageSphere').should('be.visible')
        cy.get('.ThemeToggle_container__RIfhe').should('be.visible')
        cy.get('input[id="name"]').should('be.visible')
    })

    it('Exibe a saudacao "Hi there" quando nenhum nome e fornecido', () => {
        //Verifica se a mensagem padrão apresentada é "Hi There!"
        cy.contains('h2', 'Hi there!').should('be.visible')
    })

    it('Exibe a saudacao "Hi Joe" quando o nome e fornecido', () => {
        //Preenche a informação "Joe" no nome e verifica se a mensagem foi alterada para "Hi Joe!"
        cy.get('input[data-testid="name"]').type('Joe')
        cy.contains('h2', 'Hi Joe!').should('be.visible')
    })

    it('Exibe o rodape com o texto e links corretos', () => {
        //Verifica se as informações do rodapé estão sendo apresentadas corretamente
        cy.contains('Copyright 2024 - Talking About Testing').should('be.visible')
        cy.contains('Hotmart').should('be.visible')
        cy.contains('Udemy').should('be.visible')
        cy.contains('Blog').should('be.visible')
        cy.contains('YouTube').should('be.visible')
    })

    it('Verifica se e possivel alterar entre os temas corretamente', () => {

        //Clica no botão de trocar o tema e checa se trocou corretamente para Dark
        cy.get('.ThemeToggle_container__RIfhe').click()
        cy.get('body[data-theme="dark"]').should('be.visible')

        //Clica no botão de trocar o tema e checa se voltou corretamente para Light
        cy.get('.ThemeToggle_container__RIfhe').click()
        cy.get('body[data-theme="light"]').should('be.visible')
    })

    it('Verifica se o tema se mantem ao acessar a informacao de cliente corretamente', () => {

        //Clica no botão de trocar o tema e checa se trocou corretamente para Dark
        cy.get('.ThemeToggle_container__RIfhe').click()
        cy.get('body[data-theme="dark"]').should('be.visible')

        //Clica para acessar os detalhes de um cliente e verifica se foi realizado corretamente
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
        cy.get('body[data-theme="dark"]').should('be.visible')
    })

    it('Mantem os filtros ao voltar da visualizacao de detalhes do cliente', () => {

        //Realiza os filtros corretamente
        cy.get('select[data-testid="size-filter"]').select('Small')
        cy.get('select[data-testid="industry-filter"]').select('Logistics')

        //Acessa um cliente apresentado e checa se acessou
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')

        //Retorna e confirma que retornou para a página anterior
        cy.contains('button', 'Back').click({ force: true })
        cy.contains('Below is our customer list.').should('be.visible')

        //Verifica se o filtro segue os mesmos selecionados anteriormente
        cy.get('select[data-testid="size-filter"]').should('have.value', 'Small')
        cy.get('select[data-testid="industry-filter"]').should('have.value', 'Logistics')
    })

    it('Verifica se e possivel acessar os detalhes do cliente', () => {

        //Clica para acessar os detalhes de um cliente e verifica se foi realizado corretamente
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
    })

    it('Verifica se e possivel expandir e recolher o endereco do cliente', () => {

        //Clica para acessar os detalhes de um cliente e verifica se foi realizado corretamente
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')

        //Clica no botão "Show Address" para expandir o endereço do cliente e verifica se expandiu
        cy.contains('Show address').click({ force: true })
        cy.contains('Hide address').should('be.visible')

        //Clica no botão "Hide Address" para recolher o endereço do cliente e verifica se recolheu
        cy.contains('Hide address').click({ force: true })
        cy.contains('Show address').should('be.visible')
    })

    it('Retorna a lista de clientes ao clicar no botao "Voltar"', () => {
        //Verifica se as informações do rodapé estão sendo apresentadas corretamente
        cy.contains('button', 'View').click()
        cy.contains('Customer Details').should('be.visible')
        cy.contains('button', 'Back').click({ force: true })
        cy.contains('Below is our customer list.').should('be.visible')
    })

    it('Abre e fecha o messenger', () => {

        //Clica para abrir o messenger
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //Checa se o messenger está aberto
        cy.get('[aria-label="Close messenger"]').should('be.visible')
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //Checa se o messenger foi fechado
        cy.get('[aria-label="Open messenger"]').should('be.visible')
    })

    it('Garante que todos os campos do messenger sao obrigatorios e que o primeiro esta focado', () => {

        //Abre o messenger
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //clica no botão "Send" sem preencher nada
        cy.get('button[type="submit"]').click({ force: true })

        //Checa se os campos retornaram mensagem de validação como "Preencha este campo." (Obrigatoriedade informada ao user)
        cy.get('input[id="messenger-name"]')
            .then(($input) => {
                expect($input[0].validationMessage).to.equal('Preencha este campo.')
            })

        cy.get('input[id="email"]')
            .then(($input) => {
                expect($input[0].validationMessage).to.equal('Preencha este campo.')
            })

        cy.get('textarea[id="message"]')
            .then(($input) => {
                expect($input[0].validationMessage).to.equal('Preencha este campo.')
            })

        //Checa se o campo de Nome está focado
        cy.get('input[id="messenger-name"]').should('be.focused')
    })

    it('Verifica se e possivel enviar uma mensagem pelo messenger com e-mail invalido', () => {

        //Clica para abrir o messenger
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //Checa se o messenger está aberto e preenche os campos corretamente, com exceção do e-mail
        cy.get('[aria-label="Close messenger"]').should('be.visible')
        cy.get('input[id="messenger-name"]').type('Joe')
        cy.get('input[id="email"]').type('testexample.com')
        cy.get('textarea[id="message"]').type('Test', { force: true })

        //Tenta enviar a mensagem e checa o resultado do campo e-mail
        cy.get('button[type="submit"]').click({ force: true })
        cy.get('input[id="email"]')
            .then(($input) => {
                expect($input[0].validationMessage).to.include('Inclua um "@"')
            })

    })

    it('Mostra e oculta uma mensagem de sucesso ao enviar o formulario do messenger com sucesso', () => {

        //Abre o messenger
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //trava o tempo para verificar a mensagem de envio bem sucedido
        cy.clock()

        //Preenche os campos obrigatórios e envia
        cy.get('input[id="messenger-name"]').type('Joe')
        cy.get('input[id="email"]').type('test@example.com')
        cy.get('textarea[id="message"]').type('Test', { force: true })
        cy.get('button[type="submit"]').click({ force: true })

        //Verifica se a mensagem de sucesso é apresentada
        cy.contains('Your message has been sent').should('be.visible')

        //Avança o tempo para que a mensagem desapareça
        cy.tick(3000)

        //Confirma o desaparecimento da mensagem de sucesso
        cy.contains('div.Messenger_success_nqnL1').should('not.exist')

    })

    it('Limpa todos os campos do formulario do messenger ao preenche-los, fechar o messenger e abri-lo novamente', () => {

        //Abre o messenger
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //Preenche os campos obrigatórios e fecha o Messenger
        cy.get('input[id="messenger-name"]').type('Joe')
        cy.get('input[id="email"]').type('test@example.com')
        cy.get('textarea[id="message"]').type('Test', { force: true })
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //Abre o Messenger novamente
        cy.get('.Messenger_openCloseButton__OgKIA').click()

        //Verifica se os campos estão vazios
        cy.get('input[id="messenger-name"]').should('be.empty')
        cy.get('input[id="email"]').should('be.empty')
        cy.get('textarea[id="message"]').should('be.empty')

    })
})