const supabase = require('../config/supabase');

class MsgModel {
    static async getAll() {
        const { data, error } = await supabase.from('messages').select('*');
        console.log(data)
        if (error) throw error;
        return data;
    }

    static async getById(id) {
        const { data, error } = await supabase.from('messages').select('*').eq('id', id);
        if (error) throw error;
        return data[0];
    }

    static async create(msgData) {
        const { data, error } = await supabase.from('messages').insert([{
            userid: msgData.userid,
            content: msgData.content,
            groupid: msgData.groupid,
            user_name: msgData.user_name,
            user_profile_img: msgData.user_profile_img
        }]).select('*');

        if (error) {
            console.error('Erro ao inserir:', JSON.stringify(error, null, 2));
            throw error;
        }

        return data[0];
    }

    static async update(id, msgData) {
        const { data, error } = await supabase.from('messages').update(msgData).eq('id', id).select('*');
        if (error) throw error;
        return data[0];
    }

    static async delete(id) {
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) throw error;
        return true;
    }
}

module.exports = MsgModel;
