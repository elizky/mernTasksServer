const express = require("express");
const conectarDB = require("./config/db");
const cors = require('cors');
const {usuarios, auth, proyectos, tareas} = require('../servidor/routes')
// crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//Habilitar corse
app.use(cors())

//Habilitar express.json
app.use(express.json({ extended: true }));

//puerto
const PORT = process.env.PORT || 4000;

//importar rutas
app.use("/api/usuarios", usuarios);
app.use("/api/auth", auth);
app.use("/api/proyectos", proyectos);
app.use("/api/tareas", tareas);

// arrancar
app.listen(PORT, () => {
  console.log(`Escuchando en ${PORT}`);
});
