const mongoose = require('mongoose');
const Category = require('./Model/Category');
const Course = require('./Model/Course');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Learnify:Learnify@cluster0.tqvjpzb.mongodb.net/LearnifyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testPythonCategory() {
  try {
    console.log('Testing Python category...');
    
    // Test 1: Find all categories
    const allCategories = await Category.find({});
    console.log('All categories:', allCategories.map(cat => ({
      name: cat.name,
      id: cat._id,
      coursesCount: cat.courses?.length || 0
    })));
    
    // Test 2: Find Python category specifically
    const pythonCategory = await Category.findOne({ name: /python/i });
    console.log('Python category:', pythonCategory);
    
    // Test 3: Find courses in Python category
    if (pythonCategory) {
      const pythonCourses = await Course.find({ category: pythonCategory._id });
      console.log('Python courses:', pythonCourses.map(course => ({
        title: course.courseName,
        id: course._id
      })));
    }
    
    // Test 4: Test various name matching strategies
    const testNames = ['python', 'Python', 'PYTHON', 'python-programming'];
    for (const testName of testNames) {
      const matches = allCategories.filter(cat => {
        const hyphenated = cat.name.split(" ").join("-").toLowerCase();
        const direct = cat.name.toLowerCase();
        const noSpaces = cat.name.split(" ").join("").toLowerCase();
        
        return hyphenated === testName.toLowerCase() || 
               direct === testName.toLowerCase() || 
               noSpaces === testName.toLowerCase();
      });
      console.log(`Matches for "${testName}":`, matches.map(cat => cat.name));
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

testPythonCategory();
