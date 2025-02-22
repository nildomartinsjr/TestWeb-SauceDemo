describe('Listagem de Produtos (Inventário)', () => {
  beforeEach(() => {
    // Executa este hook antes de cada caso de teste para preparar o ambiente.
    cy.visit('https://www.saucedemo.com'); // Acessa a página inicial da Sauce Demo.
    cy.login(); // Realiza o login utilizando o comando customizado.
  });

  it('Exibe todos os produtos com Nome, Imagem, Preço, Botão Add to cart', () => {
    // Seleciona e verifica se o container de inventário está visível.
    cy.get('[data-test="inventory-container"]').should('be.visible');

    // Seleciona a lista de itens do inventário e itera sobre cada um deles.
    cy.get('[data-test="inventory-list"]').each(($item) => {

      // Valida que o nome do produto esteja visível e não esteja vazio.
      cy.wrap($item)
        .find('[data-test="inventory-item-name"]')
        .should('be.visible')
        .and('not.be.empty');

      // Valida que a imagem do produto esteja visível e que o atributo "src" esteja presente e não vazio.
      cy.wrap($item)
        .find('img')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('not.be.empty');

      // Valida que o preço do produto esteja visível, contenha o símbolo de dólar e não esteja vazio.
      cy.wrap($item)
        .find('[data-test="inventory-item-price"]')
        .should('be.visible')
        .and('contain', '$')
        .and('not.be.empty');

      // Utiliza o seletor com o operador ^=, que seleciona elementos cujo atributo data-test começa com "add-to-cart".
      // Isso é útil se o valor do atributo pode variar, mas sempre inicia com "add-to-cart".
      cy.wrap($item)
        .find('[data-test^="add-to-cart"]')
        .should('be.visible');
    });
  });

  it('Seleciona uma opção no select de ordenação e confirma se a opção foi selecionada corretamente', () => {
    cy.get('select[data-test="product-sort-container"]').as('dropdown'); // Cria um alias
    cy.get('@dropdown').select('Price (low to high)');
    cy.get('@dropdown').should('have.value', 'lohi'); // Valida novamente o elemento atualizado
  });
  it.only('Valida se a ordenação dos produtos muda corretamente de A-Z para Z-A', () => {
    let nomesAntes = [];
  
    // Captura os nomes dos produtos antes da mudança
    cy.get('.inventory_item_name')
      .then(($items) => {
        nomesAntes = [...$items].map(el => el.innerText); // Coleta os nomes no array
        cy.log('Lista antes da ordenação:', nomesAntes);
      });
  
    // Seleciona a opção de ordenação "Name (Z to A)"
    cy.get('select[data-test="product-sort-container"]').select('Name (Z to A)');
  
    let nomesDepois = [];
  
    // Captura os nomes dos produtos após a mudança para "Z to A"
    cy.get('.inventory_item_name')
      .then(($items) => {
        nomesDepois = [...$items].map(el => el.innerText); // Coleta os nomes novamente
        cy.log('Lista após a ordenação:', nomesDepois);
  
        // Agora verificamos se a lista realmente inverteu
        const nomesEsperados = [...nomesAntes].sort().reverse();
        expect(nomesDepois).to.deep.equal(nomesEsperados);
      });
  });
  
  
  
});
