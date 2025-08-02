// MongoDB SRV Connection Test Script
// This script tests the connection using MongoDB Atlas SRV connection string

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function testSrvConnection() {
  // Get the connection string from environment variables
  let uri = process.env.MONGODB_URI;
  
  // Convert to SRV format if not already
  if (!uri.includes('mongodb+srv://')) {
    console.log('⚠️  Converting to SRV connection string format...');
    uri = uri.replace('mongodb://', 'mongodb+srv://')
             .replace(/:\d+\//, '/'); // Remove port number for SRV
  }
  
  console.log('🔍 Testing MongoDB SRV connection to:', 
    uri.split('@')[1]?.split('/')[0] || uri);
  
  const client = new MongoClient(uri, {
    // Connection settings
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 10000,
    
    // TLS/SSL settings - use defaults for SRV
    tls: true,
    
    // Authentication
    authMechanism: 'SCRAM-SHA-1',
    authSource: 'admin',
    
    // Write concern
    retryWrites: true,
    w: 'majority',
    
    // Replica set settings (should be auto-discovered with SRV)
    retryReads: true
  });

  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test the connection with a ping command
    const db = client.db('admin');
    const pingResult = await db.command({ ping: 1 });
    console.log('🏓 Ping result:', pingResult);
    
    // Get server info
    const serverInfo = await db.command({ buildInfo: 1 });
    console.log('ℹ️  MongoDB Server Version:', serverInfo.version);
    
    // List all databases (if permissions allow)
    try {
      const dbs = await client.db().admin().listDatabases();
      console.log('📊 Available databases:', dbs.databases.map(d => d.name));
    } catch (err) {
      console.log('ℹ️  Cannot list databases (permission issue)');
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels,
      stack: error.stack?.split('\n')[0] // Just show first line of stack trace
    });
    
    // Additional diagnostics
    console.log('\n🔍 Additional diagnostics:');
    console.log('- Node.js version:', process.version);
    console.log('- MongoDB driver version:', (await import('mongodb/package.json', { assert: { type: 'json' } })).default.version);
    
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
    process.exit(0);
  }
}

// Run the test
testSrvConnection();
