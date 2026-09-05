const createHttpError = require("http-errors");
const User = require("../lib/models/user.model");

module.exports.register = async (req, res, next) => {
  try {
    const { username } = req.body;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      next(createHttpError(404, "Username already exists"));
    } else {
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};





module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "email y contraseña son obligatorios"));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(createHttpError(401, "Credenciales incorrectas"));
    }

    const validPassord = await user.checkPassword(password);

    if (!validPassord) {
      return next(createHttpError(401, "Credenciales incorrectas"));
    }

    req.session.userId = user._id;

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.profile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    // Además de borrar la sesión del almacén, limpiamos la cookie
    // del navegador explícitamente, por seguridad extra.
    res.clearCookie("connect.sid");
    res.status(204).send();
  });
};
