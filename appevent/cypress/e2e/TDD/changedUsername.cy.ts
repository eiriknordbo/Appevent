describe("Change username and acknowledge it's change", () =>{
    beforeEach(() => {
        cy.viewport(1280, 720);
    });
    it("Login with profile, go to my profile page and change username.", ()=>{
        const uid = "1KoyhUR05rPnBnuPGWDuBB57mkT2";
        cy.visit("http://localhost:5173");
        cy.get("button").first().should("have.text", "Sign in with Google");
        cy.wait(1000);

        cy.visit("http://localhost:5173/home");
        cy.login(uid);
        cy.wait(1000);

        cy.get("a").eq(1).should("have.text", "Min profil").click();
        cy.wait(1000);
        cy.get("input").first().should("have.value", "").click().type("TestBruker");
        cy.wait(1000);
        cy.get("button").eq(1).should("have.text", "Endre brukernavn");
        cy.wait(1000);
        cy.get("a").eq(0).should("have.text", "Appevent").click();


    })
})