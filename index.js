const express = require("express");
const conectarDB = require("./config/db");
const cors = require('cors');
const {usuarios, auth, proyectos, tareas} = require('./routes')
// crear el servidor
const app = express();

// // Cors
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET");
//   next();
// });
// conectar a la base de datos
conectarDB();

// Habilitar corse
app.use(cors())

//Habilitar express.json
app.use(express.json({ extended: true }));

//puerto
const port = process.env.port || 4000;

app.get("/ping", (req, res) => {
  res.send("pong");
});

// //importar rutas
app.use("/api/usuarios", usuarios);
app.use("/api/auth", auth);
app.use("/api/proyectos", proyectos);
app.use("/api/tareas", tareas);

// arrancar
app.listen(port, () => {
  console.log(`Escuchando en ${port}`);
});
