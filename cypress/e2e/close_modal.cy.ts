import {SELECTORS} from "../support/selectors";

context('BurgerConstructor Modal close', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should open and close the warning modal when placing an empty order', () => {
        cy.contains(SELECTORS.ORDER_BUTTON_TEXT).click();

        cy.get(SELECTORS.MODAL).should('be.visible');

        cy.get(SELECTORS.MODAL_TEXT).should('contain', 'Ошибка запроса: добавьте ингредиенты');

        cy.get(SELECTORS.CLOSE_BUTTON).click();
        cy.get(SELECTORS.MODAL).should('not.exist');
    });
});