// MongoDB Connection Test Script
// This script verifies the MongoDB connection with minimal dependencies

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function verifyConnection() {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 Testing MongoDB connection with URI:', 
    uri.replace(/:[^:]*@/, ':***@')); // Hide password in logs

  const client = new MongoClient(uri, {
    // Basic connection settings
    serverSelectionTimeoutMS: 10000,  // 10 seconds
    socketTimeoutMS: 30000,           // 30 seconds
    connectTimeoutMS: 10000,          // 10 seconds
    
    // Retry settings
    retryWrites: true,
    retryReads: true,
    
    // TLS/SSL settings - use only tlsAllowInvalidCertificates
    // tlsInsecure is not needed when tlsAllowInvalidCertificates is true
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    
    // Replica set settings
    replicaSet: 'atlas-gokv2n-shard-0',
    readPreference: 'primaryPreferred'
  });

  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log('🔌 Connection details:', {
      server: client.topology.s.description.servers,
      replicaSet: client.topology.s.description.setName,
      topology: client.topology.s.state
    });
    
    // Test the connection with a ping command
    const db = client.db('admin');
    const pingResult = await db.command({ ping: 1 });
    console.log('🏓 Ping result:', pingResult);
    
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
      stack: error.stack
    });
    
    // Additional diagnostics
    console.log('\n🔍 Additional diagnostics:');
    console.log('- Node.js version:', process.version);
    console.log('- MongoDB driver version:', require('mongodb/package.json').version);
    
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 MongoDB connection closed');
    }
    process.exit(0);
  }
}

// Run the test
verifyConnection();
