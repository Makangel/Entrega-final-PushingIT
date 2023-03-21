const { RegisterPage } = require('../support/pages/registerPage.js');
const { LoginPage } = require('../support/pages/loginPage.js');
const { HomePage } = require('../support/pages/homePage.js');
const { ProductsPage } = require('../support/pages/productsPage.js');
const { ShoppingCartPage } = require('../support/pages/shoppingCartPage.js');

describe("empty spec", () => {
  /*TEST:
- Ingresar en la pagina de pushing IT.
- Ingresar al sistema con datos validos.
- Dirigirse al modulo "Online Shop".
- Elegir 2 productos a elección y añadirlos al carrito.
- Verificar el nombre y precio de los dos productos.
- Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos */

  let loginData;
  let productsData;

  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();


  before("Iniciamos los fixtures", () => {
    cy.fixture("loginData").then((data1) => {
      loginData = data1;
    });

    cy.fixture("productsData").then((data2) =>{
      productsData = data2;
    })
  });

  it("TEST GLOBAL", () => {
    cy.visit("");
    registerPage.accederALogIn();
    loginPage.login(loginData.username,loginData.password);
    homePage.ingresarAOnlineShop();
    productsPage.agregarProducto(productsData.WhitePants.name);
    productsPage.agregarProducto(productsData.RedCap.name);
    cy.xpath("//button[contains(text(),'Go to shopping cart')]").click();
    
    shoppingCartPage.verificarNombreProducto(productsData.WhitePants.name);
    shoppingCartPage.verificarPrecioProducto(productsData.WhitePants.name,productsData.WhitePants.price);

    shoppingCartPage.verificarNombreProducto(productsData.RedCap.name);
    shoppingCartPage.verificarPrecioProducto(productsData.RedCap.name, productsData.RedCap.price);

    cy.xpath("//button[contains(text(),'Show total price)]").click();

  });
});
