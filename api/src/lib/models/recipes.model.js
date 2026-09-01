const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      trim: true,
    },
    // No viene en el JSON de cada receta individual.
    // La rellenamos NOSOTROS en el script de seed, según de qué
    // archivo (dessert/meat/salad/vegan) sale cada receta.
    categoria: {
      type: String,
      required: true,
      enum: ["dessert", "meat", "salad", "vegan"],
    },
    tiempoPreparacion: {
      type: String, // viene como "10 min", texto libre, no un número
      trim: true,
    },
    dificultad: {
      type: String,
      enum: ["Muy Fácil", "Fácil", "Media", "Difícil"],
      // Si al hacer el seed sale un ValidationError de "dificultad"
      // con algún valor que no está aquí, es que en meat/salad/vegan
      // aparece una etiqueta distinta (p. ej. "Alta") -> hay que
      // añadirla a este enum antes de reintentar.
    },
    informacionNutricional: {
      calorias: Number,
      proteinasG: Number,
      carbohidratosG: Number,
      grasasG: Number,
    },
    imagenUrl: {
      type: String,
      trim: true,
    },
    ingredientes: [
      {
        type: String,
      },
    ],
    pasos: [
      {
        type: String,
      },
    ],
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

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;