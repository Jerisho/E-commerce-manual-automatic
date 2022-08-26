import {mains, allUsers} from "../miarchivo.js"
import {alertInput, functionLocal} from "../functionsRecycle.js"
import {userFunction} from "./loginUsers.js"
//Creamos la clases para los nuevos usuarios
class newUsers{
    constructor(user, password, email, name, direction, telephone){
        this.user = user;
        this.password = password;
        this.email = email;
        this.name = name,
        this.direction = direction,
        this.telephone = telephone;
    }
}
//Se crea la interfaz para crear los nuevos usuarios
export const createUserInterface = (e) => {
    e.preventDefault()
    mains.innerHTML =   ` 
                        <div id="containerCreateUser">
                            <h1 class="titleStandard"> Crear usuario </h1>
                                <form id="containerInputsCreateUser">
                                    <div class="divInputsGoSesion"><p>Usuario:</p> <input type="text" id="inputCreateUser"></input></div>
                                    <div class="divInputsGoSesion"><p>Contraseña: </p><input type="password" id="inputCreatePassword"></input></div>
                                    <div class="divInputsGoSesion"><p>Repita su contraseña:</p><input type="password" id="inputRepeatPassword"</input></div>
                                    <div class="divInputsGoSesion"><p>Mail:</p><input type="email" id="inputCreateMail"></input></div>
                                    <div class="divInputsGoSesion"><p>Nombre y Apellido: </p> <input type="text" id="inputCreateName"</input></div>
                                    <div class="divInputsGoSesion"><p>Direccion: </p> <input type="text" id="inputCreateDir"</input></div>
                                    <div class="divInputsGoSesion"><p>Telefono: </p> <input type="text" id="inputCreateTel"</input></div>
                                    <div class="divInputsGoSesion divBtnCreateUserConfirm"><button id="btnCreateUserConfirm">Crear Usuario</button></div>
                                </form>
                        </div>
                        `
    const containerCreateUser = document.getElementById("containerCreateUser");
    const containerInputsCreateUser = document.getElementById("containerInputsCreateUser");
    const btnCreateUserConfirm = document.getElementById("btnCreateUserConfirm");
    const inputCreateUser = document.getElementById("inputCreateUser");
    const inputCreatePassword = document.getElementById("inputCreatePassword");
    const inputRepeatPassword = document.getElementById("inputRepeatPassword");
    const inputCreateMail = document.getElementById("inputCreateMail");
    const inputCreateName = document.getElementById("inputCreateName");
    const inputCreateDir = document.getElementById("inputCreateDir");
    const inputCreateTel = document.getElementById("inputCreateTel");

    containerCreateUser.classList.add("divShadowBorder");
    containerCreateUser.classList.add("containerCreateUserClass");
    containerInputsCreateUser.classList.add("containerInputsCreateUserClass")
    btnCreateUserConfirm.classList.add("btnRecurse");

    btnCreateUserConfirm.addEventListener("click", (e) => createUser(e, inputCreateUser, inputCreatePassword, inputRepeatPassword, inputCreateMail, inputCreateName, inputCreateDir, inputCreateTel) )
}

const createUser = (e, inputCreateUser, inputCreatePassword, inputRepeatPassword, inputCreateMail, inputCreateName, inputCreateDir, inputCreateTel) =>  {
    e.preventDefault()
    
    let userVerifi = allUsers.find(element => element.user === inputCreateUser.value)
    let mailVerifi = allUsers.find(element => element.email === inputCreateMail.value)

    if(inputCreateUser.value === ""){ 
        alertInput("Ingrese un usuario valido por favor!")
        }
    else if(!userVerifi === false){
            if(inputCreateUser.value.toLowerCase() === userVerifi.user.toLowerCase()){
            alertInput("El usuario que esta ingresando ya existe!")
            }
        }
    else if(!(inputCreatePassword.value.length >= 8 && inputCreatePassword.value.length <= 12 )){
        alertInput("Ingrese una contraseña valida, que tenga entre 8 y 12 caracteres valido por favor!")
    }
    else if(!(inputRepeatPassword.value === inputCreatePassword.value)){
        alertInput("Ingrese una contraseña identica a la anterior valido por favor!")
    }
    else if(inputCreateMail.value === "" || !inputCreateMail.value.includes("@", 0) || !inputCreateMail.value.includes(".", 0)){
        alertInput("Ingrese un mail valido por favor! (debe contener '@' y '.'")
    }
    else if(!mailVerifi === false){
        if(inputCreateMail.value.toLowerCase() === mailVerifi.email.toLowerCase()){
            alertInput("No se puede crear usuario con un mail que ya posee una cuenta existente!")
        }
    }
    else if (inputCreateName.value === ""){
        alertInput("Ingrese un nombre valido por favor!")
    }
    else if(inputCreateDir.value === ""){
        alertInput("Ingrese una dirrecion valido por favor!")
    }
    else if(!isNaN(inputCreateTel.value) && !inputCreateTel.value.length == 10 ){
        alertInput("Ingrese un telefono valido por favor, recuerde que son 10 numeros los que debe ingresar!")
    }
    else{
        Swal.fire({
            title: 'Desea crear su usuario?',
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
                'Usuario creado con exito!',
                'Se ah creado el usuario correctamente.',
                'success'
            )
            usuarioPushNewUsers(inputCreateUser.value, inputCreatePassword.value, inputCreateMail.value, inputCreateName.value, inputCreateDir.value, inputCreateTel.value)
            setTimeout(() => {
                userFunction();
            }, 2000);
            //Para enviar form con enter "e.preventDefault;"//
            }
        })
    }
}

//Funcion para pushear los nuevos usuarios al array que luego los pushearia a el Local, para simular servidor.
const usuarioPushNewUsers = (user, password, email, name, dir, telephone) => {
    allUsers.push(new newUsers(user, password, email, name, dir, telephone))
    functionLocal("users", JSON.stringify(allUsers))
}