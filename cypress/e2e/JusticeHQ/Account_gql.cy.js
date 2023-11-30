
/// <reference types="Cypress" />
import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils.js'

const CreateAccount = ".utils/CreateAccount.json"


context('Testing JusticeHQ - Createaccount', () => {
  beforeEach(() => {
      cy.visit('createaccount')
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

  it('Createaccount', () => {
    
    cy.readFile(CreateAccount).then((obj) => {
      cy.window().then(w => w.beforeReload = true)
      cy.get("input[name='firstName']").type(obj.firstName)
      cy.get("input[name='lastName']").type(obj.lastName+String(obj.ID))
      cy.get("input[name='email']").type(obj.firstName+'@'+obj.lastName+String(obj.ID)+'.com')
      cy.get("input[name='phone']").type(obj.phone)
      cy.get("input[name='password']").type(obj.password)
      cy.get("input[name='repeatPassword']").type(obj.password)
      cy.get("input[name='terms']").click()
      cy.contains('button','Continue').click()
      cy.xpath("//h6[contains(text(),'I want to create a business account')]")
      cy.contains('button','Continue').click()

      cy.get("input[id=':r7:']").type("")    /*Lawfirm name*/
      cy.get("input[id=':r8:']").type("") /*Lawfirm Description*/ 
      cy.get("input[id=':r9:']").type("") /*Address*/
      cy.get("input[id=':ra:']").type("") /*City */
      cy.get("input[id=':rb:']") /*state*/
      .click()
      .type('Cali')
      cy.get("li[id=':rb:-option-0']").click()
      cy.get("input[id=':rd:']").type("") /*zipcode*/
      cy.get("input[id=':re:']").click() /*company size*/
      cy.get("li[id=':re:-option-0']").click()
      cy.get("input[id=':rg:']").click()
      cy.get("li[id=':rg:-option-0']").click()
      cy.contains('button','Continue').click()

      //*[@id="root"]/div[2]/div[2]/div/div[2]/div[2]/button0

      cy.get("input[id=':re:']").click()


      cy.window().then(w => w.beforeReload = true)
      cy.get("input[name='barNumber']").type(obj.bar)
      cy.get("div[id=':r8:']").click()
      cy.get("li[data-value='Yes']").click()
      cy.contains('button','Next').click()
      cy.window().should('have.prop', 'beforeReload')

      cy.window().then(w => w.beforeReload = true)
      cy.get("input[name='lawFirmName']").type('Automation Law Firm')
      cy.get("input[name='address']").type('Auto Adress 1234')
      cy.get("input[name='city']").type('Auto city')
      cy.get("input[id=':re:']") /*state*/
        .click()
        .type('Cali')
      cy.get("li[id=':re:-option-0']").click()
      cy.get("input[name='zipCode']").type("11545")
      cy.get("input[id=':rh:']").click() /*company size*/
      cy.get("li[id=':rh:-option-0']").click()
      cy.get("input[id=':rj:']").type('I am') /*relationship*/
      cy.get("li[id=':rj:-option-0']").click()
      cy.get("input[id=':rl:']").type('3')  /*company size*/  
      cy.get("li[id=':rl:-option-0']").click()
      cy.get("input[id=':rn:']").type('smokeball')  /*case managment software*/  
      cy.get("li[id=':rn:-option-0']").click()

      //cy.intercept('POST', 'http://attorney-share-qa1.us-west-1.elasticbeanstalk.com/graphql/system').as('createaccount')
      cy.contains("button", "Create Account").click()
      /*cy.wait('@createaccount')
        .its('response.statusCode').should('eq', 200)
       // .its('response.body.data.create_users_item').should('include','id')*/
      cy.wait(300)
      if (cy.window().should('not.have.prop', 'beforeReload')) {
        obj.ID = obj.ID+1,
        obj.phone = obj.phone+1
        let flag = false
        while(flag === false){
          obj.bar = obj.bar+1
          cy.visit("https://apps.calbar.ca.gov/attorney/LicenseeSearch/QuickSearch")
          cy.get("input[name='FreeText']").type(obj.bar)
          cy.get("input[name='btn_quicksearch']").click()
          if (cy.xpath('/html/body/div[1]/div/div/div[3]/div[2]/div[2]/div/div[2]/div/p/b')) {
            cy.writeFile(CreateAccount, obj)
            flag = true
          }}
         }
         
    })
      }      
)})


  