const express = require('express')
const port = process.env.PORT || 3001
const knex = require('knex')(require('./knexfile.js')['production']);
const cors = require('cors');

const app = express()

app.use(cors({ origin: 'https://nailuj843-final-frontend.herokuapp.com', credentials: true }));

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

const searchDBbyName = async (nameToSearch) => {


}

app.get('/login', async (req, res) => {
    console.log('user tried to login')
    let userName = req.body.username
    let passWord = req.body.password

    // SQL --> SELECT * FROM 'scores' WHERE username = `${userName}` AND password = `${password}`
    //, password: `${passWord}`

    await knex
        .select('*')
        .from('scores')
        .where({ username: `${userName}` })
        .then(result => {
            if (result.length === 0) {
                res.send('create new user')
            } else if (result[0].password === passWord) {
                res.send('login successful')
            } else {
                res.send('incorrect password')
            }
        })



})
