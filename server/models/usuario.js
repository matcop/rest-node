const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');


let rolesValidos={
  values:['ADMIN_ROLE','USER_ROLE'],
  message:'{VALUE} -NO ES UN ROL VALIDO'
};


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'el nombre es necesario']
  },
  email: {
    type: String,
    unique:true,
    required: [true, 'el email es necesario']
  },
  password: {
    type: String,
    required: [true, 'la contrasenia es obligatoria']
  },
  img: {
    type: String,
    required: [false, 'la imagen no es obligatoria']
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true,
    required: [true, 'la contrasenia es obligatoria']
  },
  google: {
    type: Boolean,
    default: false
  }
});


usuarioSchema.methods.toJSON=function(){
  let user=this;
  let userObject=user.toObject();
  delete userObject.password;

  return userObject;
}

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true);
//se eportara el modelo de mongoose con nombre Usuario
//y adquirira toda la configuracion del usuarioSchema.

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} DEBE DE SER UNICO'});
module.exports = mongoose.model('Usuario', usuarioSchema);