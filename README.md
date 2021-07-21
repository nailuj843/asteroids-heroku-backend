Welcome to the Julian's Asteroids (or CSSteroids...) Backend Server

-ENDPOINTS-

GET '/' Default Endpoint
-- displays 'user hit the server' to the server console
-- sends 'heroku test server successful' to client

GET '/test' 
-- displays 'user requested records from table' to the server console
-- sends all data from database, sorted by 'hiscore' descending

GET '/getHiScore'
-- displays 'user tried to get hiscore' to the server console
-- sends highest recorded score and username in the database

POST '/login'
-- displays 'user tried to login' to the server console
-- takes in object {username: 'username', password: 'password'}
-- if username doesn't match with a username in the database, sends {message: 'create new user'}
-- if username matches with a username in the database, 
    but password doesn't, sends { message: 'incorrect password' }
-- if both username and password match, sends { message: 'login successful', hiscore: <User's Hi Score> }

POST '/newUser'
-- displays 'user tried to create a new user' to the server console
-- takes in object {username: 'username', password: 'password'}
-- if username doesn't match with a username in the database, creates database entry, 
    sends { message: 'successfully added new entry to database' }
-- if user already exists in databse, sends { message: 'User Already Exists' }

DELETE '/delete'
-- displays 'user tried to delete ID : <username>'
-- takes in object {username: 'username'}
-- if username matches with a username in the database, 
    deletes entry, sends {message: '<username> deleted'}
-- if username doesn't match with a username in the database, 
    sends { message: 'The User you attempted to delete could not be found. Please try again' }

POST '/updateHiScore'
-- displays 'user updated score: username <username> score <score>`
-- takes in object {username: 'username', score: 'score'}
-- if username matches with a username in the database, 
    updates hiscore in database with <score>
-- if username doesn't match with a username in the database, 
    { message: 'Error when updating score for <username>' }

