export class ProductsPage {

  /*- La clase 'productsPage' debe tener un único método que agregue los productos e indicar
el producto a agregar como parámetro. XPATH*/
  agregarProducto(producto) {
    cy.xpath(
      `//p[contains(text(),"${producto}")]
        //following-sibling::button[contains(text(),"Add to cart")]`
    ).click();
    cy.xpath("//button[contains(text(),'Close')]").click();
  }
}
