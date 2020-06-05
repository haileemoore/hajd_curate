//=====================
// MONGOOSE
//=====================

const mongoose = require('mongoose')

//<-----------------SCHEMA--------------->//

  const artSchema = new mongoose.Schema(
    {
      title: {type: String, required: true},
      artist: {type: String, required: true},
      img: {type: String, required: true}
    },
  )

//<-----------------MODEL/COLLECTION--------------->//

    const Art = mongoose.model('Art', artSchema)

//<-----------------EXPORT--------------->//

module.exports = Art
