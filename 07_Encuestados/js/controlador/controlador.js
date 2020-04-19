/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(idPregunta) {
      this.modelo.borrarPregunta(idPregunta);
  },

  editarPregunta: function (idPregunta, textoPregunta) {
      this.modelo.editarPregunta(idPregunta, textoPregunta);
  },

  borrarTodo: function (){
    this.modelo.borrarTodo();
  },

  votarRespuesta: function (idPreguntaVotada, textoRespuestaVotada) {
      this.modelo.votarRespuesta (idPreguntaVotada, textoRespuestaVotada);
  }
}
