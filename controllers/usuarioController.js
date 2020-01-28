const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//se usa jwt porque en react no hay sesiones

exports.crearUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer email y pass
  const { email, password } = req.body;

  try {
    //guarda en usuario si llegase a existir un mail
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "Usuario Existente" });
    }

    //crea
    usuario = new Usuario(req.body);

    //hashear la pass
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guarda
    await usuario.save();

    //crear y firmar el JWT
    const payload = {
        usuario: {
            id: usuario.id
        }
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600 //1 hora
      },
      (error, token) => {
        if (error) throw error;
        //confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Amigo");
  }
};
