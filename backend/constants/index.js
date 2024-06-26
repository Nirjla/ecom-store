const { config } = require("dotenv")
config()

exports.DB = {
      DB_URL: process.env.DB_URL

}
exports.SERVER = {
      SERVER_PORT: process.env.SERVER_PORT
}

exports.JWT = {
      JWT_SECRET: process.env.JWT_SECRET
}
