

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ------------------------------------------------------------
// CONSTANTES
// ------------------------------------------------------------

// Coste computacional del hasheo con bcrypt.
// Cuanto más alto, más lento (y más seguro) es generar el hash.
// 10 es el valor estándar recomendado, buen equilibrio entre
// seguridad y rendimiento.
const SALT_WORK_FACTOR = 10;

// Regex para validar que el email tiene un formato correcto
// (usuario@dominio.extensión).
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Regex para validar que la contraseña tiene al menos 8 caracteres.
// OJO: esta validación se aplica sobre la contraseña en texto plano,
// ANTES de que el middleware pre("save") la hashee.
const PASSWORD_PATTERN = /^.{8,}$/;

// Valores permitidos para el tipo de diabetes del usuario.
// Se usa tanto aquí (enum del backend) como en el <select>
// del formulario de registro en el frontend.
const DIABETES_TYPES = ["type1", "type2", "gestational"];

// ------------------------------------------------------------
// SCHEMA
// ------------------------------------------------------------

const userSchema = new Schema(
  {
    // Nombre del usuario (uso interno / mostrar en el perfil).
    name: {
      type: String,
      required: "El nombre es obligatorio",
      trim: true,
    },

    // Email: se usa como identificador único para el login.
    email: {
      type: String,
      required: "El email es obligatorio",
      trim: true,
      // match valida el campo contra la regex de arriba.
      match: [EMAIL_PATTERN, "Formato de email no válido"],
      // lowercase convierte el valor a minúsculas antes de guardar,
      // así "Ruben@Gmail.com" y "ruben@gmail.com" se tratan igual.
      lowercase: true,
      // unique crea un índice en MongoDB que impide dos usuarios
      // con el mismo email. Si se duplica, MongoDB lanza un error
      // E11000 (no es un ValidationError normal de Mongoose).
      unique: true,
    },

    // Contraseña del usuario. Se guarda hasheada, nunca en texto plano.
    password: {
      type: String,
      required: "La contraseña es obligatoria",
      match: [
        PASSWORD_PATTERN,
        "La contraseña debe tener al menos 8 caracteres",
      ],
      trim: true,
    },

    // Tipo de diabetes. Limita los valores posibles a los tres
    // definidos en DIABETES_TYPES (enum = "solo estos valores").
    diabetesType: {
      type: String,
      required: "El tipo de diabetes es obligatorio",
      enum: {
        values: DIABETES_TYPES,
        message: "Tipo de diabetes no válido",
      },
    },

    // Avatar del usuario. Si no se especifica ninguno al crear el
    // usuario, se genera automáticamente uno a partir de su email
    // usando el servicio pravatar.cc.
    avatar: {
      type: String,
      default: function () {
        // OJO: tiene que ser function() normal, NO arrow function,
        // porque necesitamos que "this" apunte al documento que se
        // está creando para poder leer this.email.
        return `https://i.pravatar.cc/150?u=${this.email}`;
      },
    },
  },
  {
    // Añade automáticamente los campos createdAt y updatedAt.
    timestamps: true,

    // Configura cómo se transforma el documento cuando se convierte
    // a JSON (esto pasa automáticamente en cada res.json(user)).
    toJSON: {
      // Incluye los campos virtuales (como "glucoseRecords" de abajo)
      // en la respuesta JSON. Sin esto, no aparecerían.
      virtuals: true,

      // transform se ejecuta justo antes de mandar el JSON y permite
      // modificar la respuesta final.
      transform: function (doc, ret) {
        ret.id = ret._id; // copiamos _id (ObjectId feo) a un id más limpio
        delete ret._id; // quitamos el _id original
        delete ret.__v; // quitamos el campo interno de versión de Mongoose
        delete ret.password; // MUY IMPORTANTE: el hash nunca debe salir en la respuesta
        return ret;
      },
    },
  }
);

// ------------------------------------------------------------
// MIDDLEWARE (HOOKS)
// ------------------------------------------------------------

// Se ejecuta automáticamente justo ANTES de guardar el documento
// (tanto en .save() como en .create(), que usa .save() por debajo).
userSchema.pre("save", async function () {
  // isModified("password") comprueba si el campo password ha
  // cambiado desde el último guardado.
  //
  // Esto es clave: sin este if, cada vez que actualizaras CUALQUIER
  // otro campo del usuario (por ejemplo el avatar), este hook
  // volvería a hashear un password que YA estaba hasheado,
  // dejando la contraseña rota e imposible de comparar en el login.
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
userSchema.methods.checkPassword = function (passwordToCheck) {
  // bcrypt.compare devuelve una Promise<boolean>, por eso se usa
  // normalmente con await: const isValid = await user.checkPassword(pass);
  return bcrypt.compare(passwordToCheck, this.password);
};

// ------------------------------------------------------------
// CAMPOS VIRTUALES (relaciones que no se guardan en la BD)
// ------------------------------------------------------------

// Relación virtual: NO se guarda en la base de datos, pero permite
// rellenar user.glucoseRecords "bajo demanda" usando .populate().
//
// Se traduce como: "busca en la colección GlucoseRecord todos los
// documentos donde el campo owner sea igual al _id de este usuario".
userSchema.virtual("glucoseRecords", {
  ref: "GlucoseRecord", // modelo al que apunta
  localField: "_id", // campo de ESTE modelo (User._id)
  foreignField: "owner", // campo del OTRO modelo (GlucoseRecord.owner)
  justOne: false, // puede haber varios registros -> devuelve un array
});

// Uso típico:
// const user = await User.findById(id).populate("glucoseRecords");
// -> trae el usuario con todos sus controles de glucemia en una sola query.

// ------------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------------

const User = mongoose.model("User", userSchema);
module.exports = User;