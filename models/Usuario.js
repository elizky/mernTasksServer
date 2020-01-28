const mongoose = require('mongoose');

//perfil de usuario
const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String, //tipo
    required: true, //requerido
    trim: true //elimina espacios al inicio y al final
  },
  email: {
    type: String, //tipo
    required: true, //requerido
    trim: true, //elimina espacios al inicio y al final
    unique: true //unico
  },
  password: {
    type: String, //tipo
    required: true, //requerido
    trim: true //elimina espacios al inicio y al final
  },
  registro: {
    type: Date, //tipo
    default: Date.now() //momento donde se da de alta
  }
});
module.exports = mongoose.model('Usuario', UsuariosSchema);
