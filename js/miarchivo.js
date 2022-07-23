//COLOR #00b09b, #96c92d //
//Proyecto = Crear un e-commerce de Gamer//
//Definimos las variables//
let priceCot = 0;
let couts = "";
let priceCredit = 0;
const mains = document.getElementById("main");

//Definimos el arrays productos//
const allProducts = [];

//Array de carrito//
const cart = [];

//Guardar productos del local
let saveProduct = [];

//Definimos los objetos productos para luegos incorporarlos en su array correspondiente//
class Products {
    constructor(id, name, price, type){
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.sold = false;    
    }

    soldOut(){
        this.sold = true;
    }
}

//Hacemos push para cargar los productos que vamos a usar en el array vacios//
allProducts.push(new Products(1, "Procesador Amd Ryzen 5 3600 4.2ghz Turbo Am4 Wraith Stealth", 32499, "prossesor"));
allProducts.push(new Products(2, "Procesador Intel Core i5-10400F BX8070110400F", 24751, "prossesor"));
allProducts.push(new Products(3, "Procesador gamer AMD Ryzen 5 5600X 100-100000065BOX", 49500, "prossesor"));
allProducts.push(new Products(4, "Motherboard Asus Prime B460m-5", 13990, "motherboard"));
allProducts.push(new Products(5, "Motherboard Gigabyte AB350M V2.0 DS3H AM4", 19800, "motherboard"));
allProducts.push(new Products(6, "Motherboard Asrock H310cm-hdv Intel 1151 Hdmi 8va Y 9na Gen Pcreg", 9999, "motherboard"));
allProducts.push(new Products(7, "Memoria RAM Fury Beast DDR4 gamer color negro 8GB 1 Kingston KF426C16BB/8", 5864, "RAM"));
allProducts.push(new Products(8, "Memoria RAM Vengeance LPX gamer color negro 16GB 2 Corsair CMK16GX4M2B3200C16", 15366, "RAM"));
allProducts.push(new Products(9, "Memoria RAM Fury Beast DDR4 RGB gamer color negro 16GB 1 Kingston KF432C16BBA", 14999, "RAM")); 


//-------------------------------Pusheo de los objetos a el localStorage----------------------//
//Arrow function para cargar objeto por objeto cuando recorramos el array
const productLocal = (clave, valor) => { localStorage.setItem(clave, valor) }
//Definimos funciones//
productLocal("list.products", JSON.stringify(allProducts));

//Funcion identificar Type producto//
function indGeneratorProduct(selecProd){
   let findProduct = allProducts.find((element) => element.id == selecProd)
   return findProduct;
}
//Funcion sacar precios total de los productos//

function priceProduct(){
    let totalPrice = 0;
    for(let indice of cart){
        totalPrice += indice.price;   
    }
    return totalPrice;
 }
//Funcion validacion inputs vacios
function validate(msg){
    let input = "";
    while((input == null) || (input == "")){
        input = prompt(`${msg}`)
    }
    return input;
}
//Funciones para VACIAR EL CARRITO
function empty(array){
    for (let i = array.length; i > 0; i-- ){
        array.pop();
    }
}

function cartEmpty(){
    localStorage.removeItem("carrito")
    empty(cart);
    empty(saveProduct);
    
    mains.innerHTML = `<h1>Tiene su carrito vacio</h1>
    <h3>Por favor elija una de las siguientes opciones</h3>
    <button id="btnManual">Arma tu PC</button>
    <button id="btnAuto">Cotizador automatico</button>`
    
    const btnManual = document.getElementById("btnManual");
    const btnAuto = document.getElementById("btnAuto");
    btnAuto.addEventListener("click", () => cot())
    btnManual.addEventListener("click", () => par())
}

