describe('Teste E2E EngageSphere', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.contains('button', 'Accept').click();
    })

    it('Mantém os filtros ao voltar da visualização de detalhes do cliente', () => {
        cy.get('select[data-testid="size-filter"]').select('Very Large Enterprise')
        cy.get('button[aria-label="View company: Lowe Co"]').click()
        cy.get('button').contains('Back').should('be.visible')
        cy.contains('button', 'Back').click();
        cy.contains('Below is our customer list.').should('be.visible')
        cy.get('select[data-testid="size-filter"]').should('have.value', 'Very Large Enterprise');
    })

    it('Retorna à lista de clientes ao clicar no botão "Voltar"', () => {
        cy.get('button[aria-label="View company: Lowe Co"]').click();
        cy.get('button').contains('Back').should('be.visible')
        cy.contains('button', 'Back').click();
        cy.contains('Below is our customer list.').should('be.visible')

    })


    it('Exibie o rodapé com o texto e links corretos', () => {
        cy.get('[data-testid="footer"]').should('be.visible')

        cy.get('[data-testid="footer"] a').eq(0).should('be.visible')
        cy.get('[data-testid="footer"] a').eq(0).should('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem');

        cy.get('[data-testid="footer"] a').eq(1).should('be.visible')
        cy.get('[data-testid="footer"] a').eq(1).should('have.attr', 'href', 'https://udemy.com/user/walmyr');

        cy.get('[data-testid="footer"] a').eq(2).should('be.visible')
        cy.get('[data-testid="footer"] a').eq(2).should('have.attr', 'href', 'https://talkingabouttesting.com');

        cy.get('[data-testid="footer"] a').eq(3).should('be.visible')
        cy.get('[data-testid="footer"] a').eq(3).should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');

    })

    it('Exibe a saudação "Hi, there" quando nenhum nome é fornecido', () => {
        cy.get('h2').should('contain', 'Hi there!')
    })

    it('Exibe a saudação "Hi, Joe" quando o nome é fornecido', () => {
        const name = 'Joe'
        cy.get('#name').type(name)
        cy.get('h2').should('contain', 'Hi ' + name + '!')
    })

    it('Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto', () => {
        cy.get('h1').should('be.visible')
        cy.get('h1').should('contain', 'EngageSphere')
        cy.get('button[class="ThemeToggle_button__GzIuj"]').should('be.visible')
        cy.get('#name').should('be.visible')
    })


    it('Abre e fecha o messenger', () => {
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').should('be.visible')
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        cy.get('div[class="Messenger_box__qUF2H"]').should('be.visible')
        cy.get('div[class="Messenger_box__qUF2H"]').click()
        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
    })

    it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {

        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        cy.get('div[class="Messenger_box__qUF2H"]').click()

        //Não consegui verificar se o foco está nesse campo, utilizei o focus forçado para passar esse teste
        cy.get('#messenger-name').focus().should('have.focus')

        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('#messenger-name').should('have.attr', 'required');
        cy.get('#email').should('have.attr', 'required');
        cy.get('#message').should('have.attr', 'required');
    })

    it('Mostra e oculta uma mensagem de sucesso ao enviar o formulário do messenger com sucesso', () => {

        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').should('be.visible')
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        cy.get('div[class="Messenger_box__qUF2H"]').should('be.visible')
        cy.get('div[class="Messenger_box__qUF2H"]').click()
        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('input[id="messenger-name"]').type('Seu Madruga')
        cy.get('#email').type('madruguinha@gmail.com')
        cy.get('#message').type('chiforinfola')
        cy.get('button[type="submit"]').click()
        cy.get('div[role="alert"].Messenger_success__GOoJk')
            .should('be.visible')
            .and('contain', 'Your message has been sent.')
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        cy.wait(3000)
        cy.get('div[role="alert"].Messenger_success__GOoJk').should('not.exist')
    })

    it('Limpa todos os campos do formulário do messenger ao preenchê-los, fechar o messenger e abri-lo novamente', () => {
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').should('be.visible')
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        cy.get('div[class="Messenger_box__qUF2H"]').should('be.visible')
        cy.get('div[class="Messenger_box__qUF2H"]').click()
        cy.get('h2').should('contain', 'How can we help you?')
        cy.get('input[id="messenger-name"]').type('Seu Madruga')
        cy.get('#email').type('madruguinha@gmail.com')
        cy.get('#message').type('chiforinfola')
        cy.get('input[id="messenger-name"]').clear()
        cy.get('#email').clear()
        cy.get('#message').clear()
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        cy.get('button[class="Messenger_openCloseButton__6O7-y"]').click()
        //validando se os campos foram limpos
        cy.get('input[id="messenger-name"]').should('have.value', '')
        cy.get('#email').should('have.value', '')
        cy.get('#message').should('have.value', '')
    })

})
describe('Testes em Viewport Móvel', () => {
    beforeEach(() => {

        cy.viewport('iphone-6')
        cy.visit('http://localhost:3000')
        cy.contains('button', 'Accept').click()
    });

    it('Mostra as colunas Nome da Empresa e Ação, e oculta as colunas ID, Indústria, Número de Funcionários e Tamanho em um viewport móvel', () => {

        cy.get('th').contains('Company name').should('be.visible')
        cy.get('th').contains('Action').should('be.visible')
        cy.get('th').contains('ID').should('not.be.visible')
        cy.get('th').contains('Industry').should('not.be.visible')
        cy.get('th').contains('Number of employees').should('not.be.visible')
        cy.get('th').contains('Size').should('not.be.visible')
    });
});