const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
 {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    tipo: {
      type: String,
      required: true,
      enum: ['Fuerza', 'Cardio', 'Flexibilidad']
    },
     categoria: {
      type: String,
      required: true,
      enum: ["running", "gym", "flex"],
    },
    duracion: {
      type: String,
      required: true,
      trim: true
    },
    dificultad: {
      type: String,
      required: true,
      enum: ['Principiante', 'Intermedio', 'Avanzado']
    },
    informacionCalorica: {
      caloriasQuemadasAprox: {
        type: Number,
        required: true
      },
      frecuenciaCardiacaMedia: {
        type: Number,
        required: true
      }
    },
    grupoMuscularPrincipal: [
      {
        type: String,
        required: true,
        trim: true
      }
    ],
    equipamiento: {
      type: String,
      required: true,
      trim: true
    },
    imagenUrl: {
      type: String,
      required: true,
      trim: true
    },
    pasos: [
      {
        type: String,
        required: true,
        trim: true
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;

