const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  parentDetails: String,
  blocked: { type: Boolean, default: false },
  nationality: String,
  stateOfOrigin: String,
  studyCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  extraCourses: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
  dateAdmitted: { type: Date, default: Date.now },
  attendanceCount: Number,
});
const Student = mongoose.model("Student", studentSchema);

function getStudentInfo(id) {
  if (id == null) {
    try {
      return Student.find().populate("studyCourse");
    } catch (error) {
      dbDebug("Failed to retrieve Student");
      return false;
    }
  } else {
    try {
      return Student.findById(id).populate("studyCourse");
    } catch (err) {
      dbDebug("Failed to retrieve Student");
      return false;
    }
  }
}

function createStudentInfo(data) {
  try {
    return Student.create(data);
  } catch (error) {
    dbDebug("Failed to create new Student Info!");
    return false;
  }
}

// function enrolStudent(studentId, programId) {
//   let operationReport = [];
//   if (typeof studentId == "object") {
//     studentId.forEach((student) => {
//       Student.findByIdAndUpdate(student, { studyCourse: programId })
//         .then((s) => operationReport.push(`${s.name} registered successfully!`))
//         .catch((err) => operationReport.push(false));
//     });
//     // console.log(operationReport);
//     return operationReport;
//   } else {
//     Student.findByIdAndUpdate(studentId, { studyCourse: programId })
//       .then((data) => {
//         console.log(data);
//         return true;
//       })
//       .catch(() => {
//         return false;
//       });
//   }
// }

async function enrolStudent(studentId, programId) {
  let operationReport = [];
  if (typeof studentId == "object") {
    studentId.forEach(async (student) => {
      let opResult = await Student.findByIdAndUpdate(student, {
        studyCourse: programId,
      });
      opResult ? operationReport.push(true) : operationReport.push(false);
    });
    return operationReport;
  } else {
    let data = await Student.findByIdAndUpdate(studentId, {
      studyCourse: programId,
    });

    if (!data) return false;
    return true;
  }
}

function addExtraCourse(studentId, courseId) {
  Student.findByIdAndUpdate(studentId, {
    extraCourses: [...extraCourses, courseId],
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function incrementAttendance(studentId) {
  if (typeof studentId == "object") {
    let accumulator = [];
    studentId.forEach(async (stud) => {
      let data = await Student.findByIdAndUpdate(
        stud,
        { $inc: { attendanceCount: 1 } },
        (err, res) => (err ? accumulator.push(false) : accumulator.push(true))
      );
    });
    return accumulator;
  } else {
    let data = await Student.findByIdAndUpdate(
      studentId,
      { $inc: { attendanceCount: 1 } },
      (err, res) => {
        if (err) return false;
        return true;
      }
    );
  }
}

function editStudentInfo(id, data) {
  try {
    return Student.findByIdAndUpdate(id, data);
  } catch (error) {
    dbDebug(`Error Editing Student with id: ${id} ===> $error.message`);
    return false;
  }
}

function deleteStudentInfo(id) {
  try {
    return Student.findByIdAndDelete(id);
  } catch (err) {
    dbDebug(`Error deleting student with id: ${id} ===> $err.message`);
    return false;
  }
}

module.exports = {
  getStudentInfo,
  createStudentInfo,
  editStudentInfo,
  deleteStudentInfo,
  enrolStudent,
  addExtraCourse,
  incrementAttendance,
};
