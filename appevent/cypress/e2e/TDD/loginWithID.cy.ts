describe("As a user i want to login with my userID", () =>{
    beforeEach(() => {
        cy.viewport(1280, 720);
    });
    //https://www.npmjs.com/package/cypress-firebase good documentation for creating tests with firebase
    it("Enters the web application and logs in with a specified userID", ()=>{

        const uid = "1KoyhUR05rPnBnuPGWDuBB57mkT2";
        cy.visit("http://localhost:5173");
        cy.get("button").first().should("have.text", "Sign in with Google");
        cy.wait(1000)

        cy.visit("http://localhost:5173/home");
        cy.login(uid);
        cy.wait(1000)

        cy.get("a").eq(1).should("have.text", "Min profil").click();
        cy.get("a").eq(0).should("have.text", "Appevent").click();
        cy.wait(1000)
        cy.get("h3").first().should("have.text", "ENDRE BRUKERNAVNET DITT");


    })
})