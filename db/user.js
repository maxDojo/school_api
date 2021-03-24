const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// create user schema
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
});
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, "jwt-privateKey");
};

// create model
const User = mongoose.model("User", userSchema);

// crud user
function createUser(data) {
  try {
    return User.create(data);
  } catch (error) {
    dbDebug("Failed to create new User!");
    return false;
  }
}

function getUser(id) {
  if (id == null) {
    try {
      return User.find();
    } catch (error) {
      console.log("Failed to fetch user!");
      dbDebug("Failed to fetch User");
      return false;
    }
  } else {
    try {
      return User.findById(id);
    } catch (err) {
      console.log("Failed to fetch user!");
      dbDebug("Failed to fetch User");
      return false;
    }
  }
}

function editUser(id, data) {
  try {
    return User.findByIdAndUpdate(id, data);
  } catch (error) {
    dbDebug(`Error Editing User with id: ${id} ===> ${error.message}`);
    return false;
  }
}

function deleteUser(id) {
  try {
    return User.findByIdAndDelete(id);
  } catch (err) {
    dbDebug(`Error deleting user with id: ${id} ===> $err.message`);
    return false;
  }
}

// other helper functions
function findByEmail(email) {
  try {
    return User.findOne({ email: email });
  } catch (err) {
    dbDebug(`No user found`);
    return false;
  }
}

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
  findByEmail,
};
