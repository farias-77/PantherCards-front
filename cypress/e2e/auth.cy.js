import { faker } from "@faker-js/faker";

describe("Testa SignUp", () => {
    it("Testa SignUp", () => {
        const password = faker.internet.password();
        const user = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password,
            confirmPassword: password,
        };

        cy.visit("https://panther-cards.vercel.app/signUp");

        cy.get("#username").type(user.username);
        cy.get("#emailSignUp").type(user.email);
        cy.get("#passwordSignUp").type(user.password);
        cy.get("#confirmPassword").type(user.confirmPassword);

        cy.intercept("POST", `https://superzaprecall.onrender.com/sign-up`).as(
            "signUp"
        );
        cy.get("#submitButton").click();
        cy.wait("@signUp");

        cy.url().should("equal", "https://panther-cards.vercel.app/");
    });
});

describe("Testa SignIn", () => {
    it("Testa SignIn", () => {
        const password = faker.internet.password();
        const user = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password,
            confirmPassword: password,
        };

        cy.visit("https://panther-cards.vercel.app/signUp");

        cy.get("#username").type(user.username);
        cy.get("#emailSignUp").type(user.email);
        cy.get("#passwordSignUp").type(user.password);
        cy.get("#confirmPassword").type(user.confirmPassword);

        cy.intercept("POST", `https://superzaprecall.onrender.com/sign-up`).as(
            "signUp"
        );
        cy.get("#submitButton").click();
        cy.wait("@signUp");

        cy.get("#email").type(user.email);
        cy.get("#password").type(user.password);

        cy.intercept("POST", `https://superzaprecall.onrender.com/sign-in`).as(
            "signIn"
        );

        cy.get("#submitButton").click();
        cy.wait("@signIn");

        cy.url().should("equal", "https://panther-cards.vercel.app/home");
    });
});
