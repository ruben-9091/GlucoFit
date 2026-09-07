const cors = require('cors');
const config = require('./config');

const allowedOrigins = config.get('cors.origin').split(',').map(o => o.trim());

module.exports = cors({
  origin: function (origin, callback) {
    // Permite requests sin origin (Postman, curl, etc.) y los que están en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
});