const express = require('express')
const MsgRouter = require('./routes/MsgRouter')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(MsgRouter)

app.get('/', (req, res) => {
    res.send('qualquer coisa')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})