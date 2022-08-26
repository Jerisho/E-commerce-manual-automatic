import {cartView, quantityCart} from "./CartFunctions/functionCart.js";
import {listProducts} from "./functionProductsSide.js";
import {search} from "./barSearch.js";
import {par} from "./functionPar.js";
import {userFunction, myAccountInfo} from "./Users/loginUsers.js";
import {verifiProducts} from "../JSON/callProductsJSON.js";
import {cot} from "./functionCot.js";

//Proyecto = Crear un e-commerce de Gamer//
export const mains = document.getElementById("main");
export const btnListProducts = document.getElementById("listProducts");
export const containterTotal = document.getElementById("container-totally");
export const searchInput = document.getElementById("searchInput");
export const allProducts = [];
export const userLogin = [];
export let allUsers = [];;
export const cart = [];
export let saveProduct = [];
export let saveUsers = [];

const main = () =>{
    verifiProducts() ;
    
    /*Verificamos al cargar la pagina si en el LocalStorage
     hay elementos en el carrito para poder agregarlos y que no se pierdan*/
    localStorage.getItem("carrito") && saveProduct.push((JSON.parse(localStorage.getItem("carrito"))));
    //Lo mismo del carrito pero para almacenar los usuarios ya creados//
    localStorage.getItem("users") && saveUsers.push((JSON.parse(localStorage.getItem("users"))));
    //Lo mismo del carrito pero con el usuario ya ingresado anteriormente, para que no se pierda la sesión//
    localStorage.getItem("userLogin") && userLogin.push((JSON.parse(localStorage.getItem("userLogin"))));
    //para recorrer array dentro de array del local
    saveProduct.forEach(element => element.forEach(id => cart.push(id)))
    saveUsers.forEach(element => element.forEach(user => allUsers.push(user)))
    
    mains.innerHTML = ``

    const divContainerBtnList = document.getElementById("container-list");
    const btnManual = document.getElementById("btnManual");
    const btnAuto = document.getElementById("btnAuto");
    const btnCart = document.getElementById("btnCart");
    const myAccount = document.getElementById("myAccount")

    divContainerBtnList.classList.add("divListProducts");
    myAccount.classList.add("myAccountClass")
    btnAuto.classList.add("btnRecurse");
    btnManual.classList.add("btnRecurse");
    btnListProducts.classList.add("btnRecurseList");

    btnAuto.addEventListener("click", () => par());
    btnManual.addEventListener("click", () => cot());
    btnListProducts.addEventListener("click", () => listProducts());
    btnCart.addEventListener("click", () => cartView());
    searchInput.addEventListener("keypress", (e) => search(e))
    quantityCart(cart);

    if(userLogin[0] === undefined){
        myAccount.addEventListener("click", () => userFunction())
        userFunction()
    }
    else{
        myAccount.addEventListener("click", () => myAccountInfo())
        myAccountInfo()
    }
}

//Aplicamos la funcion main(), que junta el proceso de todas las demas funciones
main();
