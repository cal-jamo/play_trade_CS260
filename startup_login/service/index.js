// index.js
const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');


const app = express();
const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Determine the public directory based on the environment
const publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public');

// Serve up the application's static content
app.use(express.static(publicDir));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);
const users = {};

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  console.log('Request body:', req.body);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// GetAuth token for the current user
apiRouter.get('/user', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    const userDetails = {
      id: user._id,
      email: user.email,
      balance: user.balance,
      ownedShares: user.ownedShares,
      isAdmin: user.isAdmin
    };
    res.send(userDetails);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.get('/portfolio', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    res.send(user.ownedShares);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.post('/sell', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  console.log('Request body:', req.body);

  const { teamName, price } = req.body;

  try {
    // Update the team's shares
    console.log('Team name:', teamName);
    const team = await DB.getTeamByName(teamName);
    team.shares += 1;
    await DB.updateTeamShares(teamName, team.shares);
    console.log('Team shares updated');

    // Remove the sale from the user's owned shares
    console.log('User owned shares before sale:', user.ownedShares);
    const existingShare = user.ownedShares.find(share => share.teamName === teamName);
    console.log('Existing share:', existingShare);

    if (existingShare) {
      // Decrement the number of shares
      existingShare.shares -= 1;
      if (existingShare.shares === 0) {
        user.ownedShares = user.ownedShares.filter(share => share.teamName !== teamName);
      }
    }

    console.log('User owned shares:', user.ownedShares);
    await DB.updateUserOwnedShares(user._id, user.ownedShares);

    user.balance += price;
    console.log('User balance after sale:', user.balance);
    await DB.updateUserBalance(user._id, user.balance);
    console.log('User balance updated');

    res.status(200).send({ msg: 'Sale successful' });

  } catch (error) {
    res.status(500).send({ msg: 'Failed to complete sale' });
  }
});



apiRouter.post('/purchase', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  console.log('Request body:', req.body);

  const { teamName, price } = req.body;

  if (user.balance >= price) {
    try {

      // Update the team's shares
      console.log('Team name:', teamName);
      const team = await DB.getTeamByName(teamName);
      
      if (team.shares > 0) {
        team.shares -= 1;
        await DB.updateTeamShares(teamName, team.shares);
        console.log('Team shares updated');


        // Add the purchase to the user's owned shares
        console.log('User owned shares before purchase:', user.ownedShares);

        const existingShare = user.ownedShares.find(share => share.teamName === teamName);
        console.log('Existing share:', existingShare);

        if (existingShare) {
          // Increment the number of shares
          existingShare.shares += 1;
        } else {
          // Add a new entry for the team
          user.ownedShares.push({ teamName, price, shares: 1, date: new Date() });
        }

        console.log('User owned shares:', user.ownedShares);
        await DB.updateUserOwnedShares(user._id, user.ownedShares);

        user.balance -= price;
        console.log('User balance after purchase:', user.balance);
        await DB.updateUserBalance(user._id, user.balance);
        console.log('User balance updated');

        res.status(200).send({ msg: 'Purchase successful' });
      } else {
        res.status(400).send({ msg: 'No shares available' });
      }

    } catch (error) {
      res.status(500).send({ msg: 'Failed to complete purchase' });
    }
  } else {
    res.status(400).send({ msg: 'Insufficient balance' });
  }
});

apiRouter.post('/team/add', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user || !user.isAdmin) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  const { name, price, shares, sport } = req.body;

  try {
    await DB.addTeam({ name, price, shares, sport });
    res.status(200).send({ msg: 'Team added' });
  } catch (error) {
    res.status(500).send({ msg: 'Failed to add team' });
  }
});

apiRouter.post('/team/update', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user || !user.isAdmin) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  console.log('Request body:', req.body);

  const { name, price, shares } = req.body;

  try {
    await DB.updateTeam(name, { price, shares });
    res.status(200).send({ msg: 'Team updated' });
  } catch (error) {
    res.status(500).send({ msg: 'Failed to update team' });
  }
});

// DeleteAuth logout a user
// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// New endpoint to get the list of teams
secureApiRouter.get('/teams', async (req, res) => {
  try {
    const teams = await DB.getTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).send({ msg: 'Failed to load teams' });
  }
});

// Serve React app for all unknown routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the HTTP service
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);