const mongoose = require("mongoose")

const schema = mongoose.Schema

const UserSchema = new schema({
      google_id: {
            type: Number,
            default: null
      },
      username: {
            type: String,
            default: null
      },
      first_name: {
            type: String,
            required: true
      },
      last_name: {
            type: String,
            required: true
      }, email: {
            type: String,
            required: true
      },
      password: {
            type: String,
            // required: true
      },
}, {
      timestamps: true
})

module.exports = mongoose.model('User', UserSchema)