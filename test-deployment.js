#!/usr/bin/env node

// Test script for OfficeBanao Clone deployment
const https = require('https');

const BASE_URL = 'https://officebanao-clone.vercel.app';
const API_URL = `${BASE_URL}/api`;

console.log('🧪 Testing OfficeBanao Clone Deployment...\n');

// Test 1: Frontend accessibility
function testFrontend() {
  return new Promise((resolve) => {
    console.log('1. Testing Frontend...');
    https.get(BASE_URL, (res) => {
      if (res.statusCode === 200) {
        console.log('   ✅ Frontend is accessible');
        resolve(true);
      } else {
        console.log(`   ❌ Frontend returned status: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`   ❌ Frontend error: ${err.message}`);
      resolve(false);
    });
  });
}

// Test 2: API endpoint
function testAPI() {
  return new Promise((resolve) => {
    console.log('2. Testing API...');
    https.get(`${API_URL}/partners`, (res) => {
      if (res.statusCode === 200) {
        console.log('   ✅ API is accessible');
        resolve(true);
      } else {
        console.log(`   ❌ API returned status: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`   ❌ API error: ${err.message}`);
      resolve(false);
    });
  });
}

// Test 3: CORS headers
function testCORS() {
  return new Promise((resolve) => {
    console.log('3. Testing CORS...');
    const options = {
      hostname: 'officebanao-clone.vercel.app',
      path: '/api/partners',
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://officebanao-clone.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    };

    const req = https.request(options, (res) => {
      const corsHeader = res.headers['access-control-allow-origin'];
      if (corsHeader) {
        console.log('   ✅ CORS is configured');
        resolve(true);
      } else {
        console.log('   ❌ CORS headers missing');
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.log(`   ❌ CORS test error: ${err.message}`);
      resolve(false);
    });

    req.end();
  });
}

// Run all tests
async function runTests() {
  const results = await Promise.all([
    testFrontend(),
    testAPI(),
    testCORS()
  ]);

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Your deployment is working correctly.');
    console.log(`\n🌐 Your app is live at: ${BASE_URL}`);
    console.log(`🔗 API endpoint: ${API_URL}`);
  } else {
    console.log('⚠️  Some tests failed. Check the deployment configuration.');
  }
}

runTests();
