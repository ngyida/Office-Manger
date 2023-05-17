const db = require("./db");
const { ObjectId } = require("mongodb");

const getTutorialsCollection = () => {
  return db.get().collection("tutorials");
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
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