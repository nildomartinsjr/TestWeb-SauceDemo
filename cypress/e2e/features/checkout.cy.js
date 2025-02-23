describe('Checkout', () => {
    beforeEach(() => {
        // Acessa a página inicial e faz login antes de cada teste
        cy.visit('https://www.saucedemo.com/');
        cy.login();
    });

 it('Deve logo após clicar no botão "Checkout" ser redirecionado para a página de informações do checkout', () => {
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
    cy.get('button[data-test="checkout"]').click() //clique no botão checkout
    cy.url().should('include', '/checkout-step-one.html')
    cy.get('.checkout_info')
      .should('be.visible')
  })
it('Deve preencher os campos obrigatórios, clicar no botão "Continue" e ir para a página de resumo do pedido', () => {
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
    cy.get('button[data-test="checkout"]').click() //clique no botão checkout
    cy.url().should('include', '/checkout-step-one.html')
    cy.get('[data-test="firstName"]').type('Nildo')
    cy.get('[data-test="lastName"]').type('Júnior')
    cy.get('[data-test="postalCode"]').type(6000000)
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')
});
it.only('Deve logo após clicar no botão "Finish" ser exibida a página de confirmação (Checkout Complete)', () => {
    
    // Dado que o usuário está na página de inventário e deseja comprar todos os produtos
    // Adiciona todos os produtos ao carrinho
    cy.get('[data-test^="add-to-cart"]').each((botaoAdd) => {
        cy.wrap(botaoAdd).click();
    });

    // Acessa a página do carrinho
    cy.get('[data-test="shopping-cart-link"]').click();

    // Verifica se 6 produtos foram adicionados corretamente ao carrinho
    cy.get('.cart_item').should('have.length', 6);

    // Confirma que cada produto no carrinho tem Nome e Preço visíveis
    cy.get('.cart_item').each((item) => {
        cy.wrap(item).find('.inventory_item_name').should('be.visible');
        cy.wrap(item).find('.inventory_item_price').should('be.visible');
    });

    // Quando ele clica no botão "Checkout"
    cy.get('button[data-test="checkout"]').click();

    // Então ele deve ser redirecionado para a página de informações do checkout
    cy.url().should('include', '/checkout-step-one.html');

    // Preenche os dados obrigatórios do usuário
    cy.get('[data-test="firstName"]').type('Nildo');
    cy.get('[data-test="lastName"]').type('Júnior');
    cy.get('[data-test="postalCode"]').type(6000000);

    // Clica em "Continue" para prosseguir para a revisão do pedido
    cy.get('[data-test="continue"]').click();

    // Então ele deve ser redirecionado para a página de revisão do pedido
    cy.url().should('include', '/checkout-step-two.html');

    // Quando ele clica no botão "Finish" para finalizar a compra
    cy.get('[data-test="finish"]').click();

    // Então ele deve ver a mensagem de confirmação indicando que a compra foi finalizada com sucesso
    cy.get('[data-test="complete-header"]').should('be.visible');

    // Confirma que a mensagem de sucesso está visível
    cy.get('[data-test="complete-text"]').should('be.visible');

    // E a página de confirmação (Checkout Complete) deve ser exibida
    cy.url().should('include', '/checkout-complete.html');
});

  
})