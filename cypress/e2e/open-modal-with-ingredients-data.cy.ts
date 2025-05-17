/// <reference types="cypress" />
import {SELECTORS} from "../support/selectors";

context('BurgerIngredients Modal', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should show modal on ingredient click', () => {
        cy.get(SELECTORS.SCROLLABLE_CONTAINER).within(() => {
            cy.get(SELECTORS.BUN).next().find(SELECTORS.INGREDIENT_CARD).first().click();
        });

        cy.get(SELECTORS.MODAL).should('exist');
        cy.get(SELECTORS.MODAL).contains('Детали ингредиента');

        cy.get(SELECTORS.CLOSE_BUTTON).click();
        cy.get(SELECTORS.MODAL).should('not.exist');
    });
});