import {mains, containterTotal, allProducts, cart, searchInput} from "./miarchivo.js"
import {divProductsBox} from "./CategoryProductsFilter.js"
import {functionLocal, notify} from "./functionsRecycle.js"
import { quantityCart } from "./CartFunctions/functionCart.js"
//Funcion para buscar en la barra de busqueda
export const search = (e) => {
    containterTotal.classList.add("mainCenter")
    if(e.key === "Enter" && searchInput.value !== ""){
        const searchValue = searchInput.value;

        mains.innerHTML = ``
    
        divProductsBox.classList.add("contProducts")
        mains.append(divProductsBox)
        const contProducts = document.querySelector(".contProducts");
        contProducts.innerHTML = "";

        let divContainerTitle = document.createElement("div");
        contProducts.appendChild(divContainerTitle);
        divContainerTitle.classList.add("titleProducts")
        divContainerTitle.classList.add("divShadowBorder")

        let divContainerBoxes = document.createElement("div");
        contProducts.appendChild(divContainerBoxes);
        divContainerBoxes.classList.add("divBoxes")
        divContainerBoxes.classList.add("divShadowBorder")
        //Funcion para buscar un valor por medio de un inputsearch//
        let filter = [];
        filter = allProducts.filter(element => element.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);

        let a = document.createElement("h1");
        a.innerText = `Productos encontrados con "${searchValue}"`
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
        }
    }
}
