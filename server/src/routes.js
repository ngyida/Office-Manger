const express = require("express");
const router = express.Router();
const tutorials = require("./controller.js");
const { tutorialInputValidation } = require('./validations.js');

// Create a new Tutorial
router.post("/", tutorialInputValidation, tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve all Tutorials in a page
router.get("/page/:pageNum", tutorials.findPage);

// Retrieve a Tutorial
router.get("/:id", tutorials.find)

// Update a Tutorial with id
router.put("/:id", tutorialInputValidation,tutorials.update);

// Delete all Tutorial
router.delete("/", tutorials.deleteAll);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Find by title
router.get("/title/:title", tutorials.findByTitle)

module.exports = router;