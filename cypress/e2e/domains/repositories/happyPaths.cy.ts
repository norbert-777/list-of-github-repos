const SELECTOR = {
  mainHeadingLink: 'h1 a',
  searchButton: '[aria-label="Search"]',
  searchInput: '[aria-label="Search for GitHub repositories"]',
  paginationPage1: '[aria-label="Go to page 1"]',
  paginationPage5: '[aria-label="Go to page 5"]',
  repositoryItemLink: '[data-cy="repositories.item.link"]',
} as const;

const checkIfFirstItemHrefHasChanged = (variableNameToCompare: string) => {
  // Read the variable and compare its value with the first list link href
  cy.get(`@${variableNameToCompare}`).then((variableValue) => {
    cy.get(SELECTOR.repositoryItemLink).first().should('not.have.attr', 'href', variableValue);
  });
};

const storeFirstItemHrefAs = (variableNameToStore: string) => {
  // Get the first item in the list, check the link and store its value under the variable

  cy.get(SELECTOR.repositoryItemLink)
    .first()
    .invoke('attr', 'href')
    .should('include', 'https://github.com/')
    .as(variableNameToStore);
};

const checkSearchInputValue = (expectedValue: string) => {
  cy.get(SELECTOR.searchInput).should('have.value', expectedValue);
};

const checkRepositoriesListLength = (expectedLength = 20) => {
  if (expectedLength > 0) {
    cy.get(SELECTOR.repositoryItemLink).should('have.length', expectedLength);
  } else {
    cy.get(SELECTOR.repositoryItemLink).should('not.exist');
  }
};

describe('Happy paths ', () => {
  it('A user is able to visit the homepage and search "typescript", later on, to change the page number and go back to the homepage', () => {
    // Action: Visit the homepage
    cy.visit('/');

    // Action: Check if the input value is empty, enter 'typescript' and search
    cy.get(SELECTOR.searchInput).should('have.value', '').type('TypeScript');
    cy.get(SELECTOR.searchButton).click();

    // -> Wait for the page change
    cy.location('pathname').should('eq', '/typescript');
    // -> Check if in the input is kept previously entered value
    checkSearchInputValue('typescript');
    // -> Check the results (typescript is a popular term and there are more than 1000 results)
    checkRepositoriesListLength();
    // -> Save the URL
    storeFirstItemHrefAs('page1FirstItemHref');

    // Action: Go to page no 5
    cy.get(SELECTOR.paginationPage5).click();

    // -> Wait for the page change
    cy.location('pathname').should('eq', '/typescript/5');
    // -> Check if in the input is kept previously entered value
    checkSearchInputValue('typescript');
    // -> Check if the results list has changed
    checkRepositoriesListLength();
    checkIfFirstItemHrefHasChanged('page1FirstItemHref');
    storeFirstItemHrefAs('page5FirstItemHref');

    // Action: Go to page no 1
    cy.get(SELECTOR.paginationPage1).click();

    // -> Wait for the page change
    cy.location('pathname').should('eq', '/typescript');
    // -> Check if the results list has changed
    checkIfFirstItemHrefHasChanged('page5FirstItemHref');
    // -> Check if in the input is kept previously entered value
    checkSearchInputValue('typescript');

    // Action: Go back to the homepage
    cy.get(SELECTOR.mainHeadingLink).click();

    // -> Wait for the page change
    cy.location('pathname').should('eq', '/');
    // -> Check if the results list is hidden
    checkRepositoriesListLength(0);
    // -> Search input should be reset
    checkSearchInputValue('');
  });

  it('A user is able to visit any previously visited search and change the search term, later on, to change the page number and visit the selected link repository', () => {
    // Action: Visit the page with search term search
    cy.visit('/react%20js');

    // -> Check if in the input contains the correct value
    checkSearchInputValue('react js');
    // -> Check the results ('react js' is a popular term and there are more than 1000 results)
    checkRepositoriesListLength();

    // Action: Go to page no 5
    cy.get(SELECTOR.paginationPage5).click();

    // -> Wait for the page change
    cy.location('pathname').should('eq', '/react%20js/5');
    // -> Check if in the input is kept previously entered value
    checkSearchInputValue('react js');
    // -> Check if the results list has changed
    checkRepositoriesListLength();

    // Action: Click on the repository name
    cy.get(SELECTOR.repositoryItemLink)
      .first()
      .should('have.attr', 'target', '_blank')
      .invoke('attr', 'href')
      .should('include', 'https://github.com/');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
