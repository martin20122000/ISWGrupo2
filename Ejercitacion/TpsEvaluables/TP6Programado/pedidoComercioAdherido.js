
        // Cambia el bloque segun la forma de pago ------------------------------
document.addEventListener("DOMContentLoaded", function() {
    var comboBox = document.getElementById("formaPago");
    var contenido1 = document.getElementById("pagoEfectivo");
    var contenido2 = document.getElementById("pagoTarjeta");
    var cantAbonar = document.getElementById("cantAbonar");
    var numero_tarjeta = document.getElementById("numero_tarjeta");
    var nombre_apellido = document.getElementById("nombre_apellido");
    var fecha_vencimiento = document.getElementById("fecha_vencimiento");
    
    var cvc = document.getElementById("cvc");
    
//este código se ejecutará cada vez que el comboBox cambia de valor, habilitando o deshabilitando los inputs correspondientes
    comboBox.addEventListener("change", function() {
        contenido1.style.display = "none";
        contenido2.style.display = "none";


        var opcionSeleccionada = comboBox.value;

        if (opcionSeleccionada === "efectivo") {
            document.getElementById("enviar").disabled=false;
            contenido1.style.display = "block";
            cantAbonar.required = true;
            numero_tarjeta.required = false;
            nombre_apellido.required = false;
            fecha_vencimiento.required = false;
            cvc.required = false;
        } else {
            contenido2.style.display = "block";
            cantAbonar.required = false;
            numero_tarjeta.required = true;
            nombre_apellido.required = true;
            fecha_vencimiento.required = true;
            cvc.required = true;
        }
    });
});
//Se define la hora actual y luego se la formatea y se le asigna ese dato 
//como el valor mínimo que el usuario puede utilizar para programar su envio
var campo1Input=document.getElementById("fecha_hora");
fechaActual1=new Date();
campo1Input.min=fechaActual1.toISOString().slice(0, 16);


numero_calle=document.getElementById("numeroCalle");

fecha_vencimiento1=document.getElementById("fecha_vencimiento");

//bandera para saber si el carrito está vacío
var carritoVacio=false;
//Franco tarjeta

// Obtén una referencia al formulario
var formulario = document.getElementById("miFormulario");

// Agrega un evento 'submit' al formulario
formulario.addEventListener("submit", function () {
  // Obtén el valor del campo de texto
  
 alert("Se ha registrado el pedido correctamente")





});
//Boton enviar
var enviar=document.getElementById("enviar");
enviar.addEventListener("click",function(){

    // Obtener el elemento select
  var selectElement = document.getElementById("formaPago");

  // Obtener el índice de la opción seleccionada
  var selectedIndex = selectElement.selectedIndex;

  // Obtener el texto de la opción seleccionada
  var selectedOption = selectElement.options[selectedIndex].text;
  //Validaciones para tarjeta de crédito
  if (selectedOption!="Efectivo"){
      // Verifica si la longitud del campo de texto es menor que 19 caracteres
    if (numero_tarjeta.value.length < 19) {
      // Detén el envío del formulario
      event.preventDefault();

      // Muestra un mensaje de error o realiza alguna otra acción
      alert("El número de la tarjeta debe tener al menos 16 digitos.");
    }
    
     // Separar el valor de la fecha de vencimiento en mes y año
     var fecha_vencimiento1=document.getElementById("fecha_vencimiento");
     if (fecha_vencimiento.value.length < 7){
        event.preventDefault();

      // Muestra un mensaje de error o realiza alguna otra acción
      alert("El formato de la fecha de vencimiento de la tarjeta es inválido");
     }
     var partes = fecha_vencimiento1.value.split("/");
     var mes = parseInt(partes[0], 10);
     var año = parseInt(partes[1], 10);
     //Se obtiene el mes actual, y se le suma uno porque esa función devuelve valores entre 0 y 11
     mesActual=fechaActual1.getMonth()+1;
if(mes>12 || mes <=0){
    event.preventDefault();
    alert("La fecha de vencimiento de la tarjeta es inválida o está expirada")
}
    if (año<fechaActual1.getFullYear())
    {
        event.preventDefault();
        alert("La fecha de vencimiento de la tarjeta es inválida o está expirada")
    }
    else if (año==fechaActual1.getFullYear()){
        if (mes<mesActual){
              event.preventDefault();
              alert("La fecha de vencimiento de la tarjeta es inválida o está expirada")
          }
    }
    
    
     
    
}
else{
    if (document.getElementById("cantAbonar").value<56.25){
        event.preventDefault();
        alert("ingrese un monto válido para abonar")
    }
}
//pregunta si está seleccionado el apartado de programación de entrega
if(document.getElementById("programarFecha").style.display=="block"){
    // Obtener el elemento de entrada de fecha
 const fechaInput = document.getElementById('fecha_hora');
 // Obtener la fecha actual
 const fechaActual = new Date();
 // Calcular una semana adelante
 const fechaMaxima = new Date();
 fechaMaxima.setDate(fechaActual.getDate() + 7);
 // Formatear la fecha máxima como cadena para el atributo max del input
 const fechaMaximaFormat = fechaMaxima.toISOString().slice(0, 16);
 // Configurar el atributo max del input para limitar la fecha máxima
 fechaInput.setAttribute('max', fechaMaximaFormat);
 // Agregar un evento de validación personalizado
 fechaInput.addEventListener('input', function () {
    const fechaSeleccionada = new Date(fechaInput.value);
     
    if (fechaSeleccionada < fechaActual) {
        fechaInput.setCustomValidity('La fecha de programacion no puede ser anterior al periodo.');
    } else if (fechaSeleccionada > fechaMaxima) {
        fechaInput.setCustomValidity('No se puede programar un pedido con mas de una semana de anticipacion.');
    } else{
        fechaInput.setCustomValidity('');
    }
 });
}
else{
    document.getElementById("fecha_hora").value="2023-09-17T22:05"
}




if (carritoVacio){
          
    event.preventDefault();
    alert("No puede realizar un pedido con el carrito vacio")
}
//Comprobación de que el número de calle ingresado no sea 0 o negativo
if (numero_calle.value<1){
    event.preventDefault();
    alert("Por favor ingrese un número de calle válido")
}})



        // da formato al cvc ------------------------------
        var numeroInput = document.getElementById("cvc");

        numeroInput.addEventListener("input", function() {
            // Elimina caracteres no numéricos
            this.value = this.value.replace(/\D/g, "");

            // Limita la longitud a tres dígitos
            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3);
            }
        });


        // validar fecha ------------------------------
        function validarFechaVencimiento() {
            var inputFecha = document.getElementById("fecha_vencimiento");
            var fechaIngresada = new Date(inputFecha.value);
            var fechaActual = new Date();

            // Establece la hora de la fecha actual a las 00:00:00 para comparar solo las fechas
            fechaActual.setHours(0, 0, 0, 0);

            if (fechaIngresada <= fechaActual) {
                var mensajeError = document.getElementById("mensaje_error");
                mensajeError.textContent = "Selecciona una fecha mayor a la actual.";
                event.preventDefault(); // Evita que se envíe el formulario si la fecha es incorrecta
            }
        }


        // le da formato a la fecha de vencimiento ------------------------------
        var numeroInput = document.getElementById("fecha_vencimiento");
        numeroInput.addEventListener("input", function() {
            // Elimina caracteres no numéricos, excepto la barra "/"
            this.value = this.value.replace(/[^0-9/]/g, "");

            // Limita la longitud a 7 caracteres (2 números + "/" + 4 números)
            if (this.value.length > 7) {
                this.value = this.value.slice(0, 7);
            }

            // Formatea automáticamente la entrada (XX/YYYY)
            if (this.value.length === 2 && this.value.indexOf("/") === -1) {
                this.value += "/";
            }
        });

        // Permite borrar la barra "/" de la fecha de vencimiento con la tecla "Backspace"
        numeroInput.addEventListener("keydown", function(e) {
            
            if (e.key === "Backspace" && this.value.length === 3) {
                this.value = this.value.slice(0, 2);
            }
        });

//Comprobacion fecha Poche

//comprobación mes y año validos de tarjeta
//dividmos el string del textbox,
fecha_vencimiento.addEventListener("change",function(){
    let fecha1= fecha_vencimiento.split(['/'],3); 
    let fecha= new Date (); //objeto Date para invocar metodos de Date
    let añoActual = fecha.getFullYear(); //año actual
    let mesActual = fecha.getMonth()+1; //mes actual (devuelve un valor entre 0 y 11, por eso el +1)
    if(!parseInt(fecha1[0]) >= 12)
    {
        alert('El mes ingresa es invalido. Intente nuevamente.');
    }
    else if ((parseInt(fecha1[1])== añoActual && parseInt(fecha[0])>= mesActual) || parseInt(fecha1[1])> añoActual)
    {
        //CasoFeliz
    }
    
    else{
        alert('La tarjeta que ha ingresado esta vencida. Intente con otra.');
    }
    
            
})
// le da formato al numero de tarjeta v------------------------------

numero_tarjeta.setAttribute("minlenght","19");
            
numero_tarjeta.addEventListener("input", function() {
    // Elimina caracteres no numéricos
    this.value = this.value.replace(/\D/g, "");

    // Divide los números en grupos de 4 y agrega guiones
    var formattedNumber = this.value.replace(/(\d{4})/g, '$1-');

    // Elimina el guión al final si está presente
    if (formattedNumber.endsWith("-")) {
        formattedNumber = formattedNumber.slice(0, -1);
    }

    // Limita la longitud a 19 caracteres (16 números + 3 guiones)
    if (formattedNumber.length > 19) {
        formattedNumber = formattedNumber.slice(0, 19);
    }

    this.value = formattedNumber;
});



        


        // Cambia los campos que son requeridos, segun el radio ------------------------------
        var radioOpcion1 = document.getElementById("recepcion1");
        var radioOpcion2 = document.getElementById("recepcion2");


        // Agregamos un evento change a los radio buttons
        radioOpcion1.addEventListener("change", function() {
            if (this.checked) {
                campo1Input.required = false;
            }
        });

        radioOpcion2.addEventListener("change", function() {
            if (this.checked) {
                campo1Input.required = true;
            }
        });
var tabla =document.getElementById("tabla");
//Botón para vaciar el carrito
var vaciarCarrito=document.getElementById("vaciarCarrito");
//Botón para restablecer los elementos borrados del carrito
var restablecerCarrito=document.getElementById("restablecer");
restablecerCarrito.addEventListener("click",function(){
    restablecerTabla();
    carritoVacio=false;
    document.getElementById("total").textContent="Total: $56,25"
})
function restablecerTabla() {
    var tbody = tabla.getElementsByTagName("tbody")[0];
    tbody.innerHTML = 
    `<tr>
    <td>Producto 1</td>
    <td>5</td>
    <td>$10.00</td>
</tr>
<tr>
    <td>Producto 2</td>
    <td>3</td>
    <td>$15.00</td>
</tr>
<tr>
    <td>Producto 3</td>
    <td>2</td>
    <td>$8.50</td>
</tr>
<tr>
    <td>Producto 4</td>
    <td>7</td>
    <td>$12.75</td>
</tr>
<tr>
    <td>Producto 5</td>
    <td>4</td>
    <td>$9.99</td>
</tr>
        `;
}

// validar tarjeta--------------
function validarTipoTarjeta(numero_Tarjeta) {
    // Eliminar espacios y guiones del número de tarjeta
    numero_Tarjeta = numero_Tarjeta.replace(/\s+/g, '').replace(/-/g, '');

    var resultado = document.getElementById("resultado");
    var botonValidar = document.getElementById("enviar");
    

    // Verificar si comienza con "4" (Visa) o "5" (Mastercard)
    if (/^4/.test(numero_Tarjeta)) {
        resultado.innerHTML = "Esta es una tarjeta Visa.";
        botonValidar.disabled = false; // Habilitar el botón

    } else if (/^5/.test(numero_Tarjeta)) {
        resultado.innerHTML = "<span style='color: red; font-weight: bold;'>Esta es una tarjeta Mastercard. En este momento sólo aceptamos Visa.";
        botonValidar.disabled = true; // Deshabilitar el botón

    } else {
        resultado.innerHTML = "<span style='color: red; font-weight: bold;'>Tarjeta no reconocida. Por favor ingrese una tarjeta válida.";
        botonValidar.disabled = true; // Habilitar el botón
        
    }
}




vaciarCarrito.addEventListener("click",function(){
eliminarTabla();
//se activa la bandera de que el carrito está vacío para la verificación 
//de que se realice el pedido con al menos un item en el carrito
carritoVacio=true;
//estas lineas son para hardcodear el valor "0" al total del carro cuando este está vacío
var label=document.getElementById("total");
label.textContent="Total: $0";
})







function eliminarTabla(){
    // Elimina todas las filas, excepto la primera fila (si la tabla tiene encabezados)
    var tbody = tabla.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
}

   // Muestra la fecha de porgramcion si selecciono el radio programar ------------------------------
   var radioMostrar = document.getElementById("recepcion2");
   var radioOcultar = document.getElementById("recepcion1");
   var contenido = document.getElementById("programarFecha")
   radioMostrar.addEventListener("change", function() {
       if (this.checked) {
           contenido.style.display = "block"; // Mostrar contenido
       }
   })
   radioOcultar.addEventListener("change", function() {
       if (this.checked) {
           contenido.style.display = "none"; // Ocultar contenido
       }
   });



