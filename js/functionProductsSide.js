import {mains, btnListProducts, containterTotal} from "./miarchivo.js"
import {categoryProd} from "./CategoryProductsFilter.js"

const divProducts = document.getElementById("div-products");
//Funccion para poder usar el menu desplegable y se busque la categoría deseada
export const listProducts = () => {
    const divContainerBtnList = document.getElementById("container-list");
    const btnExit = document.createElement("div");
    divContainerBtnList.classList.remove("divListProducts");
    divContainerBtnList.classList.add("divListProductsNotMargin");
    btnExit.classList.add("btnExit")
    divContainerBtnList.append(btnExit)
    btnExit.innerHTML = `
                        <i class="fa-regular fa-circle-xmark"></i>
                        `
    divProducts.innerHTML = `
                            <div>
                            <div></div>
                            <ul id="ulProducts">
                            <button class="btnProcessorSide"><i class="bi bi-cpu"></i> Procesadores</button>
                            <button class="btnMotherBSide"><i class="bi bi-motherboard"></i> Placas Madre</button>
                            <button class="btnRamsSide"><i class="bi bi-memory"></i> Rams</button>
                            <button class="btnHardDiskSide"><i class="bi bi-device-hdd"></i> HDD - Discos Duros</button>
                            <button class="btnSsdDiskSide"><i class="bi bi-device-ssd"></i> SDD - Discos Solidos</button>
                            <button class="btnGraphicCardGSide"><i class="bi bi-gpu-card"></i> Placas de Video Geforce</button>
                            <button class="btnGraphicCardASide"><i class="bi bi-gpu-card"></i> Placas de video AMD</button>
                            <button class="btnSPowerSide"<i class="bi bi-plug"></i> Fuentes de Poder</button>
                            <button class="btnTowerSide"><i class="bi bi-pc"></i> Gabinetes</button>
                            </ul>
                            <div class="divInivisible"></div>
                            </div>`;
    
    const ulProducts = document.getElementById("ulProducts");
    const btnProcessor = document.querySelector(".btnProcessorSide");
    const btnMotherB = document.querySelector (".btnMotherBSide");
    const btnRams = document.querySelector(".btnRamsSide");
    const btnHardDisk = document.querySelector(".btnHardDiskSide");
    const btnSsdDisk = document.querySelector(".btnSsdDiskSide");
    const btnGraphicCardG = document.querySelector(".btnGraphicCardGSide");
    const btnGraphicCardA = document.querySelector(".btnGraphicCardASide");
    const btnSPower = document.querySelector(".btnSPowerSide");
    const btnTower = document.querySelector(".btnTowerSide");
    const btnInvisible = document.querySelector(".divInivisible");

    ulProducts.classList.add("ulProductsClass");
    btnListProducts.classList.remove("btnRecurseList");
    btnListProducts.classList.add("btnProductsActive"); 

    btnProcessor.addEventListener("click", () => categoryProdSide("prossesor") );
    btnMotherB.addEventListener("click", () => categoryProdSide("motherboard") );
    btnRams.addEventListener("click", () => categoryProdSide("RAM") );
    btnHardDisk.addEventListener("click", () => categoryProdSide("hardDisk") );
    btnSsdDisk.addEventListener("click", () => categoryProdSide("ssdDisk") );
    btnGraphicCardG.addEventListener("click", () => categoryProdSide("graphicCardG") );
    btnGraphicCardA.addEventListener("click", () => categoryProdSide("graphicCardA") );
    btnSPower.addEventListener("click", () => categoryProdSide("sPower") );
    btnTower.addEventListener("click", () => categoryProdSide("tower") );
    btnExit.addEventListener("click", () =>{
        btnExit.remove();
        divContainerBtnList.classList.add("divListProducts");
        divContainerBtnList.classList.remove("divListProductsNotMargin");
        divProducts.innerHTML= ``;
        btnListProducts.classList.add("btnRecurseList");
        btnListProducts.classList.remove("btnProductsActive"); 
    })
    btnInvisible.addEventListener("click", () => {
        btnExit.remove();
        divContainerBtnList.classList.add("divListProducts");
        divContainerBtnList.classList.remove("divListProductsNotMargin");
        divProducts.innerHTML= ``;
        btnListProducts.classList.add("btnRecurseList");
        btnListProducts.classList.remove("btnProductsActive"); 
    })
    
}

//Funcion principal del side bar donde se musetran los productos
const categoryProdSide = (category) =>{
    mains.innerHTML = ``
    categoryProd(category);
    containterTotal.classList.add("mainCenter")
}
