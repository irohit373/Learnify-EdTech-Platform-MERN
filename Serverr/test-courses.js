// Test script to check getAllCourses API
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route to check if getAllCourses API is working
app.get("/test-courses", async (req, res) => {
  try {
    const Course = require("./Model/Course");
    const mongoose = require("mongoose");
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    
    // Fetch all published courses
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    ).populate("instructor").exec();
    
    console.log(`Found ${allCourses.length} published courses`);
    
    res.json({
      success: true,
      data: allCourses,
      count: allCourses.length
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message
    });
  }
});

// Test route to check course model
app.get("/test-model", async (req, res) => {
  try {
    const Course = require("./Model/Course");
    const mongoose = require("mongoose");
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    
    // Get all courses (including draft)
    const allCourses = await Course.find({});
    console.log(`Found ${allCourses.length} total courses`);
    
    // Check for published courses
    const publishedCourses = await Course.find({ status: "Published" });
    console.log(`Found ${publishedCourses.length} published courses`);
    
    res.json({
      success: true,
      totalCourses: allCourses.length,
      publishedCourses: publishedCourses.length,
      sampleCourse: allCourses[0] || null
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking model",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test courses API: http://localhost:${PORT}/test-courses`);
  console.log(`Test model API: http://localhost:${PORT}/test-model`);
});
