const express = require("express")
const app = express();
const itemRoutes = require("./itemRoutes")
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes")
app.use("/auth", authRoutes)
app.use("/items", itemRoutes)
app.use("/cart", cartRoutes)
module.exports = app