context('BurgerConstructor order modal', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should create order and check order number', () => {
        cy.createOrder();

        cy.contains('Оформить заказ').click();

        cy.get('[data-test-id="modal"]', {timeout: 30000}).should('be.visible');

        cy.get('#orderNumber').should('not.contain', '0');

        cy.get('[data-test-id="closeButton"]').click();
        cy.get('[data-test-id="modal"]').should('not.exist');
    });
});