const express = require('express')
const MsgController = require('../controllers/MsgController')

const msgController = new MsgController

const MsgRouter = express.Router()

MsgRouter.get('/mensagens', msgController.read)
MsgRouter.get('/mensagens/:id', msgController.getById)
MsgRouter.post('/mensagens', msgController.create)
MsgRouter.put('/mensagens/:id', msgController.update)
MsgRouter.delete('/mensagens/:id', msgController.delete)

module.exports = MsgRouter