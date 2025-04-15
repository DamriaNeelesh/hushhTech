/**
 * This is a simple test script to verify the Reports API connection
 * Run with: node src/scripts/testReportsApi.js
 */

const API_BASE_URL = 'https://jspoprlahvtektkpbsbg.supabase.co/rest/v1';
// Updated API key
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcG9wcmxhaHZ0ZWt0a3Bic2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODk0MzUsImV4cCI6MjA1OTE2NTQzNX0.e5Wwi3hFzAjy4OjjNAQNYRBYPiiWyPZbCEFjMs7UVGo';

async function testApiConnection() {
  try {
    console.log('Testing API connection with updated key...');
    const response = await fetch(
      `${API_BASE_URL}/reports?select=*&limit=1`,
      {
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}` // Added both header formats for compatibility
        }
      }
    );
    
    console.log('Response status:', response.status);
    console.log('Response statusText:', response.statusText);
    
    if (!response.ok) {
      console.error(`API request failed with status ${response.status}: ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('Data received:', JSON.stringify(data, null, 2));
    console.log('API connection test successful!');
    
    // Test with different query to get total count
    console.log('\nTesting count of available reports...');
    const countResponse = await fetch(
      `${API_BASE_URL}/reports?select=id&order=date.desc`,
      {
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    
    if (countResponse.ok) {
      const countData = await countResponse.json();
      console.log(`Total available reports: ${countData.length}`);
    } else {
      console.error('Failed to get report count');
    }
  } catch (error) {
    console.error('Error testing API connection:', error);
  }
}

testApiConnection(); 