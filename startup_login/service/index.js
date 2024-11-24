const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const app = express();

const uri = "mongodb+srv://calvinjameson02:FishBrainsAreGood2@play-trade-260.erubr.mongodb.net/?retryWrites=true&w=majority&appName=play-trade-260";
const client = new MongoClient(uri);
const collection = client.db('playtrade_cs260').collection('user');

app.use(cookieParser());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Serve static files
// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create user
app.post('/api/auth/create', async (req, res) => {
  console.log('Received request to /api/auth/create');
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  console.log('Received request to /api/auth/login');
  const user = await getUser(req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

// Get current user
app.get('/api/user/me', async (req, res) => {
  const authToken = req.cookies['token'];
  const user = await collection.findOne({ token: authToken });
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Logout user
app.delete('/api/auth/logout', async (req, res) => {
  const authToken = req.cookies['token'];
  await collection.updateOne(
    { token: authToken },
    { $set: { token: uuid.v4() } }
  );
  res.send({});
});

function getUser(email) {
  return collection.findOne({ email });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await collection.insertOne(user);
  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Serve React app for all unknown routes
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
