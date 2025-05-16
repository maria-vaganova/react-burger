context('BurgerIngredients Modal', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should show modal on ingredient click', () => {
        cy.contains('Соберите бургер');

        cy.get('#scrollable-container').within(() => {
            cy.get('#bun').next().find('[data-test-id^=ingredient-card-]').first().click();
        });

        cy.get('[data-test-id="modal"]').should('exist');
        cy.get('[data-test-id="modal"]').contains('Детали ингредиента');

        cy.get('[data-test-id="closeButton"]').click();
        cy.get('[data-test-id="modal"]').should('not.exist');
    });
});