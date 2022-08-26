import { allProducts } from "../js/miarchivo.js"

//Función que verifica que esten cargados todos los productos
export const verifiProducts = async () =>{
    await fetch("JSON/products.json")
    .then( response => response.json())
    .then( data => {data.forEach( product => { allProducts.push(product) })
})
}