context('BurgerConstructor drag-n-drop', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should move bun to cart', () => {
        cy.get('#scrollable-container').within(() => {
            cy.get('#bun').next().find('[data-test-id^=ingredient-card-]').first().as('ingredient');
        });
        cy.get('#constructorArea').as('constructorArea');

        cy.get('@ingredient').trigger('dragstart');
        cy.get('@constructorArea').trigger('drop');

        cy.get('#cart').should('contain', '(верх)');
        cy.get('#cart').should('contain', '(низ)');
    });
});