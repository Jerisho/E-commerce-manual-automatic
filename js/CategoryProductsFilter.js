import {mains, allProducts, cart} from "./miarchivo.js"
import { functionLocal, notify } from "./functionsRecycle.js";
import { quantityCart } from "./CartFunctions/functionCart.js";

export const divProductsBox = document.createElement("div");

//Funcion para filtras los productos por categoría
export const categoryProd = (category) => {
    divProductsBox.classList.add("contProducts")
    mains.append(divProductsBox)

    const contProducts = document.querySelector(".contProducts");
    let divContainerTitle = document.createElement("div");
    let divContainerBoxes = document.createElement("div");
    
    contProducts.innerHTML = "";

    contProducts.appendChild(divContainerTitle);
    divContainerTitle.classList.add("titleProducts")
    divContainerTitle.classList.add("divShadowBorder")

    contProducts.appendChild(divContainerBoxes);
    divContainerBoxes.classList.add("divBoxes")
    divContainerBoxes.classList.add("divShadowBorder")

    let filter = [];
    filter = allProducts.filter( element => element.type === category);
    
    let a = document.createElement("h1");
    a.innerText = `${filter[0].title}`
    divContainerTitle.append(a)


    for(let product of filter){
        let div = document.createElement("div");
        //CREAR EL DIV DE LA CAJA CON EL PRODUCTO Y EL BOTON AGREGAR AL CARRITO;
        divContainerBoxes.append(div)
        div.classList.add("productBox")
        div.innerHTML = `
                        <div class="productView">
                            <img src="${product.img}" alt="Product IMG"></img>
                            <h6>${product.name}</h6>
                            <p>Precio: $${product.price}</p><br>
                        </div>
                        `;
        
        let button = document.createElement("button"); 
        button.className = "btnAddCart";
        button.textContent = "Agregar al carrin";
        button.classList.add("btnAddCart")
        
        button.addEventListener("click", () => cart.push(product));
        button.addEventListener("click", () => functionLocal("carrito", JSON.stringify(cart)));
        button.addEventListener("click", () => notify());
        button.addEventListener("click", () => quantityCart(cart));       
        div.appendChild(button);
    };
}