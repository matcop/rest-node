require('./config/config')
const express = require('express');
const mongoose = require('mongoose');



const app = express()

app.use(require('./routes/usuario'));
const bodyParser = require('body-parser')

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

