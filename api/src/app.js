
// IMPORTANTE: Colocar esto en la LÍNEA 1 de app.js
if (!globalThis.crypto) {
  globalThis.crypto = require('node:crypto').webcrypto;
}
const express = require("express");
const loggerHttp = require("pino-http");
const logger = require("./lib/logger");
const config = require("./lib/config");
const apiRouter = require("./controllers");
const session = require("./lib/session");
const corsMiddleware = require("./lib/cors");

require("./lib/db");

const app = express();
app.set('trust proxy', 1); 

if (config.get("cors.enabled")) {
  app.use(corsMiddleware);
}

app.use(loggerHttp({ logger }));
app.use(express.json());

app.use(session);

app.use("/api/v0", apiRouter);


const PORT = process.env.PORT || config.get("port");

app.listen(PORT, () => {
  logger.info(`Application listening at port ${PORT}`);
});