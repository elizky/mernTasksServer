const mongoose = require('mongoose')
const TareaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId, //saca el id
        ref: 'Proyecto'                        //de este Proyecto
    }
});

module.exports = mongoose.model('Tarea', TareaSchema)