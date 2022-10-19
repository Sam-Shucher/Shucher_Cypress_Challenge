/// <reference types="cypress" />

describe('Checking a method that gets called when we change the view port ', () => {

    it('A user should be able to filter blog posts via the <see more filters> dropdown', () => {

        cy.visit("https://capd.mit.edu/");

        // set the var spy for later use, it will make things easier 
       let spy

       //we are going to use this to avoid context issues
       let win
       
       //wait does not fix
        // cy.wait(60000)


        cy.window().then( (w) => {
            win = w
            
        }).its("uc").then( (uc) => {

            // here we verify that components of the method are we looking for are good to  go
            expect(uc).not.to.be.undefined
            expect(uc.make_accessible).not.to.be.undefined


            // this is where we add our spy ( as apposed to an intercept/stub)
        spy = cy.spy(win.uc, 'make_accessible')
        //inside the spy, we change the view port
        }).then( () => {
            cy.viewport(550, 750)
            //     //wait does not fix }).wait(xamount).then( () => {
        }).wait(100).then( () => {
                 //wait does not fix
            //cy.wait(60000)
            cy.viewport(200, 100)
            expect(spy).not.to.be.called
            win.uc.make_accessible()
            expect(spy).to.be.called

        })
});
});


