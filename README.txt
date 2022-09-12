Proyecto Final CODERHOUSE.

Hago entrega del proyecto final, en el cual se crea un ecommerce en el cual:

-Para poder inicializar tu compra primero vas a tener que iniciar sesión.

-Para poder iniciar sesión deberás crear un usuario el cual se almacenara en el LocalStorage
para poder simular un flujo de entrada y salida de datos de una "base de datos"
**Aclaración**
No se podra crear un usuario idento a otro o un usuario con un mail identico a otro ya creado, todo esto es 
almacenado en el LocalStorage para su comprobación.

-Una vez creado el usuario se podra validar que el usuario exista y poder empezar la compra.

-Podras agregar productos a tu carrito pero al presionar "finalizar compra", se detecta
si el usuario esta logeado o no, en el caso de no estarlo, sera redirigido a "iniciar sesion"

-Desde la función de carrito, podras eliminar objeto por objeto o vaciar el carrito entero
tambien podras seguir comprando o en su defecto ir directo a realizar la compra

-En el menudespegable podras elegir la categoría que quieras para poder filtrar por la misma y desde la barra de navegación
podras hacer una busqueda mas especifica!

-En el caso que se cierre la pagaina, el carrito queda guardado y el usuario no se deslogueará

-Una vez que se quiera finalizar la compra podras elegir por "Pagar en efectivo" o "Tarjeta de Credito"

-Si se selecciona "Pagar en efectivo", te dira que te acerques a una sucursal para poder abonar

-Si se selecciona "Tarjeta de credito", se solicita que se seleccione las cantidades de cuotas que desea abonar
en las cuales se aclara el % de recargo que tendra si abona en cada cuota, una vez elegido esto se simula un formulario
en el cual habra que completar detalladamente la información de la tarjeta de credito, si todo esta ok, se puede realizar el pago.

Se actualiza la apliación web y muestra un cartel de que su compra ah sido finalizado con exito, en ambos casos, al terminar la compra
Se actualiza todo el localStorage y queda vació nuevamente, esto se puede ver ya que al agregar items al carrito, aparecera un globo
con un numero de cuantos items vas agregando, este contador se actualiza cada vez que se agrega un item al carrito.

Jeremias Godoy.-