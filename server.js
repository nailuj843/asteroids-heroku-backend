const express = require('express')
const port = process.env.PORT || 3001
const knex = require('knex')(require('./knexfile.js')['production']);
const cors = require('cors');

const app = express()

app.use(cors({ origin: 'https://nailuj843-final-backend.herokuapp.com', credentials: true }));

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
        .orderBy('id')
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.status(404).json({
                message:
                    'things are just not working out'
            })
        })
})

app.get('/login', async (req, res) => {
    console.log('user tried to login')
    let userName = req.body.username
    let passWord = req.body.password
    let dbEntry = []
    // SQL --> SELECT * FROM 'scores' WHERE username = `${userName}` AND password = `${password}`
    //, password: `${passWord}`

    await knex
        .select('*')
        .from('scores')
        .where({ username: `${userName}` })
        .then(result => dbEntry = result)
        .catch(err => res.status(404).json({ message: 'these are not the users you are looking for' }))

    console.log(`req.username ${userName} req.password ${passWord}`)
    console.log(`dbName: ${dbEntry.name} dbPassword: ${dbEntry.password}`)

    res.send(200).json(dbEntry)
    // console.log(`user ${userName} pass ${passWord} result: ${deEntry.password}`)
    // console.log(`data from db username: ${deEntry.username} password: ${deEntry.password}`)

    // if (deEntry.length === 0) {
    //     res.send('No match found, create new user.')
    // } else {
    //     if (deEntry.password === passWord) {
    //         res.send('login successful')
    //     } else {
    //         res.send('incorrect password')
    //     }
    // }

    // res.send(dbEntry)

    // res.send(`this is the data: user ${userName} pass ${passWord}`)
})
