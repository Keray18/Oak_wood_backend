const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const userRoute = require('./routes/userRoute.js')
const db = require('./config/Database.js')

dotenv.config()
const app = express()

;(async () => {
    try {
        await db.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error during database sync:', error);
    }
})()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))



app.use(express.json())
app.use(userRoute)



app.listen(process.env.PORT, () => {
    console.log(`Server up and running...`)
})