const express = require('express')
const port = process.env.PORT || 3001
const deployTypes = ['development', 'production']
const deployType = deployTypes[1]
let originURL = 'http://localhost:3000'

const knex = require('knex')(require('./knexfile.js')[deployType]);
const cors = require('cors');

const app = express()



if (deployType !== 'development') {
    originURL = 'https://nailuj843-final-frontend.herokuapp.com'
}

//app.use(cors({ origin: 'https://nailuj843-final-frontend.herokuapp.com', credentials: true }));
app.use(cors({ origin: originURL, credentials: true }));
// SERVER
app.listen(port, () => {
    console.log(`Listening, localhost:${port}`)
})

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    console.log('user hit the server')
    res.send('heroku test server successful')
})

app.get('/test', (req, res) => {
    console.log('user requested records from table')

    knex
        .select('*')
        .from('scores')
        .orderBy('hiscore', 'desc')
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.status(404).json({
                message:
                    'things are just not working out'
            })
        })
})

app.get('/getHiScore', (req, res) => {
    console.log("user tried to get hiscore")
    knex
        .select('*')
        .from('scores')
        .orderBy('hiscore', 'desc')
        .then(data => res.json({ 'hiscore': data[0].hiscore, 'username': data[0].username }))
        .catch(err => {
            res.status(404).json({
                message:
                    'things are just not working out'
            })
        })
})

app.post('/login', async (req, res) => {
    console.log('user tried to login')
    let userName = req.body.username
    let passWord = req.body.password

    await knex
        .select('*')
        .from('scores')
        .where({ username: `${userName}` })
        .then(result => {
            if (result.length === 0) {
                //res.status(204).json({ message: 'create new user' })
                res.send({ message: 'create new user' })
            } else if (result[0].password === passWord) {
                res.send({ message: 'login successful', hiscore: result[0].hiscore })
            } else {
                res.send({ message: 'incorrect password' })
            }
        })
})

app.post('/newUser', (req, res) => {
    console.log('user tried to create a new user')

    knex
        .select('*')
        .from('scores')
        .where({ username: `${req.body.username}` })
        .then(result => {
            if (result.length === 0) {
                knex.insert({
                    username: req.body.username,
                    password: req.body.password,
                    hiscore: 0
                }).into('scores')
                    .then(res.send({ message: 'successfully added new entry to database' }))
            } else {
                res.send({ message: 'User Already Exists' })
            }
        })
})

app.delete('/delete', (req, res) => {
    console.log('user tried to delete ID :', req.body.username)
    knex('scores')
        .del()
        .where({ username: req.body.username })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'The User you attempted to delete could not be found. Please try again' })
        )
})

app.patch('/updateHiScore', (req, res) => {
    console.log(`user updated score: username ${req.body.username} score ${req.body.score}`)
    knex('scores')
        .where({ username: req.body.username })
        .update({ hiscore: req.body.score })
        .then(res.send({ message: 'score successfully updated' }))
        .catch(err => res.send({ message: `Error when updating score for ${req.body.username}` })
        )
})
