//=======================
// DEPENDENCIES
//=======================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()

//=======================
// PORT
//=======================
// allow use of Heroku's port of your own local port, depending on the environment
const PORT = process.env.PORT || 3003

//=======================
// DATABASE
//=======================
// how to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// connect to mongo
// fix deprecation warnings from mongoose
mongoose.connect(
    MONGODB_URI,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  })

// error / success
db.on('error', (err) => console.log(err.message + ' Mongod not running.'))
db.on('connected', () => console.log('Mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('Mongo disconnected!'))

//=======================
// MIDDLEWARE
//=======================
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride('_method'))

//=======================
// ROUTES
//=======================
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//=======================
// LISTENER
//=======================
app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
})
