// Test script to check categories API
const axios = require('axios');

async function testCategoriesAPI() {
  try {
    console.log('Testing Categories API...');
    console.log('URL: http://localhost:4000/api/v1/course/showAllCategories');
    
    const response = await axios.get('http://localhost:4000/api/v1/course/showAllCategories');
    
    console.log('\n✅ API Response:');
    console.log('Status:', response.status);
    console.log('Success:', response.data.success);
    console.log('Data length:', response.data.data?.length || 0);
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n📚 Categories found:');
      response.data.data.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name} (ID: ${category._id})`);
        console.log(`   - Description: ${category.description}`);
        console.log(`   - Courses: ${category.courses?.length || 0}`);
      });
    } else {
      console.log('\n❌ No categories found in response');
    }
    
  } catch (error) {
    console.error('\n❌ API Error:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else if (error.request) {
      console.log('No response received. Is the server running?');
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run the test
testCategoriesAPI();
