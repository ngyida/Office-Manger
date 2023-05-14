const db = require("./db");
const { ObjectId } = require("mongodb");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const collection = db.get().collection("tutorials");
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  collection.insertOne(tutorial, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error creating tutorial" });
    } else {
      res.send(result.ops[0]);
    }
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const collection = db.get().collection("tutorials");
  collection.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error retrieving tutorials" });
    } else {
      res.send(data);
    }
  });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const collection = db.get().collection("tutorials");
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: tutorial },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating tutorial" });
      } else if (result.modifiedCount === 0) {
        res.status(404).send({ message: "Tutorial not found" });
      } else {
        res.send({ message: "Tutorial updated successfully" });
      }
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const collection = db.get().collection("tutorials");
  collection.deleteOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting tutorial" });
    } else if (result.deletedCount === 0) {
      res.status(404).send({ message: "Tutorial not found" });
    } else {
      res.send({ message: "Tutorial deleted successfully" });
    }
  });
};

