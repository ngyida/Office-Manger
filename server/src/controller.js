const { validationResult } = require('express-validator');
const db = require("./db");
const { ObjectId } = require("mongodb");

const getTutorialsCollection = () => {
  return db.get().collection("tutorials");
};

const isInputValid = (req) => {
  let errors = validationResult(req).array();
  if (errors.length != 0) {
      return false;
  }
  return true;
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!isInputValid(req)) {
    res.status(500).send({ message: "invalid input" });
    return;
  }

  const collection = getTutorialsCollection();
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published
  };
  collection.insertOne(tutorial)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error creating tutorial" });
    })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const collection = getTutorialsCollection();
  collection.find({}).toArray().
    then((arr) => {
        res.status(200).send(arr);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Error retrieving tutorials" });
    })
};

// Retrieve all Tutorials in the current page
exports.findPage = async (req, res) => {
  try {
    const collection = getTutorialsCollection();
    const pageNum = parseInt(req.params.pageNum);
    const pageSize = 10; // Define the number of tutorials per page
    const offset = (pageNum - 1) * pageSize;

    const tutorials = await collection.find({})
      .skip(offset)
      .limit(pageSize)
      .toArray()
    const totalTutorials = await collection.countDocuments({});
    const totalPages = Math.ceil(totalTutorials / pageSize);

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
exports.find = (req, res) => {
  const collection = getTutorialsCollection();
  collection.findOne({ _id: new ObjectId(req.params.id) })
  .then((tutorial) => {
    if (!tutorial) {
      return res.status(404).send({ message: "Tutorial not found" });
    }
    res.status(200).send(tutorial);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ message: "Error retrieving tutorial" });
  })
};

// Find a tutorial by the title in the request
exports.findByTitle = (req, res) => {
  const collection = getTutorialsCollection();
  collection.find({ title: req.params.title}).toArray().
  then((arr) => {
      res.status(200).send(arr);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error retrieving tutorials" });
  })
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!isInputValid(req)) {
    res.status(500).send({ message: "invalid input" });
    return;
  }
  const collection = getTutorialsCollection();
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: tutorial })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error creating tutorial" });
    })
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const collection = getTutorialsCollection();
  collection.deleteOne(
    { _id: new ObjectId(req.params.id) })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error deleting tutorial" });
    })
};

// Delete all Tutorials from the database
exports.deleteAll = (req, res) => {
  const collection = getTutorialsCollection();
  collection.deleteMany({})
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: "Error deleting tutorials" });
    })
};