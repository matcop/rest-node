const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const bodyParser = require('body-parser');
//const usuario = require('../models/usuario');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.json('inicio - home')
})

app.get('/usuario', function (req, res) {
  //res.json('get usuario local')

  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limitexPagina = req.query.limite || 5;
  limitexPagina = Number(limitexPagina);

  let soloActivos={
    estado:true
  }
  //Usuario.find({google:true}) //para la busqueda personalizada
  //Usuario.find({estado:true}, 'nombre email role estado')  //para filtrar lo que se muestra.
  Usuario.find(soloActivos, 'nombre email role estado')  //para filtrar lo que se muestra.
    .skip(desde)
    .limit(limitexPagina)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      //deprecate .count
      //Use Collection.countDocuments or Collection.estimatedDocumentCount instead
      // Usuario.count({}, (err, conteo) => {
      Usuario.countDocuments(soloActivos, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });
      });
    });


})

app.post('/usuario', function (req, res) {

  const body = JSON.parse(JSON.stringify(req.body));

  let usuario = new Usuario({

    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role


  });


  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }


    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});



//para la actualizacion
//para filtrar que valores se podran actualizar usaremos 
//la propiedad pick del paquete underscore.
app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  })

  //res.json  ('PUT usuario')
})




app.delete('/usuario/:id', function (req, res) {

  let id = req.params.id;
  let estado={'estado':false};
  //let cambiaestado={estado:false}; asi lo escribio fernando

  Usuario.findByIdAndUpdate(id,estado,{new:true}, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    };

    //if(usuarioBorrado===null)el if de abajo es la vrs. simple
    if(!usuarioBorrado){
    return res.status(400).json({
      ok:false,
      err:{
        message:'usuario no encontrado'
      }
    });
  }


    res.json({
      ok: true,
      usuario: usuarioBorrado
    });

  });

})

module.exports = app;