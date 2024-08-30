// api/sign-up.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Replace with your database connection string and name
    const client = new MongoClient('YOUR_DATABASE_CONNECTION_STRING');
    await client.connect();
    const db = client.db('YOUR_DATABASE_NAME');
    const users = db.collection('users');

    // Check if the user already exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Insert new user into the database
    await users.insertOne({ username, password });
    res.status(201).json({ message: 'User created' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
