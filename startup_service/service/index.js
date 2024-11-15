const express = require('express');
const uuid = require('uuid');
const app = express();
const cors = require('cors');
app.use(cors());

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = {
      email: req.body.email,
      password: req.body.password,
      token: uuid.v4(),
      balance: 2000 // Starting balance of 2000 fake money
    };
    users[user.email] = user;
    res.send({ token: user.token, balance: user.balance });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { token } = req.body;
  const user = Object.values(users).find((u) => u.token === token);  // Assuming token is sent in the body
  
  if (user) {
    res.send({ token: user.token, balance: user.balance });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.post('/purchase', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  
  // Find the user by the token
  const user = Object.values(users).find((u) => u.token === token);
  
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  // Proceed with the purchase logic
  const { amount } = req.body;
  if (user.balance >= amount) {
    user.balance -= amount;  // Update the user's balance
    res.send({ balance: user.balance });
  } else {
    res.status(400).send({ msg: 'Insufficient funds' });
  }
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}
