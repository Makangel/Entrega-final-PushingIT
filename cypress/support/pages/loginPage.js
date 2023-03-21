export class LoginPage{

    constructor(){
        this.usuarioInput = '#user';
        this.passwordInput = '#pass';
        this.logInButton = '#submitForm'
    }

escribirUsuario(usuario){
    cy.get(this.usuarioInput).type(usuario);
}

escribirPassword(password){
    cy.get(this.passwordInput).type(password);
}

clickLogIn(){
    cy.get(this.logInButton).click();
}

login(usuario, password){
    this.escribirUsuario(usuario);
    this.escribirPassword(password);
    this.clickLogIn();
}

}
