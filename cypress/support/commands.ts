/// <reference types="cypress" />
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    // customCommand(param: any): typeof customCommand;
    login(email: string, password: string): void;
  }
}

// function customCommand(param: any): void {
//   console.warn(param);
// }

// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.wait(500);
  cy.get('.signin_form-title-main').contains('Welcome To');
  cy.get('#email').type(email);
  cy.get('#pass').type(password);
  cy.get('#loginBtn').click();
  cy.wait(2000);
});

/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});
