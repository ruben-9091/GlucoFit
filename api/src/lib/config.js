require("dotenv").config();

const convict = require("convict");

const config = convict({
  build: {
    service: {
      doc: "App name",
      format: String,
      default: process.env.npm_package_name,
    },
    version: {
      doc: "App version",
      format: String,
      default: process.env.npm_package_version,
    },
  },
  port: {
    doc: "Api port",
    format: "port",
    default: 3000,
    env: "PORT",
  },
  db: {
    doc: "Mongo DB connection URI",
    format: String,
    default: "",
    env: "MONGODB_URI",
  },
  session: {
    secret: {
      doc: "Session secret for cookie signature",
      format: String,
      default: "super secret",
      env: "SESSION_SECRET",
    },

    /*secret → La clave para firmar cookies de sesión.
    Debe ser larga y aleatoria en producción.
    Se puede leer desde process.env.SESSION_SECRET. */

    secure: {
      doc: "Enable session cookie secure",
      format: Boolean,
      default: false,
      env: "SESSION_SECURE",

      /*secure → Si la cookie solo se envía por HTTPS.
      false en desarrollo (localhost).
      true en producción. */
    },
  },
  cors: {
    enabled: {
      doc: "Enable/disable CORS",
      format: Boolean,
      default: false,
      env: "CORS_ENABLED",
    },
    origin: {
      doc: "CORS origin allowed",
      format: String,
      default: null,
      env: "CORS_ORIGIN",
    },
  },
  /*
CORS es un middleware que le dice a tu backend:
“¿Qué frontend tiene permiso para hacerme peticiones?”
Sin CORS, tu navegador bloquea las peticiones del frontend 
al backend si están en dominios o puertos distintos. 

enabled → Activa o desactiva CORS.

origin → Qué dominio puede hacer peticiones a tu API
*/
});

config.validate({ allowed: "strict" });

module.exports = config;
