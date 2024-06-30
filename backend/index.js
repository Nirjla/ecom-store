const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    allowHeaders :['Content-Type', 'Authorization'],
    exposeHeaders :['Content-Type', 'Authorization']
}));

const routes = require("./routes")
app.use('/api', routes)

app.get('/', (req, res) => {
    return res.json({
        message:
            "Hello from /"
    })
})

const mongoose = require('mongoose')
const { DB, SERVER } = require("./constants")

mongoose.connect(DB.DB_URL).then(() => {
    console.log(`[MongoDB]: connected`)

    app.listen(SERVER.SERVER_PORT, () => {
        console.log(`[SERVER]: listening on port ${SERVER.SERVER_PORT}`)
    })
}).catch(err => {
    console.log(err)
})


