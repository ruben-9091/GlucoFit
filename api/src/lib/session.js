const config = require("./config"); 
const session = require("express-session"); 
const MongoStore = require("connect-mongo").MongoStore; 

module.exports = session ({
    secret: config.get("session.secret"), // firma la cookie
    resave: false, //No vuelvas a guardar la sesión en Mongo si no ha cambiado.
    saveUninitialized: false, // No crear una sesión vacía para cada visitante.
    //Solo se crea cuando haces:
    //req.session.userId = user._id;
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), 
    /* 
        Esto es súper importante:
        - Las sesiones se guardan en MongoDB
        - Sobreviven reinicios del servidor
        - Puedes escalar sin perder sesiones 
    */
    cookie: {
        httpOnly: true, 
        maxAge:  24 * 60 * 60 * 1000, 
        secure: config.get("session.secure"),

    /*
    🔐 httpOnly: true
        - Evita que JavaScript del navegador lea la cookie → protege contra XSS.

    ⏳ maxAge
        - Duración de la sesión: 24 horas.

    🔒 secure
        - Si true → la cookie solo viaja por HTTPS.
    */
    },
}); 