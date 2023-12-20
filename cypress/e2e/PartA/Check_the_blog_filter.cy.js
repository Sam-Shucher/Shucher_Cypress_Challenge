/// <reference types="cypress" />


describe('Checking the blog filtering', () => {
  it('A user should be able to filter blog posts via the <see more filters> dropdown', () => {

      //first we visit the site
      cy.visit("https://capd.mit.edu/");


      // next we select the "See more filters", toggle this to verify the asserts 
      cy.get('.default > span').click();

      //Verify the Filters panel is open by verifying that expected filter options are visible
      cy.contains("Affinity / Identity:").should('be.visible');

      // here we verify that before we select any option the apply filters button is not enabled
      cy.get('.actions > .button').should('be.disabled');

      // in this part we verify that we can get the actual options ( not just the heading options in the dropdown)  
      cy.get('fieldset:nth-child(3) > .tag-label:nth-child(7)').should('be.visible').then($el => {
          const text = $el.text();
          expect(text).to.eq('Faculty/Staff');
      });


      //news and advice 

      cy.get('label[for="tag_news-advice_id_1"]').click();

          // verify news and advice tag is enabled * i wasnt able to find a way in the dev tools to see that that button was selected, so this is my work around
          cy.get('div.actions').contains('a', 'Clear').then($el => {
          const text = $el.text();
          expect(text).to.eq('Clear');

      });

      // verify apply filters is now active
      cy.get('input.button[value="Apply Filters"]').should('be.enabled');

      //apply filters / submit form
      cy.get('input.button[value="Apply Filters"]').click();


      //Verify redirect to the /blog
      cy.url().should('include', '/blog');

      //verify url has the tag in it
      cy.url().should('include', 'news-advice');


      //verify the tag is selected in UI
      cy.contains('News & Advice')

  });
});
//*[@id="content"]/div[1]/div[2]/form/div[2]/button