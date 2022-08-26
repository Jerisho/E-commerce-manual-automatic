import { userLogin, cart, saveProduct, containterTotal, mains} from "../miarchivo.js"
import { userFunction } from "../Users/loginUsers.js"
import { empty } from "../functionsRecycle.js"
import { quantityCart } from "../CartFunctions/functionCart.js"
import {payConfirm} from "./validatePayCredit.js"
//Funcion para elegir el metodo de pago//
export const modPay =() =>{
    if (userLogin[0]){
        cart.concat(saveProduct)
        if( cart == ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tiene productos en el carrito!',
            })
        }
        else{
            containterTotal.classList.add("mainCenter")
            mains.classList.remove("mainRow")
            mains.innerHTML = `<div id="containerModPay">
                                    <h1 class="titleStandard"> METODO DE PAGO</h1>
                                    <div id="containerModPayTitles">
                                        <h2>Total a abonar: $${priceProduct()}</h2>
                                    </div>
                                    <h3> Por favor seleccione un metodo de pago</h3>
                                        <div id="containerModPayBtn">
                                        <button id="btnCash">Efectivo/Debito</button>
                                        <button id="btnCard">Tarjeta de credito</button>
                                    </div> 
                                <div>
                                    <div id="carritoTitle">
                                    <h2>CARRITO</h2>
                                    </div>
                                    <table id="productsCart">
                                    <trhead>
                                        <tr>
                                        <th>Producto</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        </tr>
                                    </trhead>
                                </table>
                            </div>
                            </div>`

            let containerModPay = document.getElementById("containerModPay");
            let containerModPayTitles = document.getElementById("containerModPayTitles");
            let containerModPayBtn = document.getElementById("containerModPayBtn");
            let carritoTitle = document.getElementById("carritoTitle");
            let productsCart = document.getElementById("productsCart");

            containerModPay.classList.add("divShadowBorder");
            containerModPay.classList.add("containerModPayClass");
            containerModPayTitles.classList.add("containerModPayTitlesClass")
            containerModPayBtn.classList.add("containerModPayBtnClass")
            carritoTitle.classList.add("carritoTitleClass")
            productsCart.classList.add("viewProductsCart");
            cart.forEach((element) => {
                
                let tbody = document.createElement("tbody");    
                let tr = document.createElement("tr");
                
                tr.innerHTML =   `<td>
                                        <img src="${element.img}">
                                </td>
                                <td>
                                            <h3>${element.name}</h3>
                                    </td> 
                                        <td> 
                                            <p><b>${element.price}</b></p>
                                    </td> 
                                    `
                tbody.append(tr);
                productsCart.append(tbody);
            });

            const btnCash = document.getElementById("btnCash");
            const btnCard = document.getElementById("btnCard");

            btnCash.classList.add("btnRecurse")
            btnCard.classList.add("btnRecurse")

            btnCash.addEventListener("click", () => payCash() )
            btnCard.addEventListener("click", () => payCredit())
        }
    }
    else{
            Swal.fire({
                icon: 'error',
                title: 'Aún no ha iniciado sesion!',
                text: 'Por favor inicie sesion!',
                confirmButtonText: 'Aceptar'
              })
              setTimeout(function(){ 
                userFunction()
            }, 2000)
        }
}
//Funcion que va a devolver el precio total de lo que hay que abonar//
const priceProduct = () => {
    let totalPrice = 0;
    for(let indice of cart){
        totalPrice += indice.price;   
    }
    return totalPrice;
 }
