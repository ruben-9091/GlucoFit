const { Router } = require("express");
const router = Router();
const glucose = require("./glucose.controller");
const recipe = require("./recipes.controller")
const user = require("./user.controller");
const { auth } = require("../middlewares/auth.mid");

// Glucose CRUD
router.get("/glucose", auth, glucose.list);
router.post("/glucose", auth, glucose.create);
router.get("/glucose/:id", auth, glucose.detail);
router.patch("/glucose/:id", auth, glucose.update);
router.delete("/glucose/:id", auth, glucose.delete);

//User CRUD
router.post("/users", user.register);
router.get("/users/me", user.profile);

router.post("/sessions", user.login);
router.delete("/sessions", user.logout);

//recipes CRUD
router.get("/recipes", auth, recipe.list);
router.post("/recipes", auth, recipe.create);
router.get("/recipes/:id", auth, recipe.detail);
router.patch("/recipes/:id", auth, recipe.update);
router.delete("/recipes/:id", auth, recipe.delete);

module.exports = router;
