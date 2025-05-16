context('BurgerConstructor Modal close', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should open and close the warning modal when placing an empty order', () => {
        cy.contains('Оформить заказ').click();

        cy.get('[data-test-id="modal"]').should('be.visible');

        cy.get('[data-test-id="modal"] .text_type_main-default').should('contain', 'Ошибка запроса: добавьте ингредиенты');

        cy.get('[data-test-id="closeButton"]').click();
        cy.get('[data-test-id="modal"]').should('not.exist');
    });
});