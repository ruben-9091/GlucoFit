const createHttpErrors = require("http-errors");
const Glucose = require("../lib/models/glucose.model");
const User = require("../lib/models/user.model");

module.exports.list = async (req, res, next) => {
  try {
    const glucose = await Glucose.find().populate("user");
    req.json(glucose);
  } catch (error) {
    console.error(error);
  }
};
