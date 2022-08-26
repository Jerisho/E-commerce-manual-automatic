
import {mains, containterTotal, saveProduct, cart} from "../miarchivo.js"
import { functionLocal,empty } from "../functionsRecycle.js"
import { par } from "../functionPar.js";
import { modPay } from "../ModsPay/modpay.js";
//Funcion para mostrar el carrito//
export const cartView = () =>{
    containterTotal.classList.add("mainCenter")
    if(saveProduct == "" && cart == ""){
        mains.innerHTML = ` <div id="cartEmpty">
                                <h1 class="titleStandard">Tiene su carrito vacio</h1>
                                <i class="bi bi-cart-x"></i>
                            <div>
                            `
        const cartEmpty = document.getElementById("cartEmpty");
        cartEmpty.classList.add("cartEmptyClass")
        cartEmpty.classList.add("divShadowBorder")
        cartEmpty.classList.add("divColumnsContainer")
    }
    else{
        tableCart()
    }
}
//Funcion que es usada para ordenar el carrito, por medio de una tabla y mostrarlo
//Tambien se utiliza para borrar objetos del carrito
export const tableCart =  () => {

    mains.innerHTML = ` <div id="cartUp">
                            <h1 class="titleStandard">Su carrito</h1>
                            <table id="productsCart">
                                <trhead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </trhead>
                            </table>
                            <div id="containerBtn">
                            <button id="btnPay">Finalizar Compra</button>
                            <button id="btnBuy">Seguir comprando</button>
                            <button id="btnEmpty"> Vaciar Carrito </button>
                            </div>
                        </div>
                        `
        let cartUp = document.getElementById("cartUp");
        let containerBtn = document.getElementById("containerBtn")
        let btnPay = document.getElementById("btnPay");
        let btnBuy = document.getElementById("btnBuy");
        let btnEmpty = document.getElementById("btnEmpty");
        
        cartUp.classList.add("cartUpClass");
        cartUp.classList.add("divShadowBorder");
        containerBtn.classList.add("containerBtnClass")
        btnBuy.classList.add("btnRecurse");
        btnEmpty.classList.add("btnRecurse")
        btnPay.classList.add("btnRecurse")


        btnBuy.addEventListener("click", () => par())
        btnPay.addEventListener("click", () => modPay())
        btnEmpty.addEventListener("click", () => cartEmpty())
        

        let productsCart = document.getElementById("productsCart");
        let eliminate = 1;
        productsCart.classList.add("viewProductsCart");
        cart.forEach((element, i=index) => {
            
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
            let td = document.createElement("td")
            let button = document.createElement("button");
            button.innerHTML = `<i class="bi bi-x"></button></i>`
            button.classList.add("btnPutOff")
            button.addEventListener("click", () => {
                Swal.fire({
                    title: 'Eliminando producto del carrito?',
                    text: "Esta seguro que desea eliminar este producto?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Eliminar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        cart.splice(i, eliminate);
                
                        saveProduct.forEach(element => {
                            element.splice(i, eliminate);
                        })
                
                    localStorage.removeItem("carrito");
                    functionLocal("carrito", JSON.stringify(cart))
                    quantityCart(cart)

                cartView()   
                      Swal.fire(
                        'Producto eliminado del carrito!',
                        'Se elimino el producto con exito!',
                        'success'
                      )
                    }
                  })
            })
            td.append(button)
            tr.append(td);
            tbody.append(tr);
            productsCart.append(tbody);
        });
}

//Contador de items en el carrito//
export const quantityCart = (cart) =>{
    let quantityProducts = 0;
    let divQuantity = document.getElementById("divQuantity");
    //Verificamos si localStorage tiene algo amacenado, para poder pasar la longitud del carrito//
    localStorage.getItem("carrito") ? quantityProducts = cart.length : false;
    //Comprobamos que si QuantityProducts, es mayor a 0 vamos a llamar al ID del div
    //En el mismo div se va a almacenar el contador de productos en el carrito
    if(quantityProducts > 0){
        divQuantity.innerHTML =  `<p>${quantityProducts}</p>`
        divQuantity.classList.add("quantityProduct");
    }
    else{
        divQuantity.innerHTML = ``
        divQuantity.classList.remove("quantityProduct");
    }

}
//Funcino para vaciar carrito
const cartEmpty = () =>{
    Swal.fire({
        title: '¿Estas seguro que quieres vaciar el carrito?',
        text: "Usted esta por vaciar todo su carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar carrito',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("carrito")
          empty(cart);
          empty(saveProduct);
          
        mains.innerHTML = `<div id="cartEmpty">
                            <h1 class="titleStandard">Tiene su carrito vacio</h1>
                            <i class="bi bi-cart-x"></i>
                            <div>`

        const cartEmpty = document.getElementById("cartEmpty");
        cartEmpty.classList.add("cartEmptyClass")
        cartEmpty.classList.add("divShadowBorder")
        cartEmpty.classList.add("divColumnsContainer")
        quantityCart(cart);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su carrito se vació con exito!',
            showConfirmButton: false,
            timer: 1500
            })
        }
      })
}
