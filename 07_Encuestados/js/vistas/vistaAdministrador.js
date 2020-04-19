/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
};

//AW: Todos los métodos de la vista Administrador
VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  //Construye los html de pregunta utilizando JQuery, agregandolos como listas con sus respectivos textos, clase y id
  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li></li>').addClass("list-group-item").attr('id', pregunta.id);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  /*Reconstruye la lista */
  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      //value es el texto de la pregunta.
      var value = e.pregunta.val();
      var respuestas = [];
      //recorre el array de respuestas
      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();
        //pushea el objeto respuesta en la variable respuestas
        respuestas.push({textoRespuesta: respuesta, cantidad:0});
       });
       respuestas.pop(); // cuando recorre las respuestas, lee un div extra "hidden", lo borro para que no haya una rta vacía.
       contexto.limpiarFormulario();
       
        if (value) {
          //en caso de que me de el valor, se lo paso al controlador.
          contexto.controlador.agregarPregunta(value, respuestas);
        } else {
          alert ("Debe ingresar una pregunta")
       }
     }),
     

     e.botonBorrarPregunta.click(function(){
      var idPregunta= $('.list-group-item.active').attr('id');
      contexto.limpiarFormulario();
      if(idPregunta) {
        contexto.controlador.borrarPregunta(idPregunta);
      } else {
        alert ('No se pudo borrar la pregunta');
      }
    }),


    e.botonEditarPregunta.click(function(){
      //cómo traigo la información ID de pregunta y texto de pregunta?
      var idPregunta = $('.list-group-item.active').attr('id');
      console.log (pregunta.textoPregunta);
      if (values) {
        contexto.controlador.editarPregunta (idPregunta, textoPregunta);
      } else {
        alert ('No se pudo editar la pregunta');
      }

    })
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  }
}