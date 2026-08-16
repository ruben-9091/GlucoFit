const createHttpErrors = require("http-errors");
const Glucose = require("../lib/models/glucose.model");
const User = require("../lib/models/user.model");

module.exports.list = async (req, res, next) => {
  try {
    const glucose = await Glucose.find().populate("user");
    res.status(200).json(glucose);
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
    const glucose = await Glucose.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      returnDocument: "after",
    });
    if (glucose) {
      res.status(200).json(glucose);
    } else {
      next(createHttpErrors(404, "Glucose info not found"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const glucose = await Glucose.findByIdAndDelete(id);
    if (glucose) {
      res.status(204).send();
    } else {
      next(createHttpErrors(404, "Glucose info not found"));
    }
  } catch (error) {
    next(error);
  }
};
