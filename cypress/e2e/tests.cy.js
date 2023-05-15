const { HomePage } = require("../support/pages/homePage.js");
const { ProductsPage } = require("../support/pages/productsPage.js");
const { ShoppingCartPage } = require("../support/pages/shoppingCartPage.js");
const { CheckOutPage } = require("../support/pages/checkOutPage.js");
const { ReciptPage } = require("../support/pages/reciptPage.js");

//credenciales
const username = "angeles40";
const password = "123456!";
const gender = "Female";
const day = "28";
const month = "9";
const year = "2002";

describe("Test checkout completo", () => {
  /*TEST:
- Ingresar en la pagina de pushing IT.
- Ingresar al sistema con datos validos.
- Dirigirse al modulo "Online Shop".
- Elegir 2 productos a elección y añadirlos al carrito.
- Verificar el nombre y precio de los dos productos.
- Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos */

  let checkoutData;
  let productsData;
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkOutPage = new CheckOutPage();
  const reciptPage = new ReciptPage();

  before("Iniciamos los fixtures", () => {
    cy.fixture("checkoutData").then((data1) => {
      checkoutData = data1;
    });

    cy.fixture("productsData").then((data2) => {
      productsData = data2;
    });
  });

  it("TEST GLOBAL", () => {
    //registro
    cy.request({
      url: "https://pushing-it.onrender.com/api/register",
      method: "POST",
      body: {
        username: username,
        password: password,
        gender: gender,
        day: day,
        month: month,
        year: year,
      },
    }).then((response) => {
      expect(response.status).is.equal(200);
      //logeo
      cy.request({
        url: "https://pushing-it.onrender.com/api/login",
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      }).then((response) => {
        expect(response.status).equal(200);
        window.localStorage.setItem("token", response.body.token);
        window.localStorage.setItem("user", response.body.user.username);
      });
    });

    cy.visit("");
    homePage.ingresarAOnlineShop();
    productsPage.agregarProducto(productsData.WhitePants.name);
    productsPage.agregarProducto(productsData.RedCap.name);
    productsPage.goToShoppingCart();

    shoppingCartPage
      .verificarNombreProducto(productsData.WhitePants.name)
      .should("have.text", productsData.WhitePants.name);
    shoppingCartPage
      .verificarPrecioProducto(
        productsData.WhitePants.name,
        productsData.WhitePants.price
      )
      .should("exist");

    shoppingCartPage
      .verificarNombreProducto(productsData.RedCap.name)
      .should("have.text", productsData.RedCap.name);
    shoppingCartPage
      .verificarPrecioProducto(
        productsData.RedCap.name,
        productsData.RedCap.price
      )
      .should("exist");

    shoppingCartPage.clickShowTotalPrice();
    let auxiliar = productsData.RedCap.price + productsData.WhitePants.price;
    shoppingCartPage.verifyTotalPrice(auxiliar).should("have.text", auxiliar);

    shoppingCartPage.goToCheckout();
    checkOutPage.ingresarNombre(checkoutData.name);
    checkOutPage.ingresarApellido(checkoutData.lastName);
    checkOutPage.ingresarTarjeta(checkoutData.card);
    checkOutPage.goToReceipt();

    reciptPage
      .verifyFullName(checkoutData.name, checkoutData.lastName)
      .should("exist");
    reciptPage
      .verifyProduct(productsData.WhitePants.name)
      .should("have.text", productsData.WhitePants.name);
    reciptPage
      .verifyProduct(productsData.RedCap.name)
      .should("have.text", productsData.RedCap.name);
    reciptPage
      .verifyCard(checkoutData.card)
      .should("have.text", checkoutData.card);
    reciptPage.verifyTotalPrice(auxiliar).should("exist");
  });
});

after("After: Eliminamos el usuario", () => {
  //elimino
  cy.request({
    url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
    method: "DELETE",
  }).then((response) => {
    expect(response.status).equal(200);
  });
});
