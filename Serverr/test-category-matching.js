const mongoose = require('mongoose');
const Category = require('./Model/Category');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Learnify:Learnify@cluster0.tqvjpzb.mongodb.net/LearnifyDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

async function testCategoryMatching() {
  await connectDB();
  
  try {
    console.log('Testing category matching...\n');
    
    // Get all categories
    const categories = await Category.find({});
    console.log('All categories in database:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (ID: ${cat._id})`);
    });
    
    console.log('\nURL format testing:');
    
    const testCases = [
      'python',
      'Python',
      'web-development',
      'Web Development',
      'machine-learning',
      'Machine Learning',
      'data-science',
      'Data Science'
    ];
    
    testCases.forEach(testCase => {
      const matches = categories.filter(cat => {
        const direct = cat.name.toLowerCase() === testCase.toLowerCase();
        const hyphenated = cat.name.split(" ").join("-").toLowerCase() === testCase.toLowerCase();
        const noSpaces = cat.name.split(" ").join("").toLowerCase() === testCase.toLowerCase();
        const dehyphenated = cat.name.toLowerCase() === testCase.replace(/-/g, " ").toLowerCase();
        
        return direct || hyphenated || noSpaces || dehyphenated;
      });
      
      console.log(`"${testCase}" → ${matches.length > 0 ? matches[0].name : 'NO MATCH'}`);
    });
    
    console.log('\nRecommended URL formats:');
    categories.forEach(cat => {
      console.log(`${cat.name} → /catalog/${cat.name.toLowerCase()}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

testCategoryMatching();
