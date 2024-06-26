const mongoose = require("mongoose")
const schema = mongoose.Schema;

const ItemSchema = new schema({
      name: {
            type: String,
            required: true,
            unique: true
      }, description: {
            type: String,
            required: true
      },
      price: {
            type: Number,
            required: true
      }

}, {
      timestamps: true
})

module.exports = mongoose.model('Item', ItemSchema)