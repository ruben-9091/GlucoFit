const Exercise = require("../lib/models/exercise.model");

// GET /exercises - Obtener todos los ejercicios (soporta filtrado por ?categoria=running)
module.exports.list = async (req, res, next) => {
  try {
    const { categoria } = req.query;
    const criteria = {};

    if (categoria) {
      criteria.categoria = categoria;
    }

    const exercises = await Exercise.find(criteria);
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};

// GET /exercises/:id - Obtener el detalle de un ejercicio por su ID
module.exports.detail = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.json(exercise);
  } catch (error) {
    next(error);
  }
};

// POST /exercises - Crear un nuevo ejercicio
module.exports.create = async (req, res, next) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    next(error);
  }
};

// PATCH/PUT /exercises/:id - Actualizar un ejercicio
module.exports.update = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.json(exercise);
  } catch (error) {
    next(error);
  }
};

// DELETE /exercises/:id - Eliminar un ejercicio
module.exports.delete = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};