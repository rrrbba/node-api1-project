// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express(); //creates a server

server.use(express.json());

//finding something in the data
// db.find().then(data => {
//     res.send(data)
// })

//RETURNS ALL USERS
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'The information could not be retrieved'})
    })
});

//RETURNS USER BY ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(404).json({message: 'The user with the specified ID does not exist'})
    })
});

//ADDS A NEW USER TO THE SERVER
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user'})
    }
    db.insert(userInfo)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user'})
    });
});

//DELETES A USER BY ID FROM THE SERVER
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(user => {
        if (!user){
            res.status(404).json({error: "The user with the specified ID doesn't exist" })
        } else {
            res.json(user);
        }
    })
    .catch(err => {
        res.status(500).json({error: "The user could not be removed"})
    })
})

//UPDATES A USER BY ID
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if (!changes.name || !changes.bio) {
        res.status(400).json({errorMessage: "Please provide a name and bio for the user."});
    } else {
        db.update(id, changes)
        .then(user => {
            if (!user) {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user information couldn't be modified"})
        })
    }
})

//listen for requests in a particular port on localhost
const port = 6000; //localhost:8000
server.listen(port, () => console.log('API on port 6000'));