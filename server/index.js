require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes.js')

const app = express();

// middleware
app.use(cors()); // give browser access to API
app.use(express.json()); // give server read data JSON format

// Using route by presix api/auth
app.use('/api/auth', authRoutes)

// test basic route
app.get('/', (req, res) => {
    res.send('API SIAKAD IS RUNNING...')
}) 

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
})