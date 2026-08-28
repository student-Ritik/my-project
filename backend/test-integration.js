#!/usr/bin/env node
/**
 * Complete Integration Test
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
                        data: JSON.parse(body)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function test() {
    console.log('\n📱 Backend Integration Test\n');

    try {
        // Test Admin Dashboard
        console.log('📊 Admin Dashboard Stats:');
        let res = await makeRequest('GET', '/admin/dashboard');
        console.log('  ✅ Status:', res.status);
        console.log('  📬 Total Messages:', res.data.statistics.totalMessages);
        console.log('  🆕 New Messages:', res.data.statistics.newMessages);
        console.log('  📧 Subscribers:', res.data.statistics.totalSubscribers);
        console.log('  📅 Upcoming Events:', res.data.statistics.upcomingEvents);

        // Test Newsletter Subscribers
        console.log('\n📧 Newsletter Subscribers:');
        res = await makeRequest('GET', '/newsletter/admin/subscribers');
        console.log('  ✅ Status:', res.status);
        console.log('  Total Active Subscribers:', res.data.stats.total);
        console.log('  Yoga Preference:', res.data.stats.yoga);
        console.log('  Meditation Preference:', res.data.stats.meditation);

        console.log('\n✅ Integration Test Complete!\n');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

test();
