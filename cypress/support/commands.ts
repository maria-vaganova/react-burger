import {SELECTORS} from "./selectors";

Cypress.Commands.add('login', () => {
    cy.visit('login');
    cy.fixture('login').then((loginData) => {
        cy.get('input[name="email"]').type(loginData.email);
        cy.get('input[name="password"]').type(loginData.password);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
    });
});

Cypress.Commands.add('createOrder', () => {
    cy.get(SELECTORS.SCROLLABLE_CONTAINER).within(() => {
        cy.get(SELECTORS.BUN).next().find(SELECTORS.INGREDIENT_CARD).first().as('bun');
    });
    cy.get(SELECTORS.CONSTRUCTOR).as('constructorArea');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructorArea').trigger('drop');

    cy.get(SELECTORS.SCROLLABLE_CONTAINER).within(() => {
        cy.get(SELECTORS.SAUCE).next().find(SELECTORS.INGREDIENT_CARD).first().as('sauce');
    });
    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructorArea').trigger('drop');

    cy.get(SELECTORS.SCROLLABLE_CONTAINER).within(() => {
        cy.get(SELECTORS.MAIN).next().find(SELECTORS.INGREDIENT_CARD).first().as('main');
    });
    cy.get('@main').trigger('dragstart');
    cy.get('@constructorArea').trigger('drop');
});