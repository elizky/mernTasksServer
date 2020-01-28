const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crea una nueva tarea
exports.crearTarea = async (req, res) => {
  //revisa si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //extraer proyecto y comprobar si existe
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      res.status(400).json({ msg: "proyecto no encontrado" });
    }

    //revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }

    //creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

//obtiene las tareas por proyecto

exports.obtenerTareas = async (req, res) => {
  try {
    //extraer proyecto y comprobar si existe
    const { proyecto } = req.query;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      res.status(400).json({ msg: "proyecto no encontrado" });
    }

    //revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }

    //obtener tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

//actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    //extraer proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    //si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      res.status(404).json({ msg: "No existe tarea" });
    }
    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }

    //creamos la tarea
    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};
//eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    //extraer proyecto y comprobar si existe
    const { proyecto } = req.query;

    //si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      res.status(404).json({ msg: "No existe tarea" });
    }
    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }

    //eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};
