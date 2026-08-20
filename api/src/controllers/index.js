const { Router } = require("express");
const router = Router();
const glucose = require("./glucose.controller");
const user = require("./user.controller");

// Glucose CRUD
router.get("/glucose", glucose.list);
router.post("/glucose", glucose.create);
router.get("/glucose/:id", glucose.detail);
router.patch("glucose/:id", glucose.update);
router.delete("/glucose/:id", glucose.delete);

//User CRUD
router.post("/users", user.register);
router.get("/users/me", user.profile);

router.post("/sessions", user.login);
router.delete("/sessions", user.logout);


module.exports = router; 