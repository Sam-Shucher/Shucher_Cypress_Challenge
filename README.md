Notes

Just make sure you have yarn installed, and make sure your inside the Shucher_Cypress_Challenge directory

install dependencies
--> yarn install

How to run the tests
--> yarn cypress run

how to open the interactive runner
--> yarn cypress open


part A 

Utilized the tool cypress recorder to get steps quickly  https://chrome.google.com/webstore/detail/cypress-recorder/glcapdcacdfkokcmicllhcjigeodacab

I verified requirements based off of visibility, the state of buttons ( enabled / not enabled ),
 includes &OR contains text& Elements, And checking against expected versus actual text


part B

Once I realized that iframe was responsible for me not being able to get/touch/assert my targets, it got alot easier. I found a bit of code here -->
--> ( https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/) that helped make the test easier, there are some other note in the code itself for this part

for verifying the title, i used the cypress cy.title command to help get and assert the title

essentially I asserted tab 1 was active and tab 2 was not, and once i selected tab 2, i asserted again that tab 1 was not active and tab 2 was


Part C.

Wow. I had to structure my commands in a way to avoid a context issue.  I attempted to use a spy to catch the method that i needed to verify. I was able to verify that it does in deed exist, and is it defined.
Using the cy.viewport did not trigger the method. If i call the method manually the spy catches the method being called, proving that my spy does work.

 at first i wasnt sure if the method just took a while to trigger, but waits did not catch the method. after looking at the code via the link, it looks like make_accesable is called pretty early in process. reloading or using cy.go(back) also did not trigger the method. 

 a fun challange 
