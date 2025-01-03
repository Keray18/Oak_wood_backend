const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const multer = require('multer')
const userRoute = require('./routes/userRoute.js')
const db = require('./config/Database.js')

dotenv.config()
const app = express()
const upload = multer()

app.use(express.json())
app.use(upload.none());

(async () => {
    try {
        await db.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error during database sync:', error);
    }
})()

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://oakwood18.netlify.app']
}))

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

// app.use((req, res, next) => {
//     console.log('Request Headers:', req.headers);
//     console.log('Request Body:', req.body);
//     next();
// });


app.use(userRoute)



app.listen(process.env.PORT, () => {
    console.log(`Server up and running...`)
})