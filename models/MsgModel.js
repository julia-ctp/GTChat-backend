const supabase = require('../config/supabase')
const UserModel = require('../models/UserModel')

class MsgModel {
    static list = [
        {
            id: 1,
            userId: 1,
            msg: 'sgdjhghdkjhdkj',
        }
    ]

    static async read() {
        // return MsgModel.list
        const list = await supabase.from(msgs).select('*')
        return list 
    }

    static async getById(id) {
        const msg = await supabase.from(msgs).select('*').eq(id)
        return msg
    }

    static async create(data) {
        const msg = await supabase.from(msgs).insert({
            userId: UserModel.getById(id),
            msg: data
        })
        return msg
    }

    static async update(id, data) {
        const index = MsgModel.list.findIndex(item => item.id === Number(id))
        return MsgModel.list[index] = data
    }

    static async delete(id) {
        const index = MsgModel.list.findIndex(item => item.id === Number(id))
        MsgModel.list.splice(index, 1)
    }
}

module.exports = MsgModel