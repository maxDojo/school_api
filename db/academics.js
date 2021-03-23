const mongoose = require("mongoose");

// Model Schemas
const courseSchema = new mongoose.Schema({
  title: String,
  code: { type: String, unique: true },
  description: String,
  outline: [String],
  weight: Number,
  notes: String,
});

const programSchema = new mongoose.Schema({
  title: String,
  code: { type: String, unique: true },
  description: String,
  requiredCourses: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
  duration: Number,
});
const Course = mongoose.model("Course", courseSchema);
const Program = mongoose.model("Program", programSchema);

// Define DB Functions
function createCourse(data) {
  try {
    return Course.create(data);
  } catch (error) {
    dbDebug("Failed to create new Course");
    return false;
  }
}

function getCourse(id) {
  if (id == null) {
    try {
      return Course.find();
    } catch (error) {
      dbDebug("Failed to retrieve Course");
      return false;
    }
  } else {
    try {
      return Course.findById(id);
    } catch (err) {
      dbDebug("Failed to retrieve Course");
      return false;
    }
  }
}

function editCourse(id, data) {
  try {
    return Course.findByIdAndUpdate(id, data);
  } catch (error) {
    dbDebug(`Error Editing Course with id: ${id} ===> $error.message`);
    return false;
  }
}

function deleteCourse(id) {
  try {
    return Course.findByIdAndDelete(id);
  } catch (err) {
    dbDebug(`Error deleting Course with id: ${id} ===> $err.message`);
    return false;
  }
}

function getProgram(id) {
  if (id == null) {
    try {
      return Program.find();
    } catch (error) {
      dbDebug("Failed to retrieve Program");
      return false;
    }
  } else {
    try {
      return Program.findById(id);
    } catch (err) {
      dbDebug("Failed to retrieve Program");
      return false;
    }
  }
}

function createProgram(data) {
  try {
    return Program.create(data);
  } catch (error) {
    dbDebug("Failed to create new Program Info!");
    return false;
  }
}

function editProgram(id, data) {
  try {
    return Program.findByIdAndUpdate(id, data);
  } catch (error) {
    dbDebug(`Error Editing Program with id: ${id} ===> $error.message`);
    return false;
  }
}

function deleteProgram(id) {
  try {
    return Program.findByIdAndDelete(id);
  } catch (err) {
    dbDebug(`Error deleting Program with id: ${id} ===> $err.message`);
    return false;
  }
}

module.exports = {
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
  createProgram,
  getProgram,
  editProgram,
  deleteProgram,
};
