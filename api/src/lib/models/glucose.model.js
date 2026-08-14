const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const glucoseSchema = new Schema(
  {
    value: {
      type: Number,
      required: [true, "El valor de glucemia es obligatorio"],
      min: 20,
      max: 600,
    },
    moment: {
      type: String,
      required: [true, "El momento del dia es obligatorio"],
      enum: ["desayuno", "almuerzo", "comida", "merienda", "cena"],
    },
    date: {
      type: Date,
      required: [true, "La fecha es obligatoria"],
      default: Date.now,
    },
    notes: {
      type: String,
      minLength: [10, "La nota debe contener al menos 10 caracteres"],
      maxLength: [200, "La nota debe contener como maximo 200 caracteres"],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        ret.id = doc.id;
        return ret;
      },
    },
  },
);

const Glucose = mongoose.model("Glucose", glucoseSchema);
module.exports = Glucose;
