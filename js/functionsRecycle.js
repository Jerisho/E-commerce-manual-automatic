//Funcion para crear los valores a guardar en el LocalStorage//
export const functionLocal = (clave, valor) => { localStorage.setItem(clave, valor) }
//Funcion para vaciar los arrays//
export const empty = (array) =>{
    for (let i = array.length; i > 0; i-- ){
        array.pop();
    }
}
//Funcion generica para alertas de inputs//
export const alertInput = (text) =>{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${text}`,
        confirmButtonText: `Aceptar`
      })
}
//Funcion de notificación de "producto agregado con exito"
export function notify(){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Producto agregado con exito!'
  })}
//Función para redirigir a otro apartado luego de un determinado tiempo//
export const redir = (link) =>{
  window.setTimeout(function(){
      window.location = link
  }, 2500)
}
