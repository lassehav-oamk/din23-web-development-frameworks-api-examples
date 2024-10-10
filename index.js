const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(cors());

// define user data to serve as a placeholder for real database
let users = [
  { id: 1, name: 'Max' },
  { id: 2, name: 'Josephine' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Charlie' },
]


app.get('/users', (req, res) => {

  console.log('REQUEST to /users');

  // check if the query parameter is present and that it is for the name
  if(req.query.name) {
    // get those users whose name include the value of the name query parameter
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(req.query.name.toLowerCase()));

    // return those users as a response to the request
    res.json(filteredUsers);
    return;
  }

  // if the query parameter is not present, then return all the users
  res.json(users)
})

// POST -> Create a new user
/*
  This is format for the request body: JSON
  {
    "name": "John"
  }
*/
app.post('/users', (req, res) => {
  // we need some way of reading user data from the request
  console.log(req.body);

  // confirm that the user data is present in the request body and name property is present and not empty
  if (!req.body.name || req.body.name === '') {
    // if the user data is not present or name is empty, then we will send a response to the client with a 400 status code
    res.status(400).json({
      message: 'Bad Request'
    })
    return
  }

  // then we need to add the user to the users array
  const newUser = { 
    name: req.body.name,
    id: users.length + 1
  }
  users.push(newUser);

  // finally we will send a response to the client that the operation was successful
  res.status(201).json({
    message: 'User added successfully',
    user: newUser
  })
})


// Modify the user data identiefied by the id
/*
  This is format for the request body: JSON
  {
    "name": "John"
  }
*/
app.put('/users/:id', (req, res) => {
    // read the user id from the request
    const id = parseInt(req.params.id);

    if (!req.body.name || req.body.name === '') {
      // if the user data is not present or name is empty, then we will send a response to the client with a 400 status code
      res.status(400).json({
        message: 'Bad Request'
      })
      return
    }

    // We need to find the user with the given id and lets use a loop to do it
    for(let i = 0; i < users.length; i++) {
      if(id === users[i].id) {
        users[i].name = req.body.name;
        res.status(200).json({
          message: 'User updated'
        });
        return;
      }
    }

    // a matching used was not found
    res.status(404).json({
      message: 'User not found'
    });
});

app.delete('/users/:id', (req, res) => {
   // first read the id value
   const id = parseInt(req.params.id);

   const initialArrayLength = users.length;

   // then find the user with the given id
   // if found, then delete the user from user store, which in this case is the users array
   users = users.filter(user => {
    if(user.id === id) {
      return false;
    }
    return true;
   });

   // if we found the user, then send successful response
   if(initialArrayLength !== users.length) {
    res.status(200).json({
      message: 'User deleted'
    });
    return;
   }

   // if we did not find the user, then send a response with a 404 status code
    res.status(404).json({
      message: 'User not found'
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})