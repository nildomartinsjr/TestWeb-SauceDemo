describe('Login Sauce Demo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  });

//Case test 01
  it('Deve fazer login com sucesso.', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html') // Verifica se está na página correta
    cy.get('.inventory_list').should('be.visible'); // Garante que a lista de produtos carregou

  });

//Case test 02
  it('Não deve logar com credenciais inválidas (usuário e senha).', () => {
    cy.get('[data-test="username"]').type('usuario_errado')
    cy.get('[data-test="password"]').type('senha_errada')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service')
  });

//Case test 03
  it('Não deve logar com senha errada.', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('senha_errada')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service')
  });


//Case test 04
  it('Não deve logar com campo de usuário vazio.', () => {
    cy.get('[data-test="username"]')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Username is required')

  });

})