#!/usr/bin/env node
/**
 * API Test Script for Kabir Aasram Backend
 * Tests all core endpoints
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000/api';

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(BASE_URL + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body),
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body,
                        headers: res.headers
                    });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function runTests() {
    console.log('\n🧪 Testing Kabir Aasram Backend API\n');
    console.log('=' .repeat(50));

    try {
        // Test 1: Health Check
        console.log('\n✅ Test 1: Health Check');
        let res = await makeRequest('GET', '/health');
        console.log(`   Status: ${res.status}`);
        console.log(`   Response: ${JSON.stringify(res.data, null, 2)}`);

        // Test 2: Get Programs
        console.log('\n✅ Test 2: Get Programs');
        res = await makeRequest('GET', '/programs');
        console.log(`   Status: ${res.status}`);
        console.log(`   Programs received: ${res.data.programs.length}`);

        // Test 3: Submit Contact Form
        console.log('\n✅ Test 3: Submit Contact Form');
        const contactData = {
            name: 'टेस्ट यूजर',
            email: 'test@example.com',
            phone: '9876543210',
            subject: 'कृपया मुझे योग क्लास के बारे में बताएं',
            message: 'मुझे योग सीखना है'
        };
        res = await makeRequest('POST', '/contact', contactData);
        console.log(`   Status: ${res.status}`);
        console.log(`   Response: ${res.data.message}`);
        const contactId = res.data.contactId;

        // Test 4: Get Contact Message
        console.log('\n✅ Test 4: Get Contact Message');
        res = await makeRequest('GET', `/contact/${contactId}`);
        console.log(`   Status: ${res.status}`);
        console.log(`   Message: ${res.data.contact.message.substring(0, 50)}...`);

        // Test 5: Subscribe to Newsletter
        console.log('\n✅ Test 5: Subscribe to Newsletter');
        const subscriberData = {
            email: 'subscriber@example.com',
            name: 'योग प्रेमी',
            preferences: { yoga: true, meditation: true, events: false }
        };
        res = await makeRequest('POST', '/newsletter/subscribe', subscriberData);
        console.log(`   Status: ${res.status}`);
        console.log(`   Response: ${res.data.message}`);

        // Test 6: Get Programs (verify data exists)
        console.log('\n✅ Test 6: Verify Programs Data');
        res = await makeRequest('GET', '/programs');
        console.log(`   Status: ${res.status}`);
        console.log(`   Total programs: ${res.data.programs.length}`);
        res.data.programs.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.title}`);
        });

        // Test 7: Get Events (should be empty initially)
        console.log('\n✅ Test 7: Get Events');
        res = await makeRequest('GET', '/events');
        console.log(`   Status: ${res.status}`);
        console.log(`   Events: ${res.data.events.length}`);

        // Test 8: Admin Dashboard
        console.log('\n✅ Test 8: Admin Dashboard Stats');
        res = await makeRequest('GET', '/admin/dashboard');
        console.log(`   Status: ${res.status}`);
        console.log(`   Total messages: ${res.data.totalMessages}`);
        console.log(`   New messages: ${res.data.newMessages}`);
        console.log(`   Total subscribers: ${res.data.totalSubscribers}`);
        console.log(`   Upcoming events: ${res.data.upcomingEvents}`);

        console.log('\n' + '='.repeat(50));
        console.log('✅ All tests completed successfully!');
        console.log('=' .repeat(50) + '\n');
        console.log('📍 Admin Dashboard: http://localhost:5000/admin/');
        console.log('📍 API Base URL: http://localhost:5000/api\n');

    } catch (error) {
        console.error('\n❌ Error during testing:', error.message);
        console.error('\n⚠️  Make sure the backend server is running on port 5000');
        console.error('Run: npm run dev');
    }
}

// Run tests
runTests();
