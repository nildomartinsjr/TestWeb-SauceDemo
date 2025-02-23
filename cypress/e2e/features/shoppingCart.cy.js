describe('Carrinho', () => {
    beforeEach(() => {
        // Acessa a página inicial e faz login antes de cada teste
        cy.visit('https://www.saucedemo.com/');
        cy.login();
    });

    it('Deve adicionar um produto ao carrinho e validar que ele foi adicionado corretamente.', () => {
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
    });

    it('Deve remover um produto do carrinho.', () => {
        // Adiciona um produto ao carrinho
        cy.get('button[data-test^="add-to-cart"]').first().click();

        // Acessa a página do carrinho
        cy.get('[data-test="shopping-cart-link"]').click();

        // Verifica se há pelo menos um item no carrinho
        cy.get('.cart_item').should('exist');

        // Clica no botão "Remove" do primeiro item
        cy.get('.cart_button').first().click();

        // Agora valida que o carrinho está vazio
        cy.get('.cart_item').should('not.exist');
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('Deve exibir corretamente os produtos adicionados no carrinho', () => {
        // Adiciona todos os produtos usando .each() e  cy.wrap() para iterar sobre todos os botões e clicar neles, // Utiliza também o seletor com o operador ^=, que seleciona elementos cujo atributo data-test começa com "add-to-cart".
      // Isso é útil se o valor do atributo pode variar, mas sempre inicia com "add-to-cart".
      cy.get('[data-test^="add-to-cart"]').each((botaoAdd) => {
        cy.wrap(botaoAdd).click();
      })
       // Acessa a página do carrinho
      cy.get('[data-test="shopping-cart-link"]').click()
       // Verifica se os produtos aparecem no carrinho
      cy.get('.cart_item').should('have.length', 6)
      // Valida que cada produto tem Nome e Preço
      cy.get('.cart_item').each((item) => {
        cy.wrap(item).find('.inventory_item_name').should('be.visible')
        cy.wrap(item).find('.inventory_item_price').should('be.visible')
      })
    });
    
});
