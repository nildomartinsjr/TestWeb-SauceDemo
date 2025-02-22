describe.only('Detalhes do Produto', () => {
    beforeEach(() => {
      // Executa este hook antes de cada caso de teste para preparar o ambiente.
      cy.visit('https://www.saucedemo.com'); // Acessa a página inicial da Sauce Demo.
      cy.login(); // Realiza o login utilizando o comando customizado.
    });
  
    it('Ao clicar em um produto deve visualizar os detalhes corretamente', () => {
      // Seleciona o primeiro produto da lista dinamicamente e clica nele
      cy.get('.inventory_item_name').first().click();
  
      // Verifica se foi redirecionado para a página de detalhes do produto
      cy.url().should('include', '/inventory-item.html');
  
      // Valida que os elementos da página de detalhes estão visíveis e possuem conteúdo válido
      cy.get('[data-test="inventory-item-name"]')
        .should('be.visible')
        .and('not.be.empty');
  
      cy.get('[data-test="item-sauce-labs-backpack-img"]')
        .should('be.visible');
  
      cy.get('[data-test="inventory-item-desc"]')
        .should('be.visible')
        .and('not.be.empty');
  
      cy.get('[data-test="inventory-item-price"]')
        .should('be.visible')
        .and('not.be.empty');
  
      // Verifica se o botão de voltar à lista de produtos está visível
      cy.get('[data-test="back-to-products"]').should('be.visible');
    });
  });
  