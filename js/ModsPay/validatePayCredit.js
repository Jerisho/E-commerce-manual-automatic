//Función para confirmar el pago con tarjeta de credito//
import { mains, saveProduct, cart } from "../miarchivo.js";
import { empty } from "../functionsRecycle.js";
import { quantityCart } from "../CartFunctions/functionCart.js";

export const payConfirm = () => {
    mains.innerHTML = `<div id="containerConfirmPay">
                            <h1 class="titleStandard">Ingrese los datos del titular de la tarjeta</h1>
                                <form id="formConfirmPay">
                                    <div><p>Nombre y apellido:</p> <input type="text" id="inputName"></input></div>
                                    <div><p>Domicilio particular :</p><input type="text" id="inputDate"></input></div>
                                    <div><p>Telefono :</p><input type="text" id="inputTel"></input></div>
                                    <div><p>Mail :</p><input type="email" id="inputMail"></input></div>
                                    <div><p>Numero de su tarjeta (13) : </p> <input type="text" id="inputNumberCard"></input></div>
                                    <div><p>Codigo de seguridad (3) : </p> <input type="text" id="inputNumberCode"></input></div>
                                    <div><button id="btnPress">Pagar</button></div>
                                </form>
                        </div>
                        `
    const containerConfirmPay = document.getElementById("containerConfirmPay");
    const btnPress = document.getElementById("btnPress");
    const formConfirmPay = document.getElementById("formConfirmPay");
    const inputName = document.getElementById("inputName")
    const inputDate = document.getElementById("inputDate")
    const inputTel = document.getElementById("inputTel")
    const inputMail = document.getElementById("inputMail")
    const inputNumberCard = document.getElementById("inputNumberCard")
    const inputNumberCode = document.getElementById("inputNumberCode")



    containerConfirmPay.classList.add("divShadowBorder");
    containerConfirmPay.classList.add("containerConfirmPayClass");
    formConfirmPay.classList.add("formConfirmPayClass");
    btnPress.classList.add("btnRecurse")

    btnPress.addEventListener("click", (e) => confirmDateCard(e, inputName, inputDate, inputTel, inputMail, inputNumberCard, inputNumberCode))
}
//Funcion para confirmar los datos de la tarjeta//
const confirmDateCard = (e, inputName, inputDate, inputTel, inputMail, inputNumberCard, inputNumberCode) => {
    {
        e.preventDefault()  
        if(inputName.value === ""){ 
            alertInput("Ingrese un usuario valido por favor!")
            }
        else if(inputDate.value === ""){
            alertInput("Ingrese un domicilio valido por favor!")
        }
        else if(inputTel.value === ""){
            alertInput("Ingrese un telefono valido por favor!")
        }
        else if(inputMail.value === "" || !inputMail.value.includes("@", 0) || !inputMail.value.includes(".", 0)){
            alertInput("Ingrese un mail valido por favor!")
        }
        else if (!(inputNumberCard.value.length === 12) || isNaN(inputNumberCard.value)){
            alertInput("Ingrese un numero de tarjeta valido por favor!")
        }
        else if(!(inputNumberCode.value.length === 3) || isNaN(inputNumberCode.value)){
            alertInput("Ingrese un codigo de seguridad de su tarjeta valido por favor!")
        }
        else{
            Swal.fire({
                title: 'Desea confirmar su pago ?',
                text: "Presione CONFIRMAR",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed){
                Swal.fire(
                    'Se confirmo el pago correctamente!',
                    'Gracias por su compra.',
                    'success'
                )
                mains.innerHTML =   `<div id="endBuyCredit">
                                        <h1 class="titleStandard">Su pago se realizo con exito</h1>
                                        <h2>Gracias por su compra!</h2>
                                    </div>`
                let endBuyCredit = document.getElementById("endBuyCredit");
                endBuyCredit.classList.add("divShadowBorder");
                endBuyCredit.classList.add("divEndBuyCreditClass")
                localStorage.removeItem("carrito")
                empty(cart)
                empty(saveProduct)
                quantityCart()   
                //Para enviar form con enter "e.preventDefault;"//
                }
            })
        }
    }
}