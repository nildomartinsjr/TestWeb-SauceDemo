describe('Teste do Sauce Demo', () => {
  it('Deve acessar a página e verificar o título', () => {
    // Acessa a aplicação
    cy.visit('https://www.saucedemo.com')

    // Verifica se o título da página contém "Swag Labs"
    cy.title().should('include', 'Swag Labs')
  })
})
