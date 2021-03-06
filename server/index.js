const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
uri = process.env.URI;
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json('Hello World');
});

// signup route
app.post('/signup', async(req, res) => {
    console.log('signup');
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const { email, password } = req.body;

    const generateUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await client.connect();
        const db = client.db('app-data');
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
            expiresIn: 60 * 24,
        });
        res.status(201).json({ token, user_id: generateUserId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});

// login route
app.post('/login', async(req, res) => {
    console.log('login');
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const { email, password } = req.body;
    try {
        await client.connect();
        const db = client.db('app-data');
        const users = db.collection('users');
        const user = await users.findOne({ email });

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

        if (user && isPasswordValid) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            });
            res.status(201).json({ token, user_id: user.user_id });
        }
        if (!user || !isPasswordValid) {
            res.status(400).send("Invalid email or password");
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }

});

// update user data
app.put('/user', async(req, res) => {
    console.log("put user");
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const formData = req.body;
    try {
        await client.connect();
        const db = client.db('app-data');
        const users = db.collection('users');

        const queryUser = { user_id: formData.user_id };

        const updateUserData = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: []
            }
        }
        const insertedUser = await users.updateOne(queryUser, updateUserData);
        res.send(insertedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});


// get single user data
app.get('/user', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const userId = req.query.userId;
    try {
        await client.connect();
        const db = client.db('app-data');
        const users = db.collection('users');

        const query = ({ user_id: userId });
        const user = await users.findOne(query);

        res.status(201).send(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});

// get gendered users
app.get('/gendered-users', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const gender = req.query.gender;
    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        const query = { gender_identity: { $eq: gender } }
        const genderedUsers = await users.find(query).toArray();
        // console.log('gendered', genderedUsers);
        res.send(genderedUsers);
    } finally {
        await client.close();
    }
});

// add a new Match
app.put('/addmatch', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const { userId, matchedUserId } = req.body;

    console.log(userId, matchedUserId, req.body);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        const query = { user_id: userId };
        const update = {
            $push: {
                matches: { user_id: matchedUserId }
            }
        }
        const updatedUser = await users.updateOne(query, update);
        res.json(updatedUser);
    } finally {
        await client.close()
    }
});

// get messages
app.get('/messages', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const { userId, correspondingUserId } = req.query;

    const query = {
        from_userId: userId,
        to_userId: correspondingUserId
    };
    // console.log(req.query);
    try {
        await client.connect();
        const database = client.db('app-data');
        const messages = database.collection('messages');
        const foundMessages = await messages.find(query).toArray();
        res.send(foundMessages);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});

// post/send messages
app.post('/messages', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const { message } = req.body;
    console.log(req.body.message);
    try {
        await client.connect();
        const database = client.db('app-data');
        const messages = database.collection('messages');
        const insertedMessage = await messages.insertOne(message);
        res.send(insertedMessage);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});

// get all users route (test)
app.get('/users', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
    const userIds = JSON.parse(req.query.userIds);
    console.log(req.query.userIds);
    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const pipeline = [{
            '$match': {
                'user_id': {
                    '$in': userIds
                }
            }
        }];
        const foundUsers = await users.aggregate(pipeline).toArray();
        console.log(foundUsers);
        res.send(foundUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});


app.listen(PORT, () => { console.log('Server Running on PORT: ' + PORT); });