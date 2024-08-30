// api/login.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Replace with your database connection string and name
    const client = new MongoClient('YOUR_DATABASE_CONNECTION_STRING');
    await client.connect();
    const db = client.db('YOUR_DATABASE_NAME');
    const users = db.collection('users');

    // Check if the user exists and password matches
    const user = await users.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
