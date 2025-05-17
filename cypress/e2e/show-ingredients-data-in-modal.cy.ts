/// <reference types="cypress" />
import {SELECTORS} from "../support/selectors";

context('BurgerIngredients Modal data', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should show modal with ingredient details on ingredient click', () => {
        cy.get(SELECTORS.SCROLLABLE_CONTAINER).within(() => {
            cy.get(SELECTORS.BUN).next().find(SELECTORS.INGREDIENT_CARD).first().click();
        });

        cy.get(SELECTORS.MODAL).should('exist');
        cy.get(SELECTORS.MODAL).contains('Детали ингредиента');

        cy.get('[data-test-id="ingredient-name"]').should('not.have.text', '');

        cy.get('[data-test-id="calories-value"]').should('not.have.text', '');
        cy.get('[data-test-id="proteins-value"]').should('not.have.text', '');
        cy.get('[data-test-id="fat-value"]').should('not.have.text', '');
        cy.get('[data-test-id="carbohydrates-value"]').should('not.have.text', '');

        cy.get(SELECTORS.CLOSE_BUTTON).click();
        cy.get(SELECTORS.MODAL).should('not.exist');
    });
});