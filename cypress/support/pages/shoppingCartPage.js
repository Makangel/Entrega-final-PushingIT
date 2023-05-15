export class ShoppingCartPage {
  verificarNombreProducto(producto) {
    return cy.xpath(`//p[contains(text(),"${producto}")]`);
  }

  verificarPrecioProducto(producto, precio) {
    return cy.xpath(`//p[contains(text(),"${producto}")]
    //following-sibling::p[@name="${precio}"]`);
  }

  verifyTotalPrice(total) {
    return cy.contains(total);
  }

  clickShowTotalPrice() {
    cy.xpath("//button[contains(text(),'Show total price')]").click();
  }

  goToCheckout() {
    cy.contains("Go to Checkout").click();
  }
}
