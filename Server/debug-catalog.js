// Debug script to check categories and their linked courses
const mongoose = require("mongoose");
const Category = require("./Model/Category");
const Course = require("./Model/Course");
const dotenv = require("dotenv");

dotenv.config();

async function debugCatalog() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Check categories
    console.log("\n📚 CATEGORIES IN DATABASE:");
    console.log("=" * 50);
    
    const allCategories = await Category.find().populate("courses");
    
    if (allCategories.length === 0) {
      console.log("❌ No categories found in database");
    } else {
      allCategories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name} (ID: ${category._id})`);
        console.log(`   Description: ${category.description}`);
        console.log(`   Linked Courses: ${category.courses.length}`);
        if (category.courses.length > 0) {
          category.courses.forEach((course, courseIndex) => {
            console.log(`     ${courseIndex + 1}. ${course.courseName} (Status: ${course.status})`);
          });
        }
        console.log("");
      });
    }

    // Check courses
    console.log("\n📖 COURSES IN DATABASE:");
    console.log("=" * 50);
    
    const allCourses = await Course.find().populate("category");
    
    if (allCourses.length === 0) {
      console.log("❌ No courses found in database");
    } else {
      allCourses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.courseName} (ID: ${course._id})`);
        console.log(`   Status: ${course.status}`);
        console.log(`   Category: ${course.category?.name || 'No category'} (ID: ${course.category?._id || 'N/A'})`);
        console.log(`   Price: ₹${course.price}`);
        console.log("");
      });
    }

    // Test the showAllCategories API logic
    console.log("\n🔍 TESTING SHOWALLCATEGORIES API LOGIC:");
    console.log("=" * 50);
    
    const categoriesWithCourses = allCategories.filter(category => 
      category.courses.some(course => course.status === "Published")
    );
    
    console.log(`Total categories: ${allCategories.length}`);
    console.log(`Categories with published courses: ${categoriesWithCourses.length}`);
    
    categoriesWithCourses.forEach(category => {
      const publishedCourses = category.courses.filter(course => course.status === "Published");
      console.log(`- ${category.name}: ${publishedCourses.length} published courses`);
    });

    // Summary
    console.log("\n📊 SUMMARY:");
    console.log("=" * 50);
    console.log(`✅ Total Categories: ${allCategories.length}`);
    console.log(`✅ Total Courses: ${allCourses.length}`);
    console.log(`✅ Published Courses: ${allCourses.filter(c => c.status === "Published").length}`);
    console.log(`✅ Categories with Courses: ${categoriesWithCourses.length}`);
    
    if (categoriesWithCourses.length === 0) {
      console.log("\n❌ ISSUE FOUND: No categories have linked courses!");
      console.log("💡 SOLUTION: Run 'node reset-and-create-data.js' to fix this");
    } else if (categoriesWithCourses.length < allCategories.length) {
      console.log("\n⚠️  PARTIAL ISSUE: Some categories don't have linked courses");
      console.log("💡 SOLUTION: Run 'node reset-and-create-data.js' to ensure all categories have courses");
    } else {
      console.log("\n✅ ALL GOOD: Categories and courses are properly linked!");
    }

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");

  } catch (error) {
    console.error("Error debugging catalog:", error);
    process.exit(1);
  }
}

// Run the script
debugCatalog();
