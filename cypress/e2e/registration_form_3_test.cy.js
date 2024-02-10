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

it('should validate radio button list and functionality', () => {
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
    cy.get('#emailAlert').should('not.be.enabled')
  })


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

it('should fill in all fields and assert values', () => {
    // Fill in all fields
    cy.get('#name').type('John Doe')
    cy.get('input[name="email"]').type('john@example.com')
    
    // Select the country by its text
    cy.get('#country').select('Spain')
  
    // Select Madrid from the city dropdown
    cy.get('#city').select('Madrid')
    
    // Fill in other fields
    cy.get('input[type="date"]').first().type('2024-02-10')
    cy.get('input[name="freq"]').check('Daily')
    cy.get('input[name="birthday"]').type('2000-01-01')
    cy.get('input[type="checkbox"]').check()
  
    // Assert values
    cy.get('#name').should('have.value', 'John Doe')
    cy.get('input[name="email"]').should('have.value', 'john@example.com')
    cy.get('#country').should('contain', 'Spain')
    cy.get('#city').should('contain', 'Madrid')
    cy.get('input[type="date"]').should('have.value', '2024-02-10')
    cy.get('input[name="freq"][value="Daily"]').should('be.checked')
    cy.get('input[name="birthday"]').should('have.value', '2000-01-01')
    cy.get('input[type="checkbox"]').should('be.checked')
})


// Test case to check absence of mandatory fields
it('should assert absence of mandatory fields', () => {
    // Call the function to check absence of mandatory fields
    inputValidData(JohnDoe);
    cy.get('input[name="email"]').scrollIntoView()
    cy.get('input[name="email"]').clear()
    // Assert that error message is visible
    cy.get('#emailAlert').should('contain', 'Email is required')
});
  
// Importing the cypress-file-upload plugin
import 'cypress-file-upload';

// Test case to upload a file
it('should upload a file', () => {
    // Define the file path
    const filePath = 'cypress/fixtures/upload_file.html';

    // Upload the file
    cy.get('input[type="file"]').attachFile(filePath);
});

// Function to input valid data
function inputValidData(data) {
    cy.get('#name').type(data.name);
    cy.get('input[name="email"]').type(data.email);
    cy.get('#country').select(data.country);
    cy.get('#city').select(data.city);
    cy.get('input[type="date"]').first().type(data.registrationDate);
    cy.get('input[name="freq"][value="' + data.newsletterFreq + '"]').check();
    cy.get('input[name="birthday"]').type(data.birthday);
    if (data.acceptPrivacyPolicy) {
        cy.get('input[type="checkbox"]').check();
    }
}

// Usage of the inputValidData function
const JohnDoe = {
    name: 'John Doe',
    email: 'john@example.com',
    country: 'Spain',
    city: 'Madrid',
    registrationDate: '2024-02-10',
    newsletterFreq: 'Daily',
    birthday: '2000-01-01',
    acceptPrivacyPolicy: true
};

// Call the function with valid data
inputValidData(JohnDoe);