//Funcion para mostrar el carrito//
function cartView(){

    if(saveProduct == ""){
        mains.innerHTML = `<h1>Tiene su carrito vacio</h1>
                           <h3>Por favor elija una de las siguientes opciones</h3>
                           <button id="btnManual">Arma tu PC</button>
                           <button id="btnAuto">Cotizador automatico</button>`
                           
    const btnManual = document.getElementById("btnManual");
    const btnAuto = document.getElementById("btnAuto");
    btnAuto.addEventListener("click", () => cot())
    btnManual.addEventListener("click", () => par())
                       
    }
    else{
        mains.innerHTML = `<h1>Su carrito:</h1>
                            <div id="productsCart"></div>
                            <div>
                            <button id="btnPay">Finalizar Compra</button>
                            <button id="btnBuy">Seguir comprando</button>
                            <button id="btnEmpty"> Vaciar Carrito </button>
                            </div>
                          `
        let btnPay = document.getElementById("btnPay");
        let btnBuy = document.getElementById("btnBuy");
        let btnEmpty = document.getElementById("btnEmpty");
        
        btnBuy.addEventListener("click", () => par())
        btnPay.addEventListener("click", () => modPay())
        btnEmpty.addEventListener("click", () => cartEmpty())
        

        let productsCart = document.getElementById("productsCart");
        cart.forEach(element => {
            let div = document.createElement("div");
            div.innerHTML = `<h2>Producto: ${element.name}</h2>
                            <p><b>Precio: ${element.price}</b></p>
                            `
            productsCart.append(div)
        });
    }
}

//FUNCION PAGOS//
//Funcion para chckear cuantas cuotas van a efectuar el pago.// 
function payConfirm(){
    mains.innerHTML = `<h1>Ingrese los datos de su tarjeta</h1>
                            <p>Ingrese los numeros de su tarjeta: </p> <input type="number"></input><br>
                            <p>Ingrese el codigo de seguridad: </p> <input type="number"></input><br>
                            <input type="text" placeholder="Presione enter aqui al finalizar" id="btnPress"></input>
                        `
    const btnPress = document.getElementById("btnPress");

    btnPress.addEventListener("keypress", (e) => {
                                                  if (e.key === 'Enter'){
                                                    mains.innerHTML = `<h1>Su pago se realizo con exito</h1>
                                                                        <h2>Gracias por su compra!</h2>`
                                                    localStorage.removeItem("carrito")     
                                                    //Para enviar form con enter "e.preventDefault;"//
                                                  }
                                                 })
}

//Funcion una vez que seleccionan la opción, pago con TC
function payCredit(){
    let pricePar = priceProduct();
    mains.innerHTML = `<h1>Ingrese como desea abonar el total:</h1><br>
                        <form>
                            <input type="radio" id="cuots1"name="cuots" value="1" checked>1 Cuota de $${pricePar} - Mismo precio que en efectivo</input><br>
                            <input type="radio" id="cuots3"name="cuots" value="3">3 Cuotas de $${(Math.round(pricePar + (pricePar * 0.05)) / 3)} - 5% de recargo</input><br>
                            <input type="radio" id="cuots6"name="cuots" value="6">6 Cuotas de $${Math.round((pricePar + (pricePar * 0.15)) / 6)} con el 15% de recargo</input><br>
                            <input type="radio" id="cuots12"name="cuots" value="12">12 cuotas de $${(Math.round((pricePar + (pricePar * 0.25)) / 12))} con el 25% de recargo</input>
                            <button id="accCouts">Aceptar</button>
                        </form>`
    
    const accCouts = document.getElementById("accCouts");

    accCouts.addEventListener("click", () => {
                                            let cuots1 = document.getElementById("cuots1")
                                            let cuots3 = document.getElementById("cuots3")
                                            let cuots6 = document.getElementById("cuots6")
                                            let cuots12 = document.getElementById("cuots12")

                                            if (cuots1.checked == true){
                                                mains.innerHTML = `<h1>El total a abonar es de $${pricePar}<h1>
                                                                   <button id="btnPay">Ir al pago</button>`
                                                const btnPay = document.getElementById("btnPay");
                                                
                                                btnPay.addEventListener("click", () => payConfirm())

                                            }

                                            else if (cuots3.checked == true){
                                                mains.innerHTML = `<h1>El total a abonar es de $${Math.round(pricePar + (pricePar * 0.05))} en 3 cuotas de $${Math.round((pricePar + (pricePar * 0.05)) / 3)}<h1>
                                                                   <button id="btnPay">Ir al pago</button>`
                                                                   const btnPay = document.getElementById("btnPay");
                                                
                                                                   btnPay.addEventListener("click", () => payConfirm())
                                            }

                                            else if (cuots6.checked == true){
                                                mains.innerHTML = `<h1>El total a abonar es de $${Math.round(pricePar + (pricePar * 0.15))} en 6 cuotas de $${Math.round((pricePar + (pricePar * 0.15)) / 6)}<h1>
                                                                   <button id="btnPay">Ir al pago</button>`
                                                                   const btnPay = document.getElementById("btnPay");
                                                
                                                                   btnPay.addEventListener("click", () => payConfirm())
                                            }

                                            else if (cuots12.checked == true){
                                                mains.innerHTML = `<h1>El total a abonar es de $${Math.round(pricePar + (pricePar * 0.25))} en 12 cuotas de $${Math.round((pricePar + (pricePar * 0.25)) / 12)}<h1>
                                                                   <button id="btnPay">Ir al pago</button>`
                                                                   const btnPay = document.getElementById("btnPay");
                                                
                                                                   btnPay.addEventListener("click", () => payConfirm())
                                            }
    })
}

//Funcion pago en efectivo

function payCash(){

    let pricePar = priceProduct()
    mains.innerHTML = `<h1>Usted elegió abonar en efectivo/debito, el total a abonar es de $${pricePar}</h1>
                        <h2>Gracias por su compra!</h2`;
    localStorage.removeItem("carrito")  

}

//Funcion donde se mostraran los medios de pagos;

function modPay(){
    
    cart.concat(saveProduct)

    mains.innerHTML = `<h1> METODO DE PAGO</h1>
                        <h2>Total a abonar $${priceProduct()}</h2>
                      <h3> Por favor seleccione como va a abonar </h3>
                      <button id="btnCash">Efectivo/Debito</button>
                      <button id="btnCard">Tarjeta de cred</button>
                      <br><br><br>
                      <h2>SU CARRO:</h2>
                      <div id="divCart"></div>`
    const divCart = document.getElementById("divCart")
    for(let product of cart){
        let div = document.createElement("div");
        div.innerHTML = `<h4>${product.name}<h4>
                         <p>$${product.price}</p>
                        `
        divCart.append(div)
    }

    const btnCash = document.getElementById("btnCash");
    const btnCard = document.getElementById("btnCard");

    btnCash.addEventListener("click", () => payCash() )
    btnCard.addEventListener("click", () => payCredit())

}
// Funcion usando metodo soldOut para pasar los objetos seleccionados a vendidos ( sold : true ) //
function soldProduct(){
    let checkProduct
    let indexCart
    for(checkProduct of cart){
        indexCart = allProducts.findIndex(element => element == checkProduct);
        allProducts[indexCart].soldOut()
    }

}

//Funcion principal donde se va a evaluar si se elige la cotización automatica o de manera particular los componentes//

//Cot va a ser para el final del proyecto//
function cot(){
    
    mains.innerHTML =`<h1>Usted esta eligiendo el cotizador automatico</h1>
                      <h2> Ups, algo salio mal, sera redirigido a Armar su PC</h2>
                      <button id="rtnPar">Particular</button>`;

    const rtnPar = document.getElementById("rtnPar");
    rtnPar.addEventListener("click", () => par())
}
//Funcion variable de productos//
function notify(){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Producto agregado con exito!'
  })}
