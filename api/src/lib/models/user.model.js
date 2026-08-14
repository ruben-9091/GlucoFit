const bcrypt = require("bcryptjs");
const mongoose = required("mongoose");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "EL nombre es obligatorio."],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "EL username es obligatorio."],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "El e-mail es obligatorio."],
      trim: true,
      match: [EMAIL_PATTERN, "Formato de e-mail no válido."],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      match: [
        PASSWORD_PATTERN,
        "La contraseña debe tener al menos 8 caracteres.",
      ],
      trim: true,
    },
    diabetesType: {
      type: String,
      required: [true, "El tipo de diabetes es obligatorio"],
      enum: ["type1", "type2", "gestacional"],
    },
    //Para mas adelante el avatar
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
  }
});

// ------------------------------------------------------------
// MÉTODOS DE INSTANCIA
// ------------------------------------------------------------

// methods añade funciones personalizadas a CADA documento User.
// Es decir: cualquier usuario que saques con User.findOne(...)
// tendrá disponible user.checkPassword(...).
//
// Se usa en el login: comparamos la contraseña en texto plano que
// llega en el body contra el hash guardado en la base de datos.
//userSchema.methods.checkPassword = function (passwordToCheck) {
// bcrypt.compare devuelve una Promise<boolean>, por eso se usa
// normalmente con await: const isValid = await user.checkPassword(pass);
// return bcrypt.compare(passwordToCheck, this.password);
//};

// ------------------------------------------------------------
// CAMPOS VIRTUALES (relaciones que no se guardan en la BD)
// ------------------------------------------------------------

// Relación virtual: NO se guarda en la base de datos, pero permite
// rellenar user.glucoseRecords "bajo demanda" usando .populate().
//
// Se traduce como: "busca en la colección GlucoseRecord todos los
// documentos donde el campo owner sea igual al _id de este usuario".
//userSchema.virtual("glucoseRecords", {
// ref: "GlucoseRecord", // modelo al que apunta
// localField: "_id", // campo de ESTE modelo (User._id)
//foreignField: "owner", // campo del OTRO modelo (GlucoseRecord.owner)
//justOne: false, // puede haber varios registros -> devuelve un array
//});

// Uso típico:
// const user = await User.findById(id).populate("glucoseRecords");
// -> trae el usuario con todos sus controles de glucemia en una sola query.

const User = mongoose.model("User", userSchema);
module.exports = User;
