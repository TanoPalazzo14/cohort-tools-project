const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  _id: Object,
  background: String,
  // cohort: {type: mongoose.Schema.Types.ObjectId, required: true},
  cohort: Object,
  email:String,
  firstName: String,
  image:String,
  languages: [String],
  lastName:String,
  linkedinUrl: String,
  phone:String,
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  projects: Array

  
});


const Student = mongoose.model("Student", studentSchema)


module.exports = Student