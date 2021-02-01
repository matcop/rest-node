//====================================
//  PUERTO
//====================================
process.env.PORT=process.env.PORT || 3000;

//==========================================
//  ENTORNO DESARROLLO
// si la variable de produccion no existe 
// debera tomar la variable de desarrollo
//===========================================
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'



//====================================
//  BASE DE DATOS
//====================================
let urlDB;

if(process.env.NODE_ENV==='dev'){
  urlDB='mongodb://localhost:27017/cafe';
}else{
  //urlDB='mongodb://db_user_matcop:rXLOp2IhGTYI832E@cluster0.idhft.mongodb.net/cafe';
  urlDB='mongodb+srv://db_user_matcop:rXLOp2IhGTYI832E@cluster0.idhft.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB=urlDB;

