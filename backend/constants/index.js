const { config } = require("dotenv")
config()

module.exports = {
      DB: {
            DB_URL: process.env.DB_URL
      },
      SERVER: {
            SERVER_PORT: process.env.PORT || 3000
      },
      JWT: process.env.JWT_SECRET,
      GOOGLE: {
            CLIENT_ID: process.env.CLIENT_ID,
            CLIENT_SECRET: process.env.CLIENT_SECRET,
            CALLBACK_URL: process.env.CALLBACK_URL
      },
      FRONTEND_URL : process.env.FRONTEND_URL
};
