const express = require("express");
const router = express.Router();
const tutorials = require("./controller.js");

// Create a new Tutorial
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve a Tutorial
router.get("/:id", tutorials.find)

// Update a Tutorial with id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Delete all Tutorial
router.delete("/", tutorials.deleteAll);

// Find by title
router.get("/title/:title", tutorials.findByTitle)

module.exports = router;