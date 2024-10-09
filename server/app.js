const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 5010;
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173'],
  })
);

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose
.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to MongoDB", err));



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//---------------------------- STUDENTS

app.get("/api/students", (req,res) => {
  Student.find({})
  .populate("cohort")
  .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students)
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    })
})

//crear Student

app.post("/api/students", async (req, res)=>{
  try {

    await Student.create({
      background: req.body.background,
      cohort: req.body.cohort,
      email: req.body.email,
      firstName: req.body.firstName,
      image: req.body.image,
      languages: req.body.languages,
      lastName: req.body.lastName,
      linkedinUrl: req.body.linkedinUrl,
      phone: req.body.phone,
      projects:req.body.projects,
      program: req.body.program,
    })
    console.log(req.body)
    res.status(201).json({message:"Student created successfully"})
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
})

//Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req,res)=>{
  try {
    const response = await Student.find({cohort: req.params.cohortId})
    .populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students from a cohort" });
    
  }
})

//Retrieves a specific student by id
app.get("/api/students/:studentId", async (req, res)=>{
  try {
    const response = await Student.findById(req.params.studentId)
    .populate("cohort")
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve student by ID" });
  }
})

//Create a student , Updates a specific student by id


app.put("/api/students/:studentId", async (req, res)=>{
  try {

    const response = await Student.findByIdAndUpdate(req.params.studentId,{
      background: req.body.background,
      cohort: req.body.cohort,
      email: req.body.email,
      firstName: req.body.firstName,
      image: req.body.image,
      languages: req.body.languages,
      lastName: req.body.lastName,
      linkedinUrl: req.body.linkedinUrl,
      phone: req.body.phone,
      projects:req.body.projects,
      program: req.body.program,
    },{new:true})
    // console.log(req.body)
    res.status(201).json({response,message:"Student changed successfully"})
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
})

//Deletes a specific student by id

app.delete("/api/students/:studentId",async (req,res)=>{
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.status(204).json({message:"Student deleted successfully"})
  
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
    
  }
})


//-----------COHORTS
// Creates a new cohort


app.post("/api/cohorts", async (req, res)=>{
  try {

    await Cohort.create({
      campus: req.body.campus,
      cohortName: req.body.cohortName,
      cohortSlug: req.body.cohortSlug,
      endDate: req.body.endDate,
      format: req.body.format,
      inProgress: req.body.inProgress,
      leadTeacher: req.body.leadTeacher,
      program: req.body.program,
      programManager: req.body.programManager,
      startDate: req.body.startDate,
      totalHours: req.body.totalHours
      
    })
    console.log(req.body)
    res.status(201).json({message:"Cohort created successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Failed to create Cohort" });
  }
})



//Retrieves all of the cohorts in the database collection
app.get("/api/cohorts", (req,res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts)
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    })
})

//Retrieves a specific cohort by id

app.get("/api/cohorts/:cohortId", async (req, res)=>{
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to retrieve Cohort by ID" });
  }
})


// Updates a specific cohort by id
app.put("/api/cohorts/:cohortId", async (req, res)=>{
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId,{
      campus: req.body.campus,
      cohortName: req.body.cohortName,
      cohortSlug: req.body.cohortSlug,
      endDate: req.body.endDate,
      format: req.body.format,
      inProgress: req.body.inProgress,
      leadTeacher: req.body.leadTeacher,
      program: req.body.program,
      programManager: req.body.programManager,
      startDate: req.body.startDate,
      totalHours: req.body.totalHours
    },{new:true})
    // console.log(req.body)
    res.status(201).json({message:"Cohort changed successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to update cohort" });
  }
})



// Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortId",async (req,res)=>{
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.status(204).json({message:"Cohort deleted successfully"})
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to delete cohort" });
    
  }
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});