const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  _id: Object,
  campus: String,
  cohortName: String,
  cohortSlug: String,
  endDate: String,
  format: String,
  inProgress: Boolean,
  leadTeacher: String,
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  programManager: String,
  startDate: String,
  totalHours: Number
});


const Cohort = mongoose.model("Cohort", cohortSchema)


module.exports = Cohort