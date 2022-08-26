import {userLogin, mains, containterTotal, allUsers} from "../miarchivo.js"
import {createUserInterface} from "./createUsers.js"
import {empty, functionLocal} from "../functionsRecycle.js"
//Funcion principal, para iniciar sesión//
export const userFunction = () =>{
    mains.innerHTML =  `<div id="containerUserUp">
                        <h1 class="titleStandard">Inicio de Sesion</h1>
                        <form id="formUser">
                                <div class="divInputsGoSesion"><p>Usuario:</p> <input type="text" id="user"></input></div>
                                <div class="divInputsGoSesion"><p>Contraseña:</p> <input type="password" id="password"></input></div>
                                <div class="divBtnGoSesion"><button id="btnGoSesion">Iniciar Sesion</button></div>
                        </form>
                        <button id="btnCreateUser">Crear usuario</button>`

    const containerUserUp = document.getElementById("containerUserUp");
    const formUser = document.getElementById("formUser")
    const user = document.getElementById("user");
    const password = document.getElementById("password");
    const btnGoSesion = document.getElementById("btnGoSesion");
    const btnCreateUser = document.getElementById("btnCreateUser");

    containterTotal.classList.add("mainCenter")
    containerUserUp.classList.add("divShadowBorder")
    containerUserUp.classList.add("containerUserUpClass")
    containerUserUp.classList.add("divColumnsContainer")
    formUser.classList.add("formUserClass")
    btnGoSesion.classList.add("btnRecurse")
    btnCreateUser.classList.add("btnRecurse")
    btnCreateUser.classList.add("btnCreateUserClass")

    btnGoSesion.addEventListener("click", (e) => verifiUsers(e, user.value, password.value))
    btnCreateUser.addEventListener("click", (e) => createUserInterface(e))
}
//Funcion para er la información de la cuenta del usuario!
export const myAccountInfo = () => {
    let userLogUp = userLogin[0];
    mains.innerHTML =   `
                        <div id="containerAccount" class="divShadowBorder">
                            <h1 class="titleStandard">Mi cuenta</h1>
                            <div class="divContainerInfo">
                                <div class="divInforContainer"><p><b>Usuario:</b> ${userLogUp?.user}</p></div>
                                <div class="divInforContainer"><p><b>Email:</b> ${userLogUp?.email}</p></div>
                                <div class="divInforContainer"><p><b>Nombre:</b> ${userLogUp?.name}</p></div>
                                <div class="divInforContainer"><p><b>Telefono:</b> ${userLogUp?.telephone}</p></div>
                                <div class="divInforContainer"><p><b>Dirección:</b> ${userLogUp?.direction}</p></div>
                            </div>
                            <button id="btnEndSession"> Cerrar Sesion </button>
                        </div>
                        `
    const containerAccount = document.getElementById("containerAccount");
    const btnEndSession = document.getElementById("btnEndSession");
    
    containterTotal.classList.add("mainCenter");
    containerAccount.classList.add("containerAccountClass");
    btnEndSession.classList.add("btnRecurse")

    btnEndSession.addEventListener("click", (e) => endSession(e))
}
//Funcion que termina la sesion del usuario
const endSession = (e) => {
    e.preventDefault()
    Swal.fire({
        title: 'Esta seguro que desea cerrar sesión??',
        text: "Usted esta a punto de cerrar sesión, los objetos de su carrito quedaran almacenados de todas formas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cerrar Sesion'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Se ah cerrado sesión correctamente!',
            'Sesión finalizada',
            'success'
          )
          localStorage.removeItem('userLogin');
          empty(userLogin)
          myAccount.addEventListener("click", () => userFunction())
          userFunction();
          
        }
      })

}
//Function para verificar los usuarios
const verifiUsers = (e, userValue, passwordValue) =>{
  e.preventDefault();
  if( userValue === "" || passwordValue === ""){
      Swal.fire({
          icon: 'error',
          title: 'Usuario o clave incorrecta!',
          text: 'Ingrese un usuario y contraseña correctos porfavor!',
          confirmButtonText: 'Aceptar'
        })
  }
  else{
      let userVerifi = allUsers.find(element =>  element.user === userValue)

      if(userVerifi == undefined){
          Swal.fire({
              icon: 'error',
              title: 'Usuario o clave incorrecta!',
              text: 'Ingrese un usuario y contraseña correctos porfavor!',
              confirmButtonText: 'Aceptar'
          })
      }
      else{
          let user = userVerifi.user;
          let password = userVerifi.password;
          
          if(user.toLowerCase() === userValue.toLowerCase() && password === passwordValue){
              mains.innerHTML = ``;
              let objetUser = allUsers.find(element => element.user === user)
              functionLocal("userLogin", JSON.stringify(objetUser))
              localStorage.getItem("userLogin") && userLogin.push((JSON.parse(localStorage.getItem("userLogin"))));
              
              myAccount.addEventListener("click", () => myAccountInfo())
              myAccountInfo();
          }
          else{
              Swal.fire({
                  icon: 'error',
                  title: 'Usuario o clave incorrecta!',
                  text: 'Ingrese un usuario y contraseña correctos porfavor!',
                  confirmButtonText: 'Aceptar'
              })
          }
      }
  }
}
