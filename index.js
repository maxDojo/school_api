// import configurations, express and default debugger
require("./dbConfig");
const config = require("config");
const mainDebug = require("debug")("default");
const express = require("express");
const app = express();

// IMPORT ADDITIONAL PACKAGES
// const winston = require("winston");

// startup modules
require("./startup/prod")(app);

// import routes
const student = require("./routes/student");
const academics = require("./routes/academics");

// MIDDLEWARE
// app.use(cors());
app.use(express.json()); //json parser

// APPLY CONDITIONAL MIDDLEWARE

// APPLY LOCAL MIDDLEWARE
app.use("/student", student);
app.use("/academics", academics);
// app.use("/admin", admin);
// app.use("/mgt", mgt);

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

const port = process.env.PORT || 2000;

app.listen(port, console.log(`Server Running on port ${port}...`));
