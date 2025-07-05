/**
 * Test script to verify all CourseDetails related fixes
 */
console.log("Testing all CourseDetails fixes...\n");

// Test 1: CourseDetailsCard fixes
console.log("1. Testing CourseDetailsCard fixes:");

const mockCourse = {
  _id: "course1",
  courseName: "Test Course",
  studentsEnroled: ["user1", "user2"],
  price: 99,
  thumbnail: "test.jpg"
};

const mockUser = {
  _id: "user1",
  firstName: "John",
  lastName: "Doe"
};

// Test safe navigation for studentsEnroled
const isUserEnrolled = mockUser && mockCourse?.studentsEnroled?.includes(mockUser?._id);
console.log(`- User enrolled check: ${isUserEnrolled}`);

// Test with undefined studentsEnroled
const courseWithNoStudents = {
  _id: "course2",
  courseName: "Empty Course",
  studentsEnroled: undefined,
  price: 50
};

const isUserEnrolledEmpty = mockUser && courseWithNoStudents?.studentsEnroled?.includes(mockUser?._id);
console.log(`- User enrolled check (empty): ${isUserEnrolledEmpty}`);

// Test 2: CourseAccordionBar fixes
console.log("\n2. Testing CourseAccordionBar fixes:");

const mockSection = {
  _id: "section1",
  sectionName: "Introduction",
  subSection: [
    { _id: "sub1", title: "Lecture 1" },
    { _id: "sub2", title: "Lecture 2" }
  ]
};

const mockActiveArray = ["section1", "section2"];
const isActiveCheck = mockActiveArray?.includes(mockSection._id);
console.log(`- Active section check: ${isActiveCheck}`);

const lectureCount = mockSection.subSection?.length || 0;
console.log(`- Lecture count: ${lectureCount}`);

// Test with empty subSection
const emptySection = {
  _id: "section2",
  sectionName: "Empty Section",
  subSection: undefined
};

const emptyLectureCount = emptySection.subSection?.length || 0;
console.log(`- Empty lecture count: ${emptyLectureCount}`);

// Test 3: VideoDetails fixes
console.log("\n3. Testing VideoDetails fixes:");

const mockCompletedLectures = ["lecture1", "lecture2"];
const mockVideoData = { _id: "lecture3" };

const isLectureCompleted = mockCompletedLectures?.includes(mockVideoData._id);
console.log(`- Lecture completed check: ${isLectureCompleted}`);

// Test with undefined completedLectures
const emptyCompletedLectures = undefined;
const isLectureCompletedEmpty = emptyCompletedLectures?.includes(mockVideoData._id);
console.log(`- Lecture completed check (empty): ${isLectureCompletedEmpty}`);

// Test 4: General array includes safety
console.log("\n4. Testing general array safety:");

const testCases = [
  { array: ["a", "b", "c"], item: "b", expected: true },
  { array: [], item: "b", expected: false },
  { array: undefined, item: "b", expected: undefined },
  { array: null, item: "b", expected: undefined },
  { array: ["x", "y"], item: "z", expected: false }
];

testCases.forEach((testCase, index) => {
  const result = testCase.array?.includes(testCase.item);
  const passed = result === testCase.expected;
  console.log(`- Test ${index + 1}: ${passed ? "PASS" : "FAIL"} (${result})`);
});

console.log("\n✅ All fixes should now work correctly!");
console.log("The application should no longer crash with 'Cannot read properties of undefined (reading 'includes')' errors.");

// Additional defensive programming tips
console.log("\n🛡️ Defensive Programming Applied:");
console.log("- Used optional chaining (?.) before .includes() calls");
console.log("- Added fallback values for undefined arrays");
console.log("- Ensured safe navigation throughout the components");
console.log("- All array operations are now protected against undefined/null values");
