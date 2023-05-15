export class ReciptPage{

    /*- Verificar los siguientes datos en el ticket de compra (Nombre y apellido, productos,
tarjeta de crédito, costo total)*/

verifyFullName(name, lastName){
    let auxiliar = name + ' ' + lastName;
    return cy.contains(auxiliar , {timeout: 15000});
}


verifyProduct(product){
    return cy.xpath(`//p[@id='${product}'][contains(text(),'${product}')]`);
}

verifyCard(card){
    return cy.xpath(`//p[@id='creditCard'][contains(text(),'${card}')]`);
}

verifyTotalPrice(totalPrice){
    return cy.contains(totalPrice);
}

}