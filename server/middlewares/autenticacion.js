const jwt = require('jsonwebtoken');

//===============
//VERIFICAR TOKEN
//===============

let verificaToken = (req, res, next) => {


  let token = req.get('token');  //si fuera necesario cambiar authorization si implica

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: 'consulte con el administrador, problemas con la firma de autorizacion'
      });
    }
    //obtenemos informacion del usuario estando disponible en la peticiion de las urls
    req.usuario = decoded.usuario;
    next();

  });

};

//===============
//VERIFICAR ADMIN_ROLE
//===============

let verificaAdmin_Role = (req, res, next) => {
  
  let usuario = req.usuario;
  if (usuario === "ADMIN_ROLE") {
    next();
   // return;
  } else {
    return res.json({
      ok: false,
      err: 'Ud. no cuenta con autorizacion que corresponde'
    });
  }
}




module.exports = {
  verificaToken,
  verificaAdmin_Role
};