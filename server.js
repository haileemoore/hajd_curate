//=======================
// DEPENDENCIES
//=======================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()


const Art = require('./models/schema.js')
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

// NEW

app.get('/curate/create', (req, res) => {
  res.render('new.ejs')
})

// POST (NEW)

app.post('/curate', (req, res) => {
  Art.create(req.body, (err, createdPiece) => {
    res.redirect('/curate')
  })
})

// app.post('/curate', (req, res) => {
//   res.send(req.body)
// })

// INDEX

app.get('/curate', (req, res) => {
  // res.send('Everything is up and running!')
  Art.find({}, (err, allArt) => {
    res.render(
      'index.ejs',
      {
          pieces: allArt
      })
  })
})

// SHOW

 app.get('/curate/:id', (req, res) => {
   Art.findById(req.params.id, (err, foundPiece) => {
     res.render(
       'show.ejs',
       {
         pieces: foundPiece
       })
   })
 })

// DELETE

app.delete('/curate/:id', (req, res) => {
  Art.findByIdAndRemove(req.params.id, (err, noPiece) => {
    res.redirect('/curate')
  })
})

// EDIT

app.get('/curate/:id/edit', (req, res) => {
  Art.findById(req.params.id, (err, foundPiece) => {
    res.render(
      'edit.ejs',
      {
        pieces: foundPiece
      }
    )
  })
})

// PUT

app.put('/curate/:id', (req, res) => {
  Art.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (err, updatedPiece) => {
    res.redirect('/curate')
  })
})

//=======================
// LISTENER
//=======================
app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
})


// const manyPieces = [
//   {
//     title: 'Sunflowers',
//     artist: 'Vincent Van Gogh',
//     img: 'https://imgur.com/7YJGfPR.jpg'
//   },
//   {
//     title: 'The Helicopter Is Following Me',
//     artist: 'Annie Preece',
//     img:'https://i.imgur.com/Ecu4w3S.jpg'
//   },
//   {
//     title: 'No. 61',
//     artist: 'Mark Rothko',
//     img:'https://imgur.com/r6jlCOi.jpg'
//   },
//   {
//     title: 'No. 19',
//     artist: 'Jackson Pollock',
//     img:'https://imgur.com/ErmveKQ.jpg'
//   },
// ]

// Art.insertMany(manyPieces, (err, pieces) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(pieces);
//   }
// })
