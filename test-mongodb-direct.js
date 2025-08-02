// MongoDB Direct Connection Test
// This script uses the exact connection string from MongoDB Atlas

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function testDirectConnection() {
  // Use the exact connection string from environment variables
  const uri = process.env.MONGODB_URI;
  
  // Log a masked version of the connection string for security
  const maskedUri = uri.replace(/:([^:]+)@/, ':***@');
  console.log('🔍 Testing MongoDB connection with URI:', maskedUri);
  
  // Simple client with minimal options
  const client = new MongoClient(uri, {
    // Basic timeouts
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 10000,
    
    // Let the connection string determine other options
  });

  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test the connection with a ping command
    const db = client.db('admin');
    const pingResult = await db.command({ ping: 1 });
    console.log('🏓 Ping result:', pingResult);
    
    // Get server status
    const serverStatus = await db.command({ serverStatus: 1 });
    console.log('ℹ️  MongoDB Version:', serverStatus.version);
    
    // List all databases (if permissions allow)
    try {
      const dbs = await client.db().admin().listDatabases();
      console.log('📊 Available databases:', dbs.databases.map(d => d.name));
    } catch (err) {
      console.log('ℹ️  Cannot list databases (permission issue)');
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('Error details:', {
      name: error.name,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels
    });
    
    // Additional diagnostics
    console.log('\n🔍 Additional diagnostics:');
    console.log('- Node.js version:', process.version);
    console.log('- MongoDB driver version:', (await import('mongodb/package.json', { assert: { type: 'json' } })).default.version);
    console.log('- Connection string starts with:', uri.substring(0, 30) + '...');
    
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
    process.exit(0);
  }
}

// Run the test
testDirectConnection();
