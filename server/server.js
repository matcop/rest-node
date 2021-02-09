require('./config/config')
const express = require('express');
const mongoose = require('mongoose');

//parte de la conf para acceder a public folder
const path=require('path');



const app = express()

//app.use(require('./routes/usuario'));
//app.use(require('./routes/login'));
//configuracion global de rutas
app.use(require('./routes/index'));

const bodyParser = require('body-parser')

//habilitar el folder PUblic

app.use(express.static(path.resolve(__dirname,'..//public/')));

//app.use indica que son midlewars
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())





//mongoose.connect('mongodb://localhost:27017/cafe', {
  mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}, (err, res) => {
  if (err) throw err;

  console.log('base de datos ONLINE');
})



app.listen(process.env.PORT, () => {
  console.log('PUERTO ', 3000);
});

