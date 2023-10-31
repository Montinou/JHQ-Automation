import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils.js'
context('Testing JusticeHQ - Createaccount', () => {
    beforeEach(() => {
        
        cy.intercept('POST', 'http://attorney-share-qa1.us-west-1.elasticbeanstalk.com/graphql/system', (req) => {
        // Mutations

          aliasMutation(req, 'SignIn');
        })

      
        cy.intercept('POST', 'http://attorney-share-qa1.us-west-1.elasticbeanstalk.com/graphql', (req) => {
          // query
            aliasMutation(req, 'UpdateAttorneyProfileItem');
            
            aliasQuery(req, 'Attorney'); 
            aliasQuery(req, 'CatalogLanguage'); 
            aliasQuery(req, 'getMarketplacePreferences'); 
            aliasQuery(req, 'getMarketplace'); 
        })
        cy.visit('signin')
        
    }) 
        it('Edit Bio', () => {
            cy.login("pedro@bustamante.com", "test1234")
            cy.contains('button','Sign In').click()
            cy.wait('@gqlgetMarketplaceQuery')
            cy.get('#customized-avatar-button').click()
            cy.contains("Attorney profile").click()
            cy.wait('@gqlCatalogLanguageQuery')
            .its('response.body.data').should('have.property', "catalog_language")
            cy.get('textarea[name="bio"]').clear()
            cy.get('textarea[name="bio"]').type('Bio1')
            cy.get('button[type="submit"]').contains('Save Changes').click()
            cy.wait('@gqlUpdateAttorneyProfileItemMutation')
            .its('response.body.data.update_attorney_profile_item.bio').should('equal', 'Bio1')
            cy.wait(500)
            cy.get('textarea[name="bio"]').clear()
            cy.get('button[type="submit"]').contains('Save Changes').click()
            })  
          
       it('Edit Law Firm', () => {
    
            cy.login("pedro@bustamante.com", "test1234")
            cy.contains('button','Sign In').click()
            cy.wait('@gqlgetMarketplaceQuery')
            cy.get('#customized-avatar-button').click()
            cy.contains("Attorney profile").click()
            cy.wait('@gqlCatalogLanguageQuery')
            .its('response.body.data').should('have.property', "catalog_language")
            cy.contains('Law Firm').click()
            cy.get('input[name="city"]').clear()
            cy.get('input[name="city"]').type('autotext')
            cy.get('button[type="submit"]').contains('Save Changes').click()
            cy.wait('@gqlUpdateAttorneyProfileItemMutation')
            .its('response.body.data.update_attorney_profile_item').should('have.property','first_name')
            cy.wait('@gqlAttorneyQuery')
            .its('response.body.data.attorney.profiles.firms.city').should('equal','autotext')
            cy.get('input[name="city"]').clear()
            cy.get('input[name="city"]').type('Los Angeles')
            cy.get('button[type="submit"]').contains('Save Changes').click({force: true})
            cy.wait('@gqlAttorneyQuery')
            .its('response.body.data.attorney.profiles.firms.city').should('equal','Los Angeles')
            })  

        it('Edit Practice Areas', () => {
    
            cy.login("pedro@bustamante.com", "test1234")
            cy.contains('button','Sign In').click()
            cy.wait('@gqlgetMarketplaceQuery')
            cy.get('#customized-avatar-button').click()
            cy.contains("Attorney profile").click()
            cy.wait('@gqlCatalogLanguageQuery')
            .its('response.body.data').should('have.property', "catalog_language")
            cy.contains('Practice Areas').click()
            cy.contains('Criminal Defense').click({force: true})
            cy.get('button[type="submit"]').contains('Save Changes').click({force: true})
            cy.wait('@gqlUpdateAttorneyProfileItemMutation')
            .its('response.body.data.update_attorney_profile_item').should('have.property','first_name')
            cy.contains('Criminal Defense').click({force: true})
            cy.get('button[type="submit"]').contains('Save Changes').click({force: true})
            cy.wait('@gqlAttorneyQuery')
            .its('response.body.data.attorney[0].profiles[0].practice_areas').should('be.empty')
            })  
       
        it('Edit Awards', () => {
    
            cy.login("pedro@bustamante.com", "test1234")
            cy.contains('button','Sign In').click()
            cy.wait('@gqlgetMarketplaceQuery')
            cy.get('#customized-avatar-button').click()
            cy.contains("Attorney profile").click()
            cy.wait('@gqlCatalogLanguageQuery')
            .its('response.body.data').should('have.property', "catalog_language")       
            cy.contains('Awards').click()
            cy.get('#CancelIcon').click()
            cy.get('button[type="submit"]').contains('Save Changes').click({force: true})
            cy.wait('@gqlUpdateAttorneyProfileItemMutation')
            .its('response.body.data.attorney[0].profiles[0].awards').should('be.empty')
            cy.get('#awards').click({force: true})
            cy.xpath("//li[@id='awards-option-1']").click({force: true})
            cy.get('button[type="submit"]').contains('Save Changes').click({force: true})
            cy.wait('@gqlUpdateAttorneyProfileItemMutation')
            .its('response.body.data.attorney[0].profiles[0].awards.award_id.id').should('equal','329ea3c0-3acd-11ee-bcc9-db7101f49eec')

            })  
   
})  