import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils.js'

context('signin - logut tests', () => {
  beforeEach(() => {
    
      cy.intercept('POST', 'http://attorney-share-qa1.us-west-1.elasticbeanstalk.com/graphql/system', (req) => {
      // Mutations
        aliasMutation(req, 'SignIn');
        aliasMutation(req, 'SignOut');
      })
    
      cy.intercept('POST', 'http://attorney-share-qa1.us-west-1.elasticbeanstalk.com/graphql', (req) => {
        // query
          aliasQuery(req, 'getMarketplace'); 
          aliasQuery(req, 'getMarketplacePreferences'); 
        })
  })
  
  it('signin - success', () => {
    
    cy.visit('signin')
    cy.get("input[name='email']").type("pedro@bustamante.com")
    cy.get("input[name='password']").type("test1234")
    cy.contains('button','Sign In').click()
    cy.wait('@gqlSignInMutation')
    .its('response.body.data.auth_login')
    .should('have.property', 'access_token')

    })

  it('signin - fail', () => {
    
    cy.visit('signin')
    cy.get("input[name='email']").type("pedro@bustamante.com")
    cy.get("input[name='password']").type("test12345")
    cy.contains('button','Sign In').click()
    cy.wait('@gqlSignInMutation')
    .its('response.body.data.auth_login')
    .should('be.null')
  
    })  
it('logout', () => {
    cy.visit('signin')
    cy.get("input[name='email']").type("pedro@bustamante.com")
    cy.get("input[name='password']").type("test1234")
    cy.contains('button','Sign In').click()
    cy.wait('@gqlSignInMutation')
    .its('response.body.data.auth_login')
    .should('have.property', 'access_token')
    cy.contains('button','Sign In').click()
    //cy.wait('@gplSchoolsQuery')
    cy.wait('@gqlgetMarketplaceQuery')

    //cy.visit('markeplace')
    cy.xpath("/html[1]/body[1]/div[1]/div[2]/header[1]/div[1]/div[1]/div[2]/button[1]/div[1]").click()
    cy.contains('Log Out').click()
    cy.wait('@gqlSignOutMutation')
      .its('response.body.data.auth_logout')
      .should('equal', true)
    })    






})