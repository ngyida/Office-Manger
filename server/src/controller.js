const { validationResult } = require('express-validator');
const db = require("./db");
const { ObjectId } = require("mongodb");

const PAGE_SIZE = 10; 
let collection = null;

const isInputValid = (req) => {
  let errors = validationResult(req).array();
  if (errors.length != 0) {
      return false;
  }
  return true;
}

exports.initCollection = async (collectionObj) => {
  collection = collectionObj;
}

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  if (!isInputValid(req)) {
    res.status(500).send({ message: "invalid input" });
    return;
  }

  try {
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published
    };
    const result = await collection.insertOne(tutorial)
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating tutorial" });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const tutorials = await collection.find({}).toArray()
    res.status(200).send(tutorials);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving tutorials: " + err });
  }
};

// Retrieve all Tutorials in the current page
exports.findPage = async (req, res) => {
  try {
    const pageNum = parseInt(req.params.pageNum);
    const offset = (pageNum - 1) * PAGE_SIZE;

    const tutorials = await collection.find({})
      .skip(offset)
      .limit(PAGE_SIZE)
      .toArray()
    const totalTutorials = await collection.countDocuments({});
    const totalPages = Math.ceil(totalTutorials / PAGE_SIZE);

    const response = {
      tutorials,
      totalPages,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving tutorials in the page" });
  }
}

// Find a tutorial by the id in the request
exports.find = async (req, res) => {
  try {
    const tutorial = await collection.findOne({ _id: new ObjectId(req.params.id) })
    if (!tutorial) {
      res.status(404).send({ message: "Tutorial not found" });
      return;
    }
    res.status(200).send(tutorial);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving tutorial" + err });
  }
};

// Find a tutorial by the title in the request
exports.findByTitle = async (req, res) => {
  try {
    const pageNum = parseInt(req.params.pageNum);
    const offset = (pageNum - 1) * PAGE_SIZE;
    console.log(req.params)
    const tutorials = await collection.find({ title: req.params.title })
      .skip(offset)
      .limit(PAGE_SIZE)
      .toArray();
    const totalTutorials = await collection.countDocuments({ title: req.params.title });
    const totalPages = Math.ceil(totalTutorials / PAGE_SIZE);

    const response = {
      tutorials,
      totalPages,
    };
    console.log(response)

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving tutorials by search" });
  }
}

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!isInputValid(req)) {
    res.status(500).send({ message: "invalid input" });
    return;
  }

  try {
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: tutorial });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error creating tutorial" + err });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send(result);
  } catch(err) {
    res.status(500).send({ message: "Error deleting tutorial" + err });
  }
};

// Delete all Tutorials from the database
exports.deleteAll = async (req, res) => {
  try {
    const result = await collection.deleteMany({})
    res.status(200).send(result);
  } catch(err) {
    res.status(500).send({ message: "Error deleting tutorials" + err });
  }
};