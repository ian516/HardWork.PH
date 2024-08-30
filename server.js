const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User model
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    role: String
}));

// Sign up route
app.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).send('User signed up');
    } catch (err) {
        res.status(400).send('Error signing up');
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
