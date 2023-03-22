export class ShoppingCartPage{

    /*- La clase 'shoppingCartPage' debe tener un único método para verificar los productos y
otro unico metodo para verificar el precio y debe relacionar el precio al producto.
*/

verificarNombreProducto(producto){
    return cy.xpath(`//p[contains(text(),"${producto}")]`);
}

verificarPrecioProducto(producto,precio){
    cy.xpath(`//p[contains(text(),"${producto}")]
    //following-sibling::p[@name="${precio}"]`)
    .should("exist");
}

verifyTotalPrice(total){
    return cy.contains(total);
};

clickShowTotalPrice(){
    cy.xpath("//button[contains(text(),'Show total price')]").click();
};

}