// Script to reset and recreate categories and courses with proper linking
const mongoose = require("mongoose");
const Category = require("./Model/Category");
const Course = require("./Model/Course");
const User = require("./Model/User");
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
    name: "Python",
    description: "Master Python programming for web development, data science, automation, and more."
  }
];

async function resetAndCreateData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing data...");
    await Course.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing courses and categories");

    // Create categories
    console.log("Creating categories...");
    const createdCategories = [];
    for (const categoryData of sampleCategories) {
      const category = new Category(categoryData);
      await category.save();
      createdCategories.push(category);
      console.log(`Created category: ${category.name}`);
    }

    // Create a sample instructor user if none exists
    let instructor = await User.findOne({ accountType: "Instructor" });
    if (!instructor) {
      instructor = new User({
        firstName: "John",
        lastName: "Doe",
        email: "instructor@example.com",
        password: "hashedpassword",
        accountType: "Instructor",
        profile: null,
        courses: [],
        image: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe",
        token: null,
        resetPasswordExpires: null
      });
      await instructor.save();
      console.log("Created sample instructor");
    }

    // Sample courses data
    const sampleCourses = [
      {
        courseName: "Complete Web Development Bootcamp",
        courseDescription: "Learn web development from scratch including HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
        instructor: instructor._id,
        whatYouWillLearn: "Build responsive websites, Create dynamic web applications, Master modern frameworks, Deploy applications to the cloud",
        price: 4999,
        thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=200&fit=crop",
        tag: ["Web Development", "JavaScript", "React", "Node.js"],
        category: createdCategories.find(cat => cat.name === "Web Development")._id,
        studentsEnrolled: [],
        instructions: ["Basic computer knowledge", "No prior programming experience needed", "Dedicated time for practice"],
        status: "Published",
        courseContent: [],
        ratingAndReviews: []
      },
      {
        courseName: "Python Data Science Masterclass",
        courseDescription: "Master data science with Python. Learn pandas, numpy, matplotlib, seaborn, and scikit-learn. Work on real datasets and build machine learning models.",
        instructor: instructor._id,
        whatYouWillLearn: "Data analysis with Python, Machine learning algorithms, Data visualization, Statistical analysis",
        price: 5999,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
        tag: ["Data Science", "Python", "Machine Learning", "Analytics"],
        category: createdCategories.find(cat => cat.name === "Data Science")._id,
        studentsEnrolled: [],
        instructions: ["Basic Python knowledge helpful", "Mathematics background preferred", "Jupyter notebook setup"],
        status: "Published",
        courseContent: [],
        ratingAndReviews: []
      },
      {
        courseName: "Python Programming for Beginners",
        courseDescription: "Learn Python from scratch. Master variables, functions, loops, data structures, OOP, and build real projects.",
        instructor: instructor._id,
        whatYouWillLearn: "Python fundamentals, Object-oriented programming, File handling, Web scraping, GUI development",
        price: 3999,
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
        tag: ["Python", "Programming", "Beginner", "Fundamentals"],
        category: createdCategories.find(cat => cat.name === "Python")._id,
        studentsEnrolled: [],
        instructions: ["No prior programming experience needed", "Computer with Python installed", "Dedication to practice"],
        status: "Published",
        courseContent: [],
        ratingAndReviews: []
      },
      {
        courseName: "React Native Mobile Development",
        courseDescription: "Build cross-platform mobile apps with React Native. Learn navigation, state management, API integration, and app deployment to Play Store and App Store.",
        instructor: instructor._id,
        whatYouWillLearn: "Mobile app development, Cross-platform deployment, Native device features, App store submission",
        price: 6999,
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
        tag: ["Mobile Development", "React Native", "JavaScript", "iOS", "Android"],
        category: createdCategories.find(cat => cat.name === "Mobile Development")._id,
        studentsEnrolled: [],
        instructions: ["JavaScript knowledge required", "React experience helpful", "Mobile development environment setup"],
        status: "Published",
        courseContent: [],
        ratingAndReviews: []
      },
      {
        courseName: "AWS Cloud Computing Fundamentals",
        courseDescription: "Learn cloud computing with Amazon Web Services. Master EC2, S3, Lambda, RDS, and other core AWS services. Prepare for AWS certification.",
        instructor: instructor._id,
        whatYouWillLearn: "Cloud architecture, AWS services, Serverless computing, Cloud security, Cost optimization",
        price: 7999,
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
        tag: ["Cloud Computing", "AWS", "DevOps", "Infrastructure"],
        category: createdCategories.find(cat => cat.name === "Cloud Computing")._id,
        studentsEnrolled: [],
        instructions: ["Basic IT knowledge", "Understanding of networking concepts", "AWS account for practice"],
        status: "Published",
        courseContent: [],
        ratingAndReviews: []
      }
    ];

    // Create courses and link them to categories
    console.log("Creating courses...");
    for (const courseData of sampleCourses) {
      const course = new Course(courseData);
      await course.save();
      console.log(`Created course: ${course.courseName}`);
      
      // Add course to the category's courses array
      await Category.findByIdAndUpdate(
        courseData.category,
        { $push: { courses: course._id } },
        { new: true }
      );
      console.log(`Linked course to category: ${createdCategories.find(cat => cat._id.equals(courseData.category)).name}`);
    }

    console.log("\n✅ All data created successfully!");
    console.log(`📚 Created ${createdCategories.length} categories`);
    console.log(`📖 Created ${sampleCourses.length} courses`);
    console.log("🔗 All courses properly linked to categories");
    
    await mongoose.connection.close();
    console.log("Database connection closed");

  } catch (error) {
    console.error("Error resetting and creating data:", error);
    process.exit(1);
  }
}

// Run the script
resetAndCreateData();
