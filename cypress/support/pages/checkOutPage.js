export class CheckOutPage {

    ingresarNombre(nombre){
        cy.get('input[name="firstName"]').type(nombre);
    }

    ingresarApellido(apellido){
        cy.get('input[name="lastName"]').type(apellido);
    }

    ingresarTarjeta(tarjeta){
        cy.get('input[name="cardNumber"]').type(tarjeta);
    }

    goToReceipt(){
        cy.xpath("//button[contains(text(),'Purchase')]").click();
    }

}
