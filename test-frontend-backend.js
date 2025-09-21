// Test script to verify frontend-backend integration
const testIntegration = async () => {
  console.log('🧪 Testing Frontend-Backend Integration...\n');
  
  const testCases = [
    "I'm feeling anxious about my job interview tomorrow",
    "I had a fight with my best friend and I don't know what to do",
    "I'm feeling overwhelmed with all my responsibilities",
    "I'm having trouble sleeping because of stress"
  ];
  
  for (let i = 0; i < testCases.length; i++) {
    const testMessage = testCases[i];
    console.log(`📝 Test ${i + 1}: "${testMessage}"`);
    
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: testMessage,
          conversationHistory: ''
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Response: ${data.response.substring(0, 100)}...`);
        console.log(`⏰ Timestamp: ${data.timestamp}\n`);
      } else {
        console.log(`❌ Error: ${data.error}\n`);
      }
    } catch (error) {
      console.log(`❌ Network Error: ${error.message}\n`);
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 Integration test completed!');
};

// Run the test
testIntegration().catch(console.error);
