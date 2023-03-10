const dotenv = require('dotenv').config()
const express = require('express')
const connectDB = require('./config/dbConfig')
const cors = require('cors')
const noteRoute = require('./routes/noteRoute')
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorHandler')
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/api/notes/',noteRoute)
app.use('/api/auth/',userRoute)
app.use(errorHandler)
const port = 5000 || process.env.PORT
app.listen(port,()=>{
    console.log(`Server is listening on PORT: ${port}`)
})
