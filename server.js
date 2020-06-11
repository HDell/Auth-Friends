//this is creating the API

//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//server port (local host #) saved as a variable
const port = 5000;

const app = express(); //creates express application
const token = 'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ'; //token string

let nextId = 7;

let friends = [
  {
    id: 1,
    name: 'Rachel Green',
    age: 30,
    email: 'rachel@friends.com'
  },
  {
    id: 2,
    name: 'Joey Tribbiani',
    age: 34,
    email: 'joey@friends.com'
  },
  {
    id: 3,
    name: 'Chandler Bing',
    age: 32,
    email: 'chandler@friends.com'
  },
  {
    id: 4,
    name: 'Ross Geller',
    age: 32,
    email: 'ross@friends.com'
  },
  {
    id: 5,
    name: 'Monica Bing',
    age: 31,
    email: 'monica@friends.com'
  },
  {
    id: 6,
    name: 'Phoebe Buffay-Hannigan',
    age: 30,
    email: 'phoebe@friends.com'
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) { //middleware
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User must be logged in to do that.' });
  }
}

//CRUD functions

  //CREATE: returns a token to be added to the header of all other requests. Pass in the following credentials as the body of the request: { username: 'Lambda School', password: 'i<3Lambd4' }
  //Not being used to add data to the DB. Just being used to send data to server and get something back (login data). [This couldn't be done elsewhere... It's like a conditional GET.]
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Lambda School' && password === 'i<3Lambd4') { //this is typically where the database request would be
    req.loggedIn = true;
    res.status(200).json({
      payload: token //something has to be done with this token
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});

  //READ: returns the list of friends.
app.get('/api/friends', authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends); //send the full array back to the client [the data is stored here in this example. In a full app, the data would be stored/persisted in a DB and called from there
  }, 1000);
});

  //READ: returns the friend with the id passed as part of the URL (123 in example).
app.get('/api/friends/:id', authenticator, (req, res) => { //read
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend); //status: ok (send friend to client)
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

  //CREATE: creates a friend and return the new list of friends. Pass the friend as the body of the request (the second argument passed to axios.post).
app.post('/api/friends', authenticator, (req, res) => { //create
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends); //return new friends array to the client
});

  //UPDATE: updates the friend using the id passed as part of the URL. Send the an object with the updated information as the body of the request (the second argument passed to axios.put).
app.put('/api/friends/:id', authenticator, (req, res) => { //update
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex), //spread subarray of objects into this array
      friend, //insert the updated friend
      ...friends.slice(friendIndex + 1) //spread remainder of subarray of objects into this array
    ];
    res.send(friends); //return the updated array to the client
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

  //DELETE: removes the friend using the id passed as part of the URL (123 in example).
app.delete('/api/friends/:id', authenticator, (req, res) => { //delete
  const { id } = req.params;

  friends = friends.filter(f => f.id !== Number(id));

  res.send(friends); //the API call sends back the friends array w/o the friend with the selected ID to the client
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
