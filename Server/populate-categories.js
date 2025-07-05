// Script to populate sample categories for the catalog dropdown
const mongoose = require("mongoose");
const Category = require("./Model/Category");
const dotenv = require("dotenv");

dotenv.config();

const sampleCategories = [
  {
    name: "Web Development",
    description: "Learn to build websites and web applications using modern technologies like HTML, CSS, JavaScript, React, Node.js, and more."
  },
  {
    name: "Data Science",
    description: "Master data analysis, machine learning, and statistical modeling using Python, R, and various data science tools."
  },
  {
    name: "Mobile Development",
    description: "Build mobile applications for iOS and Android using React Native, Flutter, Swift, and Kotlin."
  },
  {
    name: "Cloud Computing",
    description: "Learn cloud platforms like AWS, Azure, and Google Cloud for scalable application deployment."
  },
  {
    name: "Artificial Intelligence",
    description: "Explore AI concepts, machine learning algorithms, and neural networks."
  },
  {
    name: "Cybersecurity",
    description: "Learn to protect systems and networks from digital attacks and security threats."
  }
];

async function populateCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Check if categories already exist
    const existingCategories = await Category.find();
    console.log(`Found ${existingCategories.length} existing categories`);

    if (existingCategories.length === 0) {
      // Create sample categories
      for (const categoryData of sampleCategories) {
        const category = new Category(categoryData);
        await category.save();
        console.log(`Created category: ${category.name}`);
      }
      console.log("All sample categories created successfully!");
    } else {
      console.log("Categories already exist. Skipping creation.");
      console.log("Existing categories:", existingCategories.map(cat => cat.name));
    }

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");

  } catch (error) {
    console.error("Error populating categories:", error);
    process.exit(1);
  }
}

// Run the script
populateCategories();
