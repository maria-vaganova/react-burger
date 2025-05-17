/// <reference types="cypress" />
import {SELECTORS} from "../support/selectors";

context('BurgerConstructor order modal', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should create order and check order number', () => {
        cy.createOrder();

        cy.contains(SELECTORS.ORDER_BUTTON_TEXT).click();

        cy.get(SELECTORS.MODAL, {timeout: 300000}).should('be.visible');

        cy.get(SELECTORS.ORDER_NUMBER).should('not.equal', '0');

        cy.get(SELECTORS.CLOSE_BUTTON).click();
        cy.get(SELECTORS.MODAL).should('not.exist');
    });
});