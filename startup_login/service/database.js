// database.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const uri = "mongodb+srv://calvinjameson02:FishBrainsAreGood2@play-trade-260.erubr.mongodb.net/?retryWrites=true&w=majority&appName=play-trade-260&tls=true";
const client = new MongoClient(uri);
const db = client.db('playtrade_cs260');
const userCollection = db.collection('user');
const teamsCollection = db.collection('teams');
const communityMessagesCollection = db.collection('communityMessages');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${uri} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    balance: 2000,
    ownedShares: [],
    isAdmin: false,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function getTeams() {
  const query = {};
  const options = {
    sort: { team: 1 },
  };
  const cursor = teamsCollection.find(query, options);
  return cursor.toArray();
}

function getTeamByName(teamName) {
  console.log('teamName:', teamName);
  return teamsCollection.findOne({ name : teamName });
}

async function updateTeamShares(teamName, shares) {
  await teamsCollection.updateOne(
    { name: teamName },
    { $set: { shares: shares } }
  );
}

async function updateTeam(teamName, updates) {
  await teamsCollection.updateOne(
    { name: teamName },
    { $set: updates }
  );
}

async function addTeam(team) {
  await teamsCollection.insertOne(team);
}

async function updateUser(userId, updates) {
  await userCollection.updateOne(
    { _id: userId },
    { $set: updates }
  );
}

async function updateUserOwnedShares(userId, ownedShares) {
  await userCollection.updateOne(
    { _id: userId },
    { $set: { ownedShares: ownedShares } }
  );
}

async function updateUserBalance(userId, balance) {
  await userCollection.updateOne(
    { _id: userId },
    { $set: { balance: balance } }
  );
}


async function removeToken(userId) {
    await userCollection.updateOne(
        { _id: userId },
        { $unset: { token: "" } } // Remove the token field
    );
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getTeams,
    updateTeamShares,
    updateUser,
    updateUserOwnedShares,
    updateTeam,
    addTeam,
    removeToken,
    updateUserBalance,
    getTeamByName,
};
