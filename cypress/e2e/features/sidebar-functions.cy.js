describe('Menu Lateral e Funcionalidades Extras', () => {
    beforeEach(() => {
        // Acessa a página inicial e faz login antes de cada teste
        cy.visit('https://www.saucedemo.com/');
        cy.login();
    });


const pages = [
  '/inventory.html',
  '/cart.html',
  '/checkout-step-one.html',
  '/checkout-step-two.html',
  '/checkout-complete.html'
];

pages.forEach((page) => {
  it(`Deve exibir o menu lateral corretamente na página ${page}`, () => {
   
    // Clica no menu lateral
    cy.get('#react-burger-menu-btn').click();

    // Verifica se o menu lateral está visível
    cy.get('.bm-menu').should('be.visible');

    // Valida se as opções do menu lateral estão visíveis
    cy.get('[data-test="inventory-sidebar-link"]').should('be.visible').and('not.be.empty');
    cy.get('[data-test="about-sidebar-link"]').should('be.visible').and('not.be.empty');
    cy.get('[data-test="logout-sidebar-link"]').should('be.visible').and('not.be.empty');
    cy.get('[data-test="reset-sidebar-link"]').should('be.visible').and('not.be.empty');
  });
});
pages.forEach((page) => {
it('Sessão deve ser encerrada após clicar na opção "Logout" em qualquer página ${page}', () => {
    // Clica no menu lateral
    cy.get('#react-burger-menu-btn').click();

    // Verifica se o menu lateral está visível
    cy.get('.bm-menu').should('be.visible');
   
    // Clica na opção logout
    cy.get('[data-test="logout-sidebar-link"]').click()

    // Valida se após clicar na opção "Logout" a sessão é encerrada.
    cy.url().should('include', 'https://www.saucedemo.com/')
    cy.get('[data-test="login-container"]').should('be.visible')
    });
  });
it('O estado da aplicação deve ser restaurado ao padrão após selecionar a opção "Reset App State" no menu lateral.', () => {
    // Captura o nome do primeiro produto antes de adicioná-lo
    cy.get('.inventory_item_name').first().invoke('text').as('nomeProduto');

    // Clica no botão "Add to cart" do primeiro produto
    cy.get('button[data-test^="add-to-cart"]').first().click();

    // Verifica se o badge do carrinho está visível e com a contagem correta
    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .and('have.text', '1');

    // Acessa a página do carrinho
    cy.get('[data-test="shopping-cart-link"]').click();

    // Verifica se a lista de produtos do carrinho está visível
    cy.get('[data-test="cart-list"]').should('be.visible');

    // Garante que o produto correto foi adicionado ao carrinho
    cy.get('.cart_item .inventory_item_name').first()
      .should('be.visible')
      .and('not.be.empty')
      .then(($el) => {
          cy.get('@nomeProduto').should('eq', $el.text()); // Compara com o nome capturado antes
      });
    // Clica no menu lateral
    cy.get('#react-burger-menu-btn').click();
    // Clica na opção "Reset App State"
    cy.get('[data-test="reset-sidebar-link"]').click()
    // Clica no x para sair do menu lateral
    cy.get('#react-burger-cross-btn').click()
   // Acessa a página do carrinho
    cy.get('[data-test="shopping-cart-link"]').click();
    // Agora valida que o carrinho está vazio
    cy.get('.cart_item').should('not.exist');


 });


});