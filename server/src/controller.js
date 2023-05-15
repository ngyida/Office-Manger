const db = require("./db");
const { ObjectId } = require("mongodb");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const collection = db.get().collection("tutorials");
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published
  };
  collection.insertOne(tutorial)
    .then(result => {
        console.log(result);
        res.status(200).send(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error creating tutorial" });
    })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const collection = db.get().collection("tutorials");
  collection.find({}).toArray().
    then((arr) => {
        console.log(arr);
        res.send(arr);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Error retrieving tutorials" });
    })
};

exports.find = (req, res) => {
  const collection = db.get().collection("tutorials");
  collection.findOne({ _id: new ObjectId(req.params.id) })
  .then((tutorial) => {
    if (!tutorial) {
      return res.status(404).send({ message: "Tutorial not found" });
    }
    console.log(tutorial);
    res.send(tutorial);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ message: "Error retrieving tutorial" });
  })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    console.log("inside update")
  const collection = db.get().collection("tutorials");
  console.log("got collection successfully")
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  console.log(req)
  console.log(tutorial)
  collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: tutorial })
    .then(result => {
        console.log(result);
        res.status(200).send(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error creating tutorial" });
    })
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const collection = db.get().collection("tutorials");
  collection.deleteOne(
    { _id: new ObjectId(req.params.id) })
    .then(result => {
        console.log(result);
        res.status(200).send(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: "Error deleting tutorial" });
    })
};

// Delete all Tutorials from the database
exports.deleteAll = (req, res) => {
  const collection = db.get().collection("tutorials");
  collection.deleteMany({})
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: "Error deleting tutorials" });
    })
};