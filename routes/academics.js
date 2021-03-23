const express = require("express");
const router = express.Router();
const {
  getCourse,
  getProgram,
  createCourse,
  createProgram,
  editCourse,
  editProgram,
  deleteCourse,
  deleteProgram,
} = require("../db/academics");

router.get("/courses", async (req, res) => {
  let data = await getCourse();
  res.status(200).send(data);
});

router.get("/courses/:id", async (req, res) => {
  getCourse(req.params.id)
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res
        .status(401)
        .send(`Could not retrieve Course with id -> ${req.params.id}`);
    });
});

router.post("/courses/new", async (req, res) => {
  let data = req.body;
  createCourse(data)
    .then((newCourse) => res.status(201).send(newCourse))
    .catch((err) => res.status(401).send("Could not create new Course"));
});

router.put("/courses/:id", async (req, res) => {
  let data = req.body;
  editCourse(req.params.id, data)
    .then((editedInfo) => {
      res.status(200).send({ ...editedInfo._doc, ...data });
    })
    .catch((err) =>
      res.status(400).send(`Operation Failed on ${req.params.id}`)
    );
});

router.delete("/courses/:id", (req, res) => {
  deleteCourse(req.params.id)
    .then((deletedData) => {
      res.status(200).send(deletedData);
    })
    .catch((err) => {
      res.status(500).send("Could not delete data");
    });
});

router.get("/programs", async (req, res) => {
  let data = await getProgram();
  res.status(200).send(data);
});

router.get("/programs/:id", async (req, res) => {
  getProgram(req.params.id)
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res
        .status(401)
        .send(`Could not retrieve Program with id -> ${req.params.id}`);
    });
});

router.post("/programs", async (req, res) => {
  let data = req.body;
  createProgram(data)
    .then((newProgram) => res.status(201).send(newProgram))
    .catch((err) => res.status(401).send("Could not create new Program"));
});

router.put("/programs/:id", async (req, res) => {
  let data = req.body;
  editProgram(req.params.id, data)
    .then((editedInfo) => {
      res.status(200).send({ ...editedInfo._doc, ...data });
    })
    .catch((err) =>
      res.status(400).send(`Operation Failed on ${req.params.id}`)
    );
});

router.delete("/programs/:id", (req, res) => {
  deleteProgram(req.params.id)
    .then((deletedData) => {
      res.status(200).send(deletedData);
    })
    .catch((err) => {
      res.status(500).send("Could not delete data");
    });
});

router.get("/", async (req, res) => {
  let data = await getProgram();
  res.status(200).send(data);
});

module.exports = router;
