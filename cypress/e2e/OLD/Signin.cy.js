/// <reference types="cypress" />

describe('Testing JusticeHQ - Signin', () => {
    beforeEach(() => {
      cy.visit('signin')
    })

    it('signin - success', () => {
      cy.get("input[name='email']").type("pedro@bustamante.com")
      cy.get("input[name='password']").type("test1234")
      cy.contains('button','Sign In').click()
      cy.wait(5000)
      cy.visit('marketplace')
      cy.wait(3000)
      cy.contains('button','Marketplace').should('be.visible')
      //cy.url(true).eq('http://attorney-share-web1-qa2.us-west-1.elasticbeanstalk.com/marketplace')
    })
    it('signin - fail', () => {
      cy.get("input[name='email']").type("pedro@bustamante.com")
      cy.get("input[name='password']").type("test12345")
      cy.contains('button','Sign In').click()
      cy.wait(300)
      cy.visit('marketplace')
      cy.wait(2000)
      cy.url().should('eq' ,"http://attorney-share-web1-qa2.us-west-1.elasticbeanstalk.com/signin")
      //cy.url(true).eq('http://attorney-share-web1-qa2.us-west-1.elasticbeanstalk.com/marketplace')
    })
})


