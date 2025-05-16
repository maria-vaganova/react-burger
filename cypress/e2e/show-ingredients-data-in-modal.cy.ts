context('BurgerIngredients Modal data', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should show modal with ingredient details on ingredient click', () => {
        cy.contains('Соберите бургер');

        cy.get('#scrollable-container').within(() => {
            cy.get('#bun').next().find('[data-test-id^=ingredient-card-]').first().click();
        });

        cy.get('[data-test-id="modal"]').should('exist');
        cy.get('[data-test-id="modal"]').contains('Детали ингредиента');

        cy.get('[data-test-id="ingredient-name"]').should('not.have.text', '');

        cy.get('[data-test-id="calories-value"]').should('not.have.text', '');
        cy.get('[data-test-id="proteins-value"]').should('not.have.text', '');
        cy.get('[data-test-id="fat-value"]').should('not.have.text', '');
        cy.get('[data-test-id="carbohydrates-value"]').should('not.have.text', '');

        cy.wait(3000);

        cy.get('[data-test-id="closeButton"]').click();
        cy.get('[data-test-id="modal"]').should('not.exist');
    });
});