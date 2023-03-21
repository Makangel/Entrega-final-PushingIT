export class ShoppingCartPage{

    /*- La clase 'shoppingCartPage' debe tener un único método para verificar los productos y
otro unico metodo para verificar el precio y debe relacionar el precio al producto.
*/

verificarNombreProducto(producto){
    cy.xpath(`//p[contains(text(),"${producto}")]`).should("exist");
}

verificarPrecioProducto(producto,precio){
    cy.xpath(`//p[contains(text(),"${producto}")]
    //following-sibling::p[@name="${precio}"]`)
    .should("exist");
}

}