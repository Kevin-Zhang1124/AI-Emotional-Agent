// Simple test script for the chat API
// Run with: node test-api.js

const testMessage = {
  message: "I'm feeling really anxious about my job interview tomorrow",
  conversationHistory: ""
};

async function testAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API Response:', data.response);
    } else {
      console.log('❌ API Error:', data.error);
    }
  } catch (error) {
    console.log('❌ Network Error:', error.message);
  }
}

testAPI();
