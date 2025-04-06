describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://geraldy1st.github.io/portfolio/");
  });

  it("The h1 has my name", () => {
    cy.get("h1").should("exist").contains("Geraldy LEONDAS");
  });

  it("Navigation menu is present and contains expected links", () => {
    cy.get("nav").should("exist");
    cy.get("nav a").should("have.length.at.least", 1);
    cy.get("nav a").first().should("have.attr", "href");
  });

  it("Social media links are present and clickable", () => {
    cy.get("a[href*='github']").should("exist");
    cy.get("a[href*='linkedin']").should("exist");
    cy.get("a[href*='github']")
      .should("have.attr", "href")
      .and("include", "github");
  });

  it("Portfolio section contains projects", () => {
    // Find the projects container div by its class
    cy.get(".portfolio__container")
      .should("exist") // Ensure the container div exists
      .within(() => {
        // Look inside the container
        // Find elements with the class 'project-card'
        cy.get(".portfolio__item").should("have.length.at.least", 1); // Assert there is at least one project
      });
  });

  it("Contact form is present and interactive", () => {
    cy.get("form").should("exist");
    cy.get("input[type='email']").should("exist");
    cy.get("textarea").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  it("Can fill and submit the contact form", () => {
    // Scroll to the form
    cy.get("form").scrollIntoView();

    // Fill in the form fields
    cy.get("input[name='name']").type("Claude");
    cy.get("input[type='email']").type("geraldy1st@gmail.com");
    cy.get("textarea").type("ceci est un message envoyé depuis cypress");

    // Wait for 4 seconds
    cy.wait(4000);

    // Submit the form
    cy.get("button[type='submit']").click();
  });

  it("Website is responsive", () => {
    // Test mobile view
    cy.viewport("iphone-6");
    cy.get("nav").should("be.visible");

    // Test tablet view
    cy.viewport("ipad-2");
    cy.get("nav").should("be.visible");

    // Test desktop view
    cy.viewport(1280, 720);
    cy.get("nav").should("be.visible");
  });

  it("Theme toggle button works correctly", () => {
    // Check if theme toggle button exists and is visible
    cy.get(".theme-toggle").should("exist").and("be.visible");

    // Get initial theme
    cy.document().then((doc) => {
      const initialTheme = doc.documentElement.getAttribute("data-theme");

      // Click the theme toggle
      cy.get(".theme-toggle").click();

      // Wait for theme change
      cy.wait(500);

      // Check if theme has changed
      cy.document().then((doc) => {
        const newTheme = doc.documentElement.getAttribute("data-theme");
        expect(newTheme).to.not.equal(initialTheme);
      });
    });
  });

  it("Profile image is displayed correctly", () => {
    // Check if profile image exists and is visible
    cy.get(".me > img").should("exist").should("be.visible");

    // Check image attributes individually
    cy.get(".me > img").should("have.attr", "src");
    cy.get(".me > img").should("have.attr", "alt");

    // Check if image is properly loaded
    cy.get(".me > img").should(($img) => {
      const img = $img[0];
      expect(img.naturalWidth).to.be.greaterThan(0);
      expect(img.naturalHeight).to.be.greaterThan(0);
    });

    // Check if image has proper styling and dimensions via CSS
    cy.get(".me > img").should("have.css", "border-radius");
    cy.get(".me > img").should("have.css", "width");
    cy.get(".me > img").should("have.css", "height");
  });
});
