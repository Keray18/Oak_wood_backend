const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const userRoute = require('./routes/userRoute.js')


dotenv.config()
const app = express()

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(userRoute)



app.listen(process.env.PORT, () => {
    console.log(`Server up and running...`)
})