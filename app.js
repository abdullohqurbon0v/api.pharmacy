require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const PORT = 4040 || process.env.PORT
const AuthRouter = require('./routes/index')
const cors = require('cors')
app.use(cors({
     origin: "*",
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get('', (req, res) => {
     res.json({ message: "Backend" })
})


app.use(express.json())
app.use('/api/user', AuthRouter)

app.listen(PORT, () => {
     console.log(`Server has been started on PORT http://localhost:${PORT}`)
     mongoose.connect(process.env.MONGO_URL).then(() => {
          console.log("Data Base connected")
     }).catch(() => {
          console.log("Data Base error")
     })
})
