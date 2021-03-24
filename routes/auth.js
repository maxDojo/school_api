const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.use(express.json());

const {
  getUser,
  createUser,
  deleteUser,
  editUser,
  findByEmail,
} = require("../db/user");

// Register Route
router.post("/register", async (req, res) => {
  // return;
  let data = req.body;
  createUser(data)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) =>
      res.status(401).send(`Could not create new User ${err.message}`)
    );
});

// Login Route
router.post("/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  let user = await findByEmail(email);
  !user && res.status(401).send("Incorrect Credentials");
  let token = await user.generateToken();
  !token
    ? res.status(500).send("Failed to generate authentication token")
    : res.header("x-authToken", token).status(201).send(user);
});

router.get("/:id", async (req, res) => {
  getUser(req.params.id)
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(401).send(`Could not fetch user with id -> ${req.params.id}`);
    });
});

router.put("/:id", async (req, res) => {
  let data = req.body;
  editUser(req.params.id, data)
    .then((editedInfo) => {
      res.status(200).send({ ...editedInfo._doc, ...data });
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Operation Failed on ${req.params.id}: ${err.message}`)
    );
});

router.delete("/:id", (req, res) => {
  deleteUser(req.params.id)
    .then((deletedData) => {
      res.status(200).send(deletedData);
    })
    .catch((err) => {
      res.status(500).send(`Failed to delete!: ${err.message}`);
    });
});

router.get("/", auth, async (req, res) => {
  let data = await getUser();
  res.status(200).send(data);
});

module.exports = router;
