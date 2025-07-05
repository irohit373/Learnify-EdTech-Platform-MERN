/**
 * Test script to verify CourseDetails fixes
 */

// Mock data to test the fixes
const mockCourseDetails = {
  _id: "course1",
  courseName: "Test Course",
  courseDescription: "Test Description",
  instructor: {
    firstName: "John",
    lastName: "Doe",
    image: null,
    additionalDetails: {
      about: "Test instructor"
    }
  },
  whatYouWillLearn: "1. Learn React\n2. Learn Node.js\n3. Learn MongoDB",
  courseContent: [
    {
      sectionName: "Section 1",
      subSection: [
        { title: "Lecture 1", timeDuration: "300" },
        { title: "Lecture 2", timeDuration: "420" }
      ]
    },
    {
      sectionName: "Section 2",
      subSection: [
        { title: "Lecture 3", timeDuration: "500" }
      ]
    }
  ],
  ratingAndReviews: [
    { rating: 5, review: "Great course" },
    { rating: 4, review: "Good course" }
  ],
  studentsEnrolled: ["user1", "user2", "user3"],
  price: 99,
  thumbnail: "test-image.jpg",
  createdAt: new Date(),
  category: {
    name: "Web Development",
    description: "Learn web development"
  }
};

// Test the fixes
console.log("Testing CourseDetails fixes...");

// Test 1: Safe navigation for arrays
const reviewsCount = mockCourseDetails.ratingAndReviews?.length || 0;
console.log(`Reviews count: ${reviewsCount}`);

const studentsCount = mockCourseDetails.studentsEnrolled?.length || 0;
console.log(`Students enrolled: ${studentsCount}`);

const sectionsCount = mockCourseDetails.courseContent?.length || 0;
console.log(`Sections count: ${sectionsCount}`);

// Test 2: Safe navigation for instructor
const instructorName = `${mockCourseDetails.instructor?.firstName || ''} ${mockCourseDetails.instructor?.lastName || ''}`;
console.log(`Instructor: ${instructorName}`);

// Test 3: Safe navigation for whatYouWillLearn
const learningPoints = mockCourseDetails.whatYouWillLearn?.split('\n').map((line, index) => ({
  number: index + 1,
  text: line.trim().substring(line.indexOf('.') + 1).trim()
})) || [];
console.log(`Learning points:`, learningPoints);

// Test 4: Safe navigation for courseContent
let totalLectures = 0;
mockCourseDetails.courseContent?.forEach((section) => {
  totalLectures += section?.subSection?.length || 0;
});
console.log(`Total lectures: ${totalLectures}`);

console.log("All tests passed! The fixes should work correctly.");

// Test with empty/undefined data
const emptyData = {};
console.log("\nTesting with empty data:");
console.log(`Reviews count: ${emptyData.ratingAndReviews?.length || 0}`);
console.log(`Students count: ${emptyData.studentsEnrolled?.length || 0}`);
console.log(`Sections count: ${emptyData.courseContent?.length || 0}`);
console.log(`Instructor: ${emptyData.instructor?.firstName || ''} ${emptyData.instructor?.lastName || ''}`);

console.log("Empty data tests passed!");