//Funcion que crea las opciones dentro del metodo de pago "tarjeta de credito"
const payCredit = () => {
    let pricePar = priceProduct();
    mains.innerHTML = `<div id="divPayCredit">
                        <h1 class="titleStandard">Ingrese como desea abonar el total</h1><br>
                            <form>
                                <div class="containerInputs"><input type="radio" id="cuots1"name="cuots" value="1" checked><p> 1 Cuota de $${pricePar} - Mismo precio que en efectivo</p></input></div>
                                <div class="containerInputs"><input type="radio" id="cuots3"name="cuots" value="3"><p> 3 Cuotas de $${Math.round((pricePar + (pricePar * 0.05)) / 3)} - 5% de recargo</p></input></div>
                                <div class="containerInputs"><input type="radio" id="cuots6"name="cuots" value="6"><p> 6 Cuotas de $${Math.round((pricePar + (pricePar * 0.15)) / 6)} con el 15% de recargo</p></input></div>
                                <div class="containerInputs"><input type="radio" id="cuots12"name="cuots" value="12"><p> 12 cuotas de $${Math.round((pricePar + (pricePar * 0.25)) / 12)} con el 25% de recargo</p></input></div>
                                <div id="divAccCouts">
                                    <button id="accCouts">Aceptar</button>
                                </div>
                            </form>
                        </div>`
    
    const accCouts = document.getElementById("accCouts");
    const divPayCredit = document.getElementById("divPayCredit");
    const divAccCouts = document.getElementById("divAccCouts");

    divPayCredit.classList.add("divShadowBorder");
    divPayCredit.classList.add("divPayCreditClass");
    divAccCouts.classList.add("divAccCoutsClass");
    accCouts.classList.add("btnRecurse")

    //Evento creado para que se pueda tomar las cuotas elegidas!//
    accCouts.addEventListener("click", () => {  

                                            let cuots1 = document.getElementById("cuots1")
                                            let cuots3 = document.getElementById("cuots3")
                                            let cuots6 = document.getElementById("cuots6")
                                            let cuots12 = document.getElementById("cuots12")

                                            if (cuots1.checked == true){
                                                mains.innerHTML = ` <div class="divShadowBorder divGoToPay">
                                                                        <h1 class="titleStandard">El total a abonar es de $${pricePar}</h1>
                                                                        <button id="btnPay">Ir al pago</button>
                                                                    </div>`
                                                const btnPay = document.getElementById("btnPay");
                            
                                                btnPay.addEventListener("click", () => payConfirm())
                                                btnPay.classList.add("btnRecurse")
                                                btnPay.classList.add("btnGoToPay")
                                            }

                                            else if (cuots3.checked == true){
                                                mains.innerHTML = `<div class="divShadowBorder divGoToPay">
                                                                        <h1 class="titleStandard">El total a abonar es de $${Math.round(pricePar * 1.05)} en 3 cuotas de $${Math.round((pricePar + (pricePar * 0.05)) / 3)}</h1>
                                                                        <button id="btnPay">Ir al pago</button>
                                                                    </div>`
                                                                   const btnPay = document.getElementById("btnPay");
                                                
                                                                   btnPay.addEventListener("click", () => payConfirm())
                                                                   btnPay.classList.add("btnRecurse")
                                                                   btnPay.classList.add("btnGoToPay")
                                                                }

                                            else if (cuots6.checked == true){
                                                mains.innerHTML = ` <div class="divShadowBorder divGoToPay">
                                                                        <h1 class="titleStandard">El total a abonar es de $${Math.round(pricePar * 1.15)} en 6 cuotas de $${Math.round((pricePar + (pricePar * 0.15)) / 6)}</h1>
                                                                        <button id="btnPay">Ir al pago</button>
                                                                    </div>`
                                                                   const btnPay = document.getElementById("btnPay");
                                                
                                                                   btnPay.addEventListener("click", () => payConfirm())
                                                                   btnPay.classList.add("btnRecurse")
                                                                   btnPay.classList.add("btnGoToPay")
                                            }

                                            else if (cuots12.checked == true){
                                                mains.innerHTML = ` <div class="divShadowBorder divGoToPay">    
                                                                        <h1>El total a abonar es de $${Math.round(pricePar * 1.25)} en 12 cuotas de $${Math.round((pricePar + (pricePar * 0.25)) / 12)}</h1>
                                                                        <button id="btnPay">Ir al pago</button>
                                                                    </div>`
                                                                   const btnPay = document.getElementById("btnPay");
                                                
                                                                   btnPay.addEventListener("click", () => payConfirm())
                                                                   btnPay.classList.add("btnRecurse")
                                                                   btnPay.classList.add("btnGoToPay")
                                            }
    })
}

//Funcion pago en efectivo
const payCash = () => {

    let pricePar = priceProduct()
    mains.innerHTML = ` <div id="modCash">
                            <h1 class="titleStandard">Usted elegió abonar en efectivo/debito</h1>
                            <br>
                            <h2>El total a abonar es de $${pricePar}</h2>
                            <h3>Por favor acerquese a una sucursal para abonar</h3>
                            <br><br>
                        <div>`;
    let cash = document.getElementById("modCash");
    
    cash.classList.add("divShadowBorder")
    cash.classList.add("divCash")

    localStorage.removeItem("carrito")
    empty(cart)
    empty(saveProduct)
    quantityCart()
    Swal.fire(
        'Usted elegió abonar en efectivo',
        'Gracias por su compra!',
        'success'
      )
    
    setTimeout(function(){ 
        mains.innerHTML = `<div id="endBuy"><h1 class="titleStandard">¡Gracias por su compra!</h1></div>`;
        let endBuy = document.getElementById("endBuy");
        endBuy.classList.add("divShadowBorder");
        endBuy.classList.add("divEndBuy")
    }, 3000)
}
