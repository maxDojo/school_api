const mongoose = require("mongoose");
const dbDebug = require("debug")("db");

// CONNECT TO THE DATABASE...
// mongoose.connect('mongodb://localhost/school_admin', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
//   if(err) dbDebug('Connection to mongoDB database FAILED!!')
//   else dbDebug('Connected successfully to mongoDB database!')
// })

mongoose
  .connect("mongodb://localhost/school_admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully to database!"))
  .catch(() => console.log("failed to connect to db"));
