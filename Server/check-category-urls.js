// Helper script to check category name URL formatting
const categoryNames = [
  "Web Development",
  "Data Science", 
  "Mobile Development",
  "Cloud Computing",
  "Artificial Intelligence",
  "Python"
];

console.log("🔗 Category Name URL Formatting:");
console.log("=" * 50);

categoryNames.forEach(name => {
  const urlFormat = name.split(" ").join("-").toLowerCase();
  console.log(`"${name}" → /catalog/${urlFormat}`);
});

console.log("\n📝 To test catalog pages, use these URLs:");
categoryNames.forEach(name => {
  const urlFormat = name.split(" ").join("-").toLowerCase();
  console.log(`http://localhost:3000/catalog/${urlFormat}`);
});

console.log("\n💡 Example working URLs after running reset-and-create-data.js:");
console.log("- http://localhost:3000/catalog/web-development");
console.log("- http://localhost:3000/catalog/data-science");
console.log("- http://localhost:3000/catalog/python");
console.log("- http://localhost:3000/catalog/mobile-development");
console.log("- http://localhost:3000/catalog/cloud-computing");
console.log("- http://localhost:3000/catalog/artificial-intelligence");
