/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/login'); // Замените на реальный URL вашей страницы логина
    cy.fixture('login').then((loginData) => {
        cy.get('input[name="email"]').type(loginData.email);
        cy.get('input[name="password"]').type(loginData.password);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/'); // Ожидание редиректа на главную страницу
    });
});

Cypress.Commands.add('createOrder', () => {
    cy.get('#scrollable-container').within(() => {
        cy.get('#bun').next().find('[data-test-id^=ingredient-card-]').first().as('bun');
    });
    cy.get('#constructorArea').as('constructorArea');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructorArea').trigger('drop');

    cy.get('#scrollable-container').within(() => {
        cy.get('#sauce').next().find('[data-test-id^=ingredient-card-]').first().as('sauce');
    });
    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructorArea').trigger('drop');

    cy.get('#scrollable-container').within(() => {
        cy.get('#main').next().find('[data-test-id^=ingredient-card-]').first().as('main');
    });
    cy.get('@main').trigger('dragstart');
    cy.get('@constructorArea').trigger('drop');
});