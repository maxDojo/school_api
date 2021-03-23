const express = require("express");
const router = express.Router();
const {
  getStudentInfo,
  createStudentInfo,
  editStudentInfo,
  deleteStudentInfo,
  enrolStudent,
  incrementAttendance,
} = require("../db/student");
const { response } = require("express");

router.get("/", async (req, res) => {
  let data = await getStudentInfo();
  res.status(200).send(data);
});

router.get("/:id", async (req, res) => {
  getStudentInfo(req.params.id)
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res
        .status(401)
        .send(`Could not retrieve student with id -> ${req.params.id}`);
    });
});

router.post("/new", async (req, res) => {
  let data = req.body;
  createStudentInfo(data)
    .then((newStudent) => res.status(201).send(newStudent))
    .catch((err) => res.status(401).send("Could not create new Student"));
});

router.put("/enrol", async (req, res) => {
  let data = req.body;
  console.log(data);
  let feedback = await enrolStudent(data.studentId, data.programId);
  /* Bug at this location... execution progresses without awaiting data from the called database function */
  console.log(feedback);
  !feedback
    ? res.status(400).send("Operation Failed, no timely Feedback!")
    : typeof feedback == "object"
    ? feedback.forEach((d) =>
        d == 0
          ? res.status(201).send("Some students could not be enrolled!")
          : ""
      )
    : feedback == true
    ? res.status(200).send("Operation Successful!")
    : res.status(400).send("Failed to enrol student!");
});

router.put("/:id", async (req, res) => {
  let data = req.body;
  editStudentInfo(req.params.id, data)
    .then((editedInfo) => {
      res.status(200).send({ ...editedInfo._doc, ...data });
    })
    .catch((err) =>
      res.status(400).send(`Operation Failed on ${req.params.id}`)
    );
});

router.delete("/:id", (req, res) => {
  deleteStudentInfo(req.params.id)
    .then((deletedData) => {
      res.status(200).send(deletedData);
    })
    .catch((err) => {
      res.status(500).send("Could not delete data");
    });
});

router.put("/attendance", (req, res) => {
  incrementAttendance(req.body.students).then((results) =>
    results.forEach((result) =>
      result == false ? res.status(500).send("Completed with errors!") : ""
    )
  );
  res.status(200).send("Attendance Recorded");
});

module.exports = router;
