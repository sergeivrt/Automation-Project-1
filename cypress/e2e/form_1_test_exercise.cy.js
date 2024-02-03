beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html');
});

// NB! this is a copy of registration_form_1_test.cy.js

/*
Tasks done during VS Code live demo:
1 and 2 - If you see this text and found file location in the project tree, great job!
3 - Find "MyPass123" - and then duplicate line 20 by using Shift + Alt + DownArrow
4 - Uncomment lines 18 - 21
5 - Find and replace username2 with username
6 - autoformat the code, using Shift + Alt + F
 */

describe('This is the first test suite', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('#username').type('Something');
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040');
        cy.get('input[name="password"]').type('MyPass123');
        cy.get('[name="confirm"]').type('MyPass123');

        // In order to activate submit button, the user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click();

        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approaches
        cy.get('#input_error_message').should('not.be.visible');
        cy.get('#password_error_message').should('have.css', 'display', 'none');

        // Assert that successful message is visible
        // next 2 lines check exactly the same, but using different approaches
        cy.get('#success_message').should('be.visible');
        cy.get('#success_message').should('have.css', 'display', 'block');
    });
});