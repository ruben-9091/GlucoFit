const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://gluco-fit.netlify.app",
];

module.exports = cors({
  origin: function (origin, callback) {
    // Permite peticiones sin origen (Postman/curl) o que coincidan con la lista
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".netlify.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});
