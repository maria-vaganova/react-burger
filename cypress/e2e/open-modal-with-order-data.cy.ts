import {SELECTORS} from "../support/selectors";

context('BurgerConstructor order modal', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should create order and check order number', () => {
        cy.createOrder();

        cy.contains(SELECTORS.ORDER_BUTTON_TEXT).click();

        cy.get('[data-test-id="modal"]', {timeout: 300000}).should('be.visible');

        cy.get(SELECTORS.ORDER_NUMBER).should('not.contain', '0');

        cy.get(SELECTORS.CLOSE_BUTTON).click();
        cy.get(SELECTORS.MODAL).should('not.exist');
    });
});