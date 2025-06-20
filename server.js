const express = require('express');
const cors = require('cors');
const RoomRouter = require('./routes/RoomRoute');
const MsgRouter = require('./routes/MsgRoute');
const AuthRouter = require('./routes/AuthRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(RoomRouter);
app.use(MsgRouter);
app.use(AuthRouter);

app.get('/', (req, res) => {
    res.send('API Supabase funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
