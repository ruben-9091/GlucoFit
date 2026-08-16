const { Router } = require("express"); 
const router = Router(); 
const glucose = require("./glucose.controller"); 

// Glucose CRUD
router.get("/glucose", glucose.list); 
router.post("/glucose", glucose.create); 
router.get("/glucose/:id", glucose.detail); 
router.patch("glucose/:id", glucose.update); 
router.delete("/glucose/:id", glucose.delete); 