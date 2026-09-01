const Recipe = require("../lib/models/recipes.model");

// GET /recipes - Obtener todas las recetas (soporta filtrado por ?categoria=dessert)
module.exports.list = async (req, res, next) => {
  try {
    const { categoria } = req.query;
    const criteria = {};

    if (categoria) {
      criteria.categoria = categoria;
    }

    const recipe = await Recipe.find(criteria);
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

// GET /recipes/:id - Obtener el detalle de una receta por su ID
module.exports.detail = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

// POST /recipes - Crear una nueva receta
module.exports.create = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

// PATCH/PUT /recipes/:id - Actualizar una receta
module.exports.update = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

// DELETE /recipes/:id - Eliminar una receta
module.exports.delete = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
