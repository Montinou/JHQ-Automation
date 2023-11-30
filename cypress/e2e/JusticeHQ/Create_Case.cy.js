/// <reference types="cypress" />


import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils.js'
const Case = ".utils/Case.json"
const User = ".utils/UsersQA.json"

context('Testing JusticeHQ - Create Case', () => {
  beforeEach(() => {
      
         
      cy.intercept('POST', 'http://attorney-share-qa1.us-west-1.elasticbeanstalk.com/graphql', (req) => {
        // query
          aliasQuery(req, 'getMarketplace'); 
          aliasQuery(req, 'getMarketplacePreferences'); 
          aliasMutation(req, 'create_case_item')
      })
      cy.visit('signIn')
  })

  it('Create Case', () => {
    
    cy.readFile(User).then((obj1) => {
     cy.login(obj1.userAA, obj1.passAA)
    })
    cy.readFile(Case).then((obj) => {
    //cy.wait('@gqlgetMarketplaceQuery').expect(response.status).to.eq(200)
    cy.contains('button', 'Create New Case').click()


    /*Personal Info*/
    
    cy.get("input[name='caseName']").type(obj.caseName+' '+String(obj.ID))
    cy.get("textarea[name='caseDescription']").type(obj.caseDescription+' '+String(obj.ID))

    /*Lead Info*/
    cy.get("input[name='leadName']").type(obj.leadName+String(obj.ID))
    cy.get("input[name='leadPhone']").type(obj.leadPhone)
    cy.get("input[name='leadEmail']").type(obj.leadEmail)


    /*Marketplace Visibility*/
    cy.contains('button', 'Public').click()

    /*Fees and Pricing*/
    

    /*General Case Info*/
    cy.get("input[id=':r1a:']").click() //Case type
    cy.get("li[id=':r1a:-option-2']").click()  

    cy.get("input[id=':r1e:']").click() //Jurisdiction
    cy.get("li[id=':r1e:-option-4']").click()  

    /*Terms*/

    cy.get("input[name='terms']").click()


    cy.contains('button', 'Create Case').click() //Create Case


    cy.wait('@gqlCreateNewCaseMutation')
      .expect('response.body.data.create_case_item.id').not.to.be.null
      .then(
      obj.ID = obj.ID+1
      )

    cy.writeFile(Case, obj)
})
})

})