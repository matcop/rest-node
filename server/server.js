require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//app.use indica que son midlewars
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/', function (req, res) {
  res.json('inicio - home')
})

app.get('/usuario', function (req, res) {
  res.json('get usuario')
})

app.post('/usuario', function (req, res) {
  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mesage: "el nombre es un campo obligatorio"
    })
  } else {
    res.json({
      persona: body
    });
  }

});




app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  res.json({
    id
  });
  //res.json  ('PUT usuario')
})

app.delete('/usuario', function (req, res) {
  res.json('DELETE usuario')
})


app.listen(process.env.PORT, () => {
  console.log('PUERTO ', 3000);
})