const userInfo = {
  email: 'test123@gmail.com',
  password: 'Test123*',
};
let petName: string;

describe('Adoption process', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.visit('http://localhost:3000/api/auth/signin');
    cy.get('.button')
      .click()
      .wait(2000);
    cy.origin(
      'https://paw.auth.ap-southeast-2.amazoncognito.com',
      { args: { userInfo } },
      ({ userInfo }) => {
        cy.then(() => {
          cy.get('input[name="username"]:visible')
            .should('have.length', 1)
            .type(userInfo.email);
          cy.get('input[name="password"]:visible')
            .should('have.length', 1)
            .type(userInfo.password, { log: false });
          cy.get('input[name="signInSubmitButton"]:visible')
            .should('have.length', 1)
            .click()
            .wait(3000);
        });
      }
    );
  });

  it('Review a paw profile', () => {
    cy.getByData('hero-makeAFriend-btn').click();
    cy.url().should('include', 'adopt_a_paw');
    cy.getByData('adotp-page-filter-btn')
      .should('have.length', 5)
      .contains('Cats')
      .click();
    cy.getByData('pet-item-container')
      .first()
      .within(() => {
        cy.getByData('pet-item-image')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-title')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-category')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-name')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-age')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-gender')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-color')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-size')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-location')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-vaccination')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-availability')
          .should('exist')
          .and('be.visible');
        cy.getByData('pet-item-description')
          .should('exist')
          .and('be.visible');
      });

    cy.getByData('pet-item-container')
      .first()
      .click();
    cy.getByData('pet-detail-popup-container').within(() => {
      cy.getByData('pet-detail-popup-image')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-title')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-category')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-name')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-age')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-gender')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-color')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-size')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-location')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-vaccination')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-availability')
        .should('exist')
        .and('be.visible');
      cy.getByData('pet-detail-popup-description')
        .should('exist')
        .and('be.visible');
    });
  });

  it('Submit an adoption application and update availability status', () => {
    cy.getByData('hero-makeAFriend-btn')
      .click()
      .wait(2000);
    cy.url().should('include', 'adopt_a_paw');
    cy.get('.gap-4')
      .contains('Availability: Yes')
      .parentsUntil('.gap-4')
      .find('[data-cy="pet-item-name"]')
      .invoke('text')
      .then((name) => {
        petName = name.trim();
        cy.log(`Pet Name: ${petName}`);
        cy.wrap(name).as('selectedPetName');
      });

    cy.get('@selectedPetName').then((petName) => {
      cy.get('.gap-4')
        .contains(`${petName}`)
        .parentsUntil('.gap-4')
        .find('[data-cy="pet-item-adopt-btn"]')
        .click();

      cy.get('#fullName').type('Test User');
      cy.get('#age').type('20');
      cy.get('#phone').type('04123456789');
      cy.get('#address').type('15 Broadway');
      cy.get('#city').type('Ultimo');
      cy.get('#state').select('NSW');
      cy.get('#postCode').type('2007');

      cy.get('[data-testid="form-submit-btn"] > .flex')
        .contains('Submit')
        .click()
        .wait(3000);

      cy.get('.gap-4')
        .contains(`${petName}`)
        .parentsUntil('.gap-4')
        .contains('Availability: No')
        .should('exist');
    });
  });
});
