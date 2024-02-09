beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3

Task list:
* Create test suite for visual tests for registration form 3 (describe block)

* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */
it('Check that radio button list is correct and functional', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should('have.length', 4)

    // Verify labels of the radio buttons
    cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    // Selecting one will remove selection from the other radio button
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
})

it('should test dropdowns and their dependencies', () => {
    // Verify dropdowns and their initial state
    cy.get('#country').should('exist')
    cy.get('#city').should('exist').should('be.disabled')

    // Select a country and verify city dropdown updates accordingly
    cy.get('#country').select('Spain')
    cy.get('#city').should('not.be.disabled')
    cy.get('#city').children().should('have.length', 5) // Assuming Spain has 4 cities and empty space
    cy.get('#city').select('Valencia')

    // Change the country and verify city dropdown updates and clears previous selection
    cy.get('#country').select('Estonia')
    cy.get('#city').should('not.be.disabled')
    cy.get('#city').children().should('have.length', 4) // Assuming Estonia has 3 cities and empty space
    cy.get('#city').should('not.have.value') // Ensure city selection is cleared
    cy.get('#city').select('Tallinn')

     // Change the country and verify city dropdown updates and clears previous selection
     cy.get('#country').select('Austria')
     cy.get('#city').should('not.be.disabled')
     cy.get('#city').children().should('have.length', 4) // Assuming Austria has 3 cities and empty space
     cy.get('#city').should('not.have.value') // Ensure city selection is cleared

  })

  it('should test checkboxes and their associated labels', () => {
    // Verify checkboxes and their labels
    cy.contains('Accept our privacy policy').should('exist')
    cy.contains('Accept our cookie policy').should('exist')
  })

  it('should validate email format', () => {
    // Enter invalid email format and verify error message
    cy.get('input[name="email"]').type('invamhbdsklfku')
    cy.get('#emailAlert').should('contain', 'Invalid email address')

    // Enter valid email format and verify absence of error message
    cy.get('input[name="email"]').clear().type('validemail@example.com')
    cy.get('#emailAlert').should('not.exist')
  })
