// write a e2e test for the middleware
describe("middleware", () => {
  it("redirect to sign in", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/en/sign-in");
  });
  it("redirect to the language", () => {
    cy.visit("/en");
    cy.location("pathname").should("include", "/en");
  });
});
