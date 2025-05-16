import {SELECTORS} from "../support/selectors";

context('BurgerConstructor drag-n-drop', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should move bun to cart', () => {
        cy.get(SELECTORS.SCROLLABLE_CONTAINER).within(() => {
            cy.get(SELECTORS.BUN).next().find(SELECTORS.INGREDIENT_CARD).first().as('ingredient');
        });
        cy.get(SELECTORS.CONSTRUCTOR).as('constructorArea');

        cy.get('@ingredient').trigger('dragstart');
        cy.get('@constructorArea').trigger('drop');

        cy.get(SELECTORS.CART).should('contain', '(верх)');
        cy.get(SELECTORS.CART).should('contain', '(низ)');
    });
});