const createHttpErrors = require("http-errors");
const Glucose = require("../lib/models/glucose.model");
const User = require("../lib/models/user.model");

module.exports.list = async (req, res, next) => {
  try {
    const glucose = await Glucose.find({ user: req.user.id }).populate("user");
    res.status(200).json(glucose);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const glucose = await Glucose.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(glucose);
  } catch (error) {
    next(error);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const glucose = await Glucose.findById(id).populate("user");
    if (glucose) {
      res.status(200).json(glucose);
    } else {
      next(createHttpErrors(404, "Glucose info not found"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const glucose = await Glucose.findById(id);

    if (!glucose) {
      return next(createHttpErrors(404, "Glucose info not found"));
    }

    if (glucose.user.toString() !== req.user.id) {
      return next(createHttpErrors(403, "No tienes permiso para editar este registro"));
    }

    const updated = await Glucose.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      returnDocument: "after",
    }).populate("user");

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const glucose = await Glucose.findById(id);

    if (!glucose) {
      return next(createHttpErrors(404, "Glucose info not found"));
    }

    if (glucose.user.toString() !== req.user.id) {
      return next(createHttpErrors(403, "No tienes permiso para borrar este registro"));
    }

    await Glucose.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};