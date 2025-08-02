import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  // Get the connection string from environment variables
  let uri = process.env.MONGODB_URI;
  console.log('Testing connection to MongoDB Atlas...');
  
  // Extract database name from the URI
  const dbName = 'direhire'; // Default database name
  
  // Create a new client with connection options
  const client = new MongoClient(uri, {
    // Connection settings
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    
    // SSL/TLS settings
    tls: true,
    tlsInsecure: true,  // Bypass certificate validation (for testing only)
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    
    // Authentication
    authMechanism: 'SCRAM-SHA-1',
    authSource: 'admin',
    
    // Write concern
    retryWrites: true,
    w: 'majority',
    
    // Replica set settings (if using replica set)
    replicaSet: 'atlas-gokv2n-shard-0',
    readPreference: 'primaryPreferred'
  });

  try {
    await client.connect();
    const db = client.db('direhire');
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('\nCollections:');
    collections.forEach(coll => console.log(`- ${coll.name}`));
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    if (error.stack) console.error(error.stack);
  } finally {
    await client.close();
    process.exit(0);
  }
}

testConnection();
