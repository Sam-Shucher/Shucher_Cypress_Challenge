/// <reference types="cypress" />

// based on https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
//by having the "selector" as an argument, you can recycle getIframe functions for different iframes on a page
const getIframeDocument = (selector) => {
    return (
      cy
        .get(selector)
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its("0.contentDocument")
        .should("exist")
    );
  };
  
  const getIframeBody = (selector) => {
    // get the document
    return (
      getIframeDocument(selector)
        // automatically retries until body is loaded
        .its("body")
        .should("not.be.undefined")
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    );
  };
  
  describe("Checking the selected tab", () => {
    it("A user should be able to filter blog posts via the <see more filters> dropdown", () => {
      cy.visit("https://premium.demo.uconnectlabs.com/elmi/");
      cy.wait(1000);
      //verify page title is LMI – Premium College , we use the cypress title function
      cy.title().should("eq", "LMI – Premium College");
  
      // because the tabs are in an iframe, we need to get the iframe body, then do our regular commands against it ( get doesnt work but find does the trick)
      getIframeBody("#uconnect-lmi-root > iframe")
        .find('#js-lmi-filters > ul > li > a[href="#filters-tabs-keyword"]')
        .should("have.class", "active");
        
        //verify the  other tab is not active
        getIframeBody("#uconnect-lmi-root > iframe")
        .find('#js-lmi-filters > ul > li > a[href="#filters-tabs-categories"]')
        .should("have.class", "");
  
  
        // Select “OR, BY FILTERING FOR INDUSTRY AND OCCUPATION” tab and verify it is selected.
        getIframeBody("#uconnect-lmi-root > iframe")
        .find('#js-lmi-filters > ul > li > a[href="#filters-tabs-categories"]').click();
        
        //verify the other tab is not selected
        getIframeBody("#uconnect-lmi-root > iframe")
        .find('#js-lmi-filters > ul > li > a[href="#filters-tabs-keyword"]')
        .should("have.class", "");
    });
  });
  