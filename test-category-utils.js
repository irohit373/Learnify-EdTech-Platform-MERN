// Test the category matching utility
import { matchCategoryFromURL, createCategoryURL } from '../src/Util/categoryUtils.js';

// Mock categories data
const mockCategories = [
  { _id: '1', name: 'Web Development' },
  { _id: '2', name: 'Data Science' },
  { _id: '3', name: 'Mobile Development' },
  { _id: '4', name: 'Cloud Computing' },
  { _id: '5', name: 'Artificial Intelligence' },
  { _id: '6', name: 'Python' }
];

// Test URL creation
console.log('Testing URL creation:');
mockCategories.forEach(cat => {
  console.log(`${cat.name} → /catalog/${createCategoryURL(cat.name)}`);
});

// Test URL matching
console.log('\nTesting URL matching:');
const testCases = [
  'python',
  'Python',
  'web-development',
  'Web Development',
  'data-science',
  'Data Science',
  'artificial-intelligence',
  'Artificial Intelligence',
  'mobile-development',
  'Mobile Development'
];

testCases.forEach(testCase => {
  const match = matchCategoryFromURL(testCase, mockCategories);
  console.log(`"${testCase}" → ${match ? match.name : 'NO MATCH'}`);
});

console.log('\nAll tests completed.');
