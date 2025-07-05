const express = require('express');
const mongoose = require('mongoose');
const Category = require('./Model/Category');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Learnify:Learnify@cluster0.tqvjpzb.mongodb.net/LearnifyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test route
app.get('/test-categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories.map(cat => ({
        id: cat._id,
        name: cat.name,
        description: cat.description,
        coursesCount: cat.courses?.length || 0
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// Test category matching
app.get('/test-match/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const categories = await Category.find({});
    
    const matches = categories.filter(cat => {
      const direct = cat.name.toLowerCase() === categoryName.toLowerCase();
      const hyphenated = cat.name.split(" ").join("-").toLowerCase() === categoryName.toLowerCase();
      const noSpaces = cat.name.split(" ").join("").toLowerCase() === categoryName.toLowerCase();
      const dehyphenated = cat.name.toLowerCase() === categoryName.replace(/-/g, " ").toLowerCase();
      
      return direct || hyphenated || noSpaces || dehyphenated;
    });
    
    res.json({
      success: true,
      searchTerm: categoryName,
      matches: matches.map(cat => ({
        id: cat._id,
        name: cat.name
      })),
      allCategories: categories.map(cat => cat.name)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error matching categories',
      error: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test categories: http://localhost:${PORT}/test-categories`);
  console.log(`Test matching: http://localhost:${PORT}/test-match/python`);
});
