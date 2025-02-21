Cypress.Commands.add('login', (data = {
     
    username:'standard_user',
    password:'secret_sauce'
 
}) => { 
    cy.get('[data-test="username"]').type(data.username)
    cy.get('[data-test="password"]').type(data.password)
    cy.get('[data-test="login-button"]').click()

 })
