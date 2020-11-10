const express = require('express')
const app = express()
const router = require('./routes/person')
const connectdb = require('./config/connectdb')

//middleware
app.use(express.json())

app.use("/persons", router)

// Connection database
connectdb()

// Connection server
const port = process.env.PORT || 4000
app.listen(port, (error) => {
    error ? console.log("Connection failed") : console.log(`Server in running on port ${port}`)
})