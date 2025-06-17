const MsgModel = require('../models/MsgModel')

class MsgController {
    read(req, res) {
        const msg = MsgModel.read()
        return res.json(msg)
    }

    getById(req, res) {
        const id = req.params.id
        return res.json(MsgModel.getById(id))
    }

    create(req, res) {
        const id = req.params.id
        const body = req.body
        MsgModel.create(id, body)
        return res.status(200).json({
            message: 'Mensagem criada com sucesso'
        })
    }

    update(req, res) {
        const id = req.params.id
        const body = req.body
        MsgModel.update(id, body)
        return res.json({
            message: 'Mensagem atualizada com sucesso'
        })
    }

    delete(req, res) {
        const id = req.params.id 
        MsgModel.delete(id)
        return res.json({
            message: 'Mensagem deletada com sucesso'
        })
    }
}

module.exports = MsgController