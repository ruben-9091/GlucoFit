const config = require("./config");
const session = require("express-session");
const MongoStore = require("connect-mongo").MongoStore;

module.exports = session({
  secret: config.get("session.secret"), // firma la cookie
  resave: false, // No vuelvas a guardar la sesión en Mongo si no ha cambiado.
  saveUninitialized: false, // No crear una sesión vacía para cada visitante.
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.get("session.secure"),
    // Necesario porque frontend (Netlify) y API (Fly.io) están en
    // dominios distintos. Sin esto, el navegador no manda la cookie
    // en peticiones cross-site, y cada llamada a la API parece "no
    // logueada" aunque el login haya ido bien.
    //
    // OJO: sameSite: "none" EXIGE que secure sea true (la cookie
    // solo puede viajar cross-site si va por HTTPS). En local, con
    // SESSION_SECURE=false, esto rompería el login en localhost
    // (http, no https) -> por eso lo condicionamos igual que secure.
    sameSite: config.get("session.secure") ? "none" : "lax",
  },
});