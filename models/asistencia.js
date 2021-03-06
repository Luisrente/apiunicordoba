
const { Schema, model } = require('mongoose');
const usuario = require('./usuario');

const AsistenciaSchema = Schema({
    forma: {
        type: String,
    },
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    codigo: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    documento: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    horaInsert: {
        type: Date,
        default: Date.now
    }
});

AsistenciaSchema.methods.toJSON = function() {
    const { __v, ...Asist  } = this.toObject();
    return Asist;
}

module.exports = model( 'Asistencia', AsistenciaSchema );