function categoryProd(category){

    const contProducts = document.getElementById("contProducts");
    let filter = [];
    filter = allProducts.filter( element => element.type === category)
    console.log(filter)

    for(let product of filter){
        let div = document.createElement("div");
        //CREAR EL DIV DE LA CAJA CON EL PRODUCTO Y EL BOTON AGREGAR AL CARRITO;
        contProducts.append(div)
        div.innerHTML = `<div>
                            <h3>${product.name}<h3>
                            <p>Precio: $${product.price}</p><br>
                        </div>`;
        
        let button = document.createElement("button"); 
        button.className = "btnAddCart";
        button.textContent = "Agregar al carrin";
        
        button.addEventListener("click", () => cart.push(product));
        button.addEventListener("click", () => productLocal("carrito", JSON.stringify(cart)));
        button.addEventListener("click", () => notify());        
        div.appendChild(button);
    }
}

//Par de manera particular.

function par(){
    mains.innerHTML =`<h1 id="titleOpcion"> Elija una de las siguientes opciones: </h1>
                      <div>
                           <button id='btnProcessor'>PROCESADORES</button>  
                           <button id="btnMotherB">PLACAS MADRES</button>
                           <button id="btnRams">RAMS</button>
                           <br>
                           <button id="btnBuy">Finalizar compra</button>
                      </div>
                      <div id="contProducts"></div>`;
    
    const btnProcessor = document.getElementById("btnProcessor");
    const btnMotherB = document.getElementById ("btnMotherB");
    const btnRams = document.getElementById("btnRams");
    const btnBuy = document.getElementById("btnBuy");

    btnProcessor.addEventListener("click", () => categoryProd("prossesor") );
    btnMotherB.addEventListener("click", () => categoryProd("motherboard") );
    btnRams.addEventListener("click", () => categoryProd("RAM") );
    btnBuy.addEventListener("click", () => modPay())
    
}
//Funcion carrito
//Funcion principal, donde se consulta donde va a ingresar el usuario para su compra
function main(){
    /*Verificamos al cargar la pagina si en el LocalStorage
     hay elementos en el carrito para poder agregarlos y que no se pierdan*/
    localStorage.getItem("carrito") && saveProduct.push((JSON.parse(localStorage.getItem("carrito"))));
    //para recorrer array dentro de array del local
    saveProduct.forEach(element => element.forEach(id => cart.push(id)))
    

    mains.innerHTML = `<div><h1 style="text-align:center"> BIENVENIDOS AL COTIZADOR AUTOMATICO DE PC </h1><div><br><br>
                       <div><h2 style="text-align:center"> Seleccion una de las siguientes opciones por favor</h2></div>
                       <div><button id="btnManual"> Arma tu PC </button>
                            <button id="btnAuto"> Cotizador automatico</button>
                            <button id="btnCart"> Carrito   </button>`
    
    const btnManual = document.getElementById("btnManual");
    const btnAuto = document.getElementById("btnAuto");
    const btnCart = document.getElementById("btnCart")

    btnAuto.addEventListener("click", () => cot())
    btnManual.addEventListener("click", () => par())
    btnCart.addEventListener("click", () => cartView())

}

//Funcion para mostrar los productos comprados por medio de HTML al final del proceso//

/* function buyProducts(){

    mains.innerHTML = `<h2 style="text-align:center"> Usted acaba de realizar la compra de los siguientes productos: </h2>`;
    
    for(let cartProducts of cart){

        const divCart = document.createElement("div");

        divCart.innerHTML = `<h4 style="text-align:center"> Producto: $${cartProducts.name} </h4>
                            <p style="text-align:center"> Precio: $${cartProducts.price} </p>  `
        
        document.getElementById("main").append(divCart)
        }
    
    if (priceCredit > priceProduct()){
        mains.insertAdjacentHTML('beforeend', `<h3 style="text-align:center"> El costo total es de $${priceCredit} </h3>`);
    }

    else{
        mains.insertAdjacentHTML('beforeend', `<h3 style="text-align:center"> El costo total es de $${priceProduct()} </h3>`);
    }
        
} */


//Aplicamos la funcion main(), que junta el proceso de todas las demas funciones
main();

//Aplicamos la funcion soldPoructs para utilizar el medotod soldOut() y que los productos vendidos pasen a True (proximamente con resta de stocks)
/* soldProduct(); */

//Funcion para mostrar los productos finales del carrito comprados//
/* buyProducts() */