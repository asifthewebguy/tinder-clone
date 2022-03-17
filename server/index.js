const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db_username = 'tinderDBuser';
const db_password = '5MqAdMv3A2pLaORr';
const db_name = 'Cluster0';
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.kyaoo.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json('Hello World');
});
app.post('/signup', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const { email, password } = req.body;

    const generateUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await client.connect();
        const db = client.db(db_name);
        const users = db.collection('users');
        const sanEmail = email.toLowerCase();
        const userExists = await users.findOne({ sanEmail });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const user_data = {
            user_id: generateUserId,
            email: sanEmail,
            hashed_password: hashedPassword,
        };
        const insertedUser = await users.insertOne(user_data);
        const token = jwt.sign(insertedUser, sanEmail, {
            expiresIn: 60 * 60 * 24,
        });
        res.status(201).json({ token, userId: generateUserId, email: sanEmail });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});
app.get('/users', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        const returnedUsers = await users.find().toArray();
        res.json(returnedUsers);
    } finally {
        await client.close();
    }
});
app.listen(PORT, () => { console.log('Server Running on PORT: ' + PORT); });