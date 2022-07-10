//Proyecto = Crear un e-commerce de Gamer//
//Definimos las variables//
let welcome = alert(`Cotizador de Computadoras`);
let optionMod = "";
let priceCot = 0;
let optionPar = "";
let couts = "";

//Definimos el arrays productos//
const allProducts = [];

//Array de carrito//
const cart = [];

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

//Definimos funciones//

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

//FUNCION PAGOS//

function payCredit(){
    let pricePar = priceProduct();
    do{
        couts = validate(`Ingrese como desea abonar el total: \n 1- 1 Cuota de $${pricePar} - Mismo precio que en efectivo \n 2- 3 Cuotas de $${(Math.round(pricePar + (pricePar * 0.05)) / 3)} - 5% de recargo \n 3- 6 Cuotas de $${Math.round((pricePar + (pricePar * 0.15)) / 6)} con el 15% de recargo \n 4- 12 cuotas de $${(Math.round((pricePar + (pricePar * 0.25)) / 12))} con el 25% de recargo` )
    }while(!((couts == "1") || (couts == "2") || (couts == "3") || (couts == "4")));

    switch(couts){
        case "1":
            alert(`El total a abonar es de $${pricePar}`)
            alert("Su pago fue efectuado con exito!")
            break
        case "2":
            alert(`El total a abonar es de $${Math.round(pricePar + (pricePar * 0.05))} en 3 cuotas de $${Math.round((pricePar + (pricePar * 0.05)) / 3)}`)
            alert("Su pago fue efectuado con exito!")
            break
        case "3":
            alert(`El total a abonar es de $${Math.round(pricePar + (pricePar * 0.15))} en 6 cuotas de $${Math.round((pricePar + (pricePar * 0.15)) / 6)}`)
            alert("Su pago fue efectuado con exito!")
            break
        case "4":
            alert(`El total a abonar es de $${Math.round(pricePar + (pricePar * 0.25))} en 12 cuotas de $${Math.round((pricePar + (pricePar * 0.25)) / 12)}`)
            alert("Su pago fue efectuado con exito!")
            break
        default:
            break
    
    }
}

//Funcion pago en efectivo

function payCash(){
    let pricePar = priceProduct()
    alert(`Usted elegio abonar en efectivo/debito, el total a abonar es de $${pricePar}`)
    alert(`Gracias por su compra!`) 
}

//Funcion donde se mostraran los medios de pagos;

function modPay(){
    alert(`El precio total a abonar es de $${priceProduct()}`);
    let modePay;
    do{
        modePay = validate("Ingrese por favor como desea abonar \n 1- Efectivo/Debito \n 2- Tarjeta de Credito ")
    }while(!((modePay == "1") || (modePay == "2")))

    switch(modePay){
        case "1":
            payCash()
            break;
        case "2":
            payCredit()
            break;
        default:
            break;
    }
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



//Funcion si desea seguir comprando o desea abonar//

function nextProd(){
    let optionNext;
    do{
        optionNext = validate("Si desea seguir comprando ingrese 'PAR', si desea finalizar la compra ingrese 'FIN'")
    }while(!((optionNext.toLowerCase() == "par") || (optionNext.toLowerCase() == "fin")))
    
    if (optionNext.toLowerCase() == "par"){
        par()
    }
    
    else if(optionNext.toLowerCase() == "fin"){
        modPay()
    }
}

//Funcion principal donde se va a evaluar si se elige la cotización automatica o de manera particular los componentes//

//Cot va a ser para el final del proyecto//
function cot(){
    alert("Ups! Algo ah salido mal, estamos trabajando en esto! Sera redirigido a la opción 'PAR' ");
    /* priceCot = parseFloat(prompt(`Ingrese el valor para la cotización: `)) */
    par()
}

//Par de manera particular.
function par(){
    let optionPar;
    let optionProd;
    let optionMsg;
    let idProd;
    do{
    optionPar = validate("Elija una de las siguientes opciones: \n 1- Proocesador \n 2- Placa Madre \n 3- RAM ");
    }while(!((optionPar == "1") || (optionPar == "2") || (optionPar == "3")));

    if (optionPar == "1"){
        optionMsg = "Ingrese un procesador que quiera elegir: \n 1- Procesador Amd Ryzen 5 3600 4.2ghz Turbo Am4 Wraith Stealth - $32.499 \n 2- Procesador Intel Core i5-10400F BX8070110400F - $30.000 \n 3- Procesador gamer AMD Ryzen 5 5600X 100-100000065BOX - $49.500";
        idProd = 0;
    }
    else if (optionPar == "2"){
        optionMsg = "Ingrese un procesador que quiera elegir: \n 1- Mother ASUS PRIME A320M-K Ryzen 2da Gen Ready M-ATX - $7,500.00 \n 2- Mother Gigabyte AB350M V2.0 DS3H AM4 - $8.570 \n 3- Mother Asrock B450 Steel Legend AM4 RGB Dual M.2 Dual USB 3.1 - $21.500";
        idProd = 3;
    }
    else if (optionPar == "3"){
        optionMsg = "Ingrese un procesador que quiera elegir: \n 1- Memoria RAM Fury Beast DDR4 gamer color negro 8GB 1 Kingston KF426C16BB/8 - $5864 \n 2-Memoria RAM Vengeance LPX gamer color negro 16GB 2 Corsair CMK16GX4M2B3200C16 - $15366 \n 3- Memoria RAM Fury Beast DDR4 RGB gamer color negro 16GB 1 Kingston KF432C16BBA - $14.999";
        idProd = 6;
    }
    do{
        optionSelect = parseInt(validate(optionMsg));
    }while(!((optionSelect == 1) || (optionSelect == 2) || (optionSelect == 3)));

    //Sumamos a la opcion elegida el numero de idProd, para poder pasar por la funcion de identificador de productos el ID correspondiente
    idProd += optionSelect;

    optionProd = indGeneratorProduct(idProd)

    //Pusheamos la opcion elegida al carrito
    cart.push(optionProd);

    //Retomamos a la funcion que consulta si vamos a seguir comprando o no 
    nextProd()
}

//Funcion principal, donde se consulta donde va a ingresar el usuario para su compra
function main(){
    console.log(allProducts);

    optionMod = prompt(`Por favor ingrese "COT" si desea el cotizador automatico, de o contrario ingrese "PAR"`);

    while ((optionMod == null) || (optionMod == "") || (!((optionMod.toLowerCase() == "cot")|| (optionMod.toLowerCase() == "par")))){
        optionMod = prompt(`Por favor ingrese "COT" si desea el cotizador automatico, de o contrario ingrese "PAR"`);
    }

    if (optionMod.toLowerCase() == "cot"){
        alert(`Usted esta eligiendo el cotizador automatico`);
        cot()
    } 
    
    else if (optionMod.toLowerCase() == "par"){
        alert(`Usted esta eligiendo hacer su PC de forma particular`);
        par();
    }
}


//Aplicamos la funcion main(), que junta el proceso de todas las demas funciones
main();

//Mostramos el carrito por consola, para ver todo lo que se adquirio
console.log(cart);

//Aplicamos la funcion soldPoructs para utilizar el medotod soldOut() y que los productos vendidos pasen a True (proximamente con resta de stocks)
soldProduct();

//Mostramos el array AllProducts, para ver que sold pasa a ser true en los productos vendidos.
console.log(allProducts);