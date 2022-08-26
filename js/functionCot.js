import { mains } from "./miarchivo.js"
import { redir } from "./functionsRecycle.js"
//Cot va a ser para el final del proyecto//
export const cot = () =>{
    Swal.fire(
        'Ups, algo salio mal, estamos trabajando en ello',
        'Volviendo al menu anterior...',
        'error'
      )
    
      mains.innerHTML =`<h1>Usted esta eligiendo el cotizador automatico</h1>
    <h2> Ups, algo salio mal, sera redirigido a Armar su PC</h2>`

    redir("index.html")
}