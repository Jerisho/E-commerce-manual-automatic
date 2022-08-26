import {mains, containterTotal} from "./miarchivo.js"
import {categoryProd} from "./CategoryProductsFilter.js"
import { modPay } from "./ModsPay/modpay.js";
//Funciones para la compra particular
export const par = () => {
    mains.innerHTML =`
                      <div id="containerTypeProducts">
                            <h2 id="titleOpcion"> Elija una de las siguientes opciones: </h2>
                            <div id="typeProducts">
                                <button class='btnProcessor btnCategory'><i class="bi bi-cpu"></i><br>PROCESADORES</button>  
                                <button class="btnMotherB btnCategory"><i class="bi bi-motherboard"></i><br>PLACAS MADRES</button>
                                <button class="btnRams btnCategory"><i class="bi bi-memory"></i><br>RAMS</button>
                                <button class="btnHardDisk btnCategory"><i class="bi bi-device-hdd"></i><br>DISCOS DUROS</button>
                                <button class="btnSsdDisk btnCategory"><i class="bi bi-device-ssd"></i></i><br>DISCOS SSD</button>
                                <button class="btnGraphicCardG btnCategory"><i class="bi bi-gpu-card"></i><br>GEFORCE</button>
                                <button class="btnGraphicCardA btnCategory"><i class="bi bi-gpu-card"></i><br>RADEON AMD</button>
                                <button class="btnSPower btnCategory"><i class="bi bi-plug"></i><br>FUENTES DE PODER</button>
                                <button class="btnTower btnCategory"><i class="bi bi-pc"></i><br>GABINETE</button>
                            </div>
                                <button class="btnBuy btnRecurse">Finalizar compra</button>
                      </div>
                     `;
    const typeProducts = document.getElementById("typeProducts");
    const containerTypeProducts = document.getElementById("containerTypeProducts");
    const btnProcessor = document.querySelector(".btnProcessor");
    const btnMotherB = document.querySelector (".btnMotherB");
    const btnRams = document.querySelector(".btnRams");
    const btnHardDisk = document.querySelector(".btnHardDisk");
    const btnSsdDisk = document.querySelector(".btnSsdDisk");
    const btnGraphicCardG = document.querySelector(".btnGraphicCardG");
    const btnGraphicCardA = document.querySelector(".btnGraphicCardA");
    const btnSPower = document.querySelector(".btnSPower");
    const btnTower = document.querySelector(".btnTower");
    const btnBuy = document.querySelector(".btnBuy");
    
    containterTotal.classList.add("mainCenter")
    containerTypeProducts.classList.add("containerTypeProductsClass")
    containerTypeProducts.classList.add("divShadowBorder") 
    typeProducts.classList.add("typeProducts");
    mains.classList.add("mainRow")

    btnProcessor.addEventListener("click", () => categoryProd("prossesor") );
    btnMotherB.addEventListener("click", () => categoryProd("motherboard") );
    btnRams.addEventListener("click", () => categoryProd("RAM") );
    btnHardDisk.addEventListener("click", () => categoryProd("hardDisk") );
    btnSsdDisk.addEventListener("click", () => categoryProd("ssdDisk") );
    btnGraphicCardG.addEventListener("click", () => categoryProd("graphicCardG") );
    btnGraphicCardA.addEventListener("click", () => categoryProd("graphicCardA") );
    btnSPower.addEventListener("click", () => categoryProd("sPower") );
    btnTower.addEventListener("click", () => categoryProd("tower") );
    btnBuy.addEventListener("click", () => modPay())

    categoryProd("prossesor")
}

