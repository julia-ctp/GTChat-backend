const MsgModel = require('../models/MsgModel');
const supabase = require('../config/supabase');

class MsgController {
    async getAll(req, res) {
        try {
            const msgs = await MsgModel.getAll();
            console.log(msgs);
            return res.json(msgs);
            
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar mensagens', error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const msg = await MsgModel.getById(id);
            if (!msg) return res.status(404).json({ message: 'Mensagem não encontrada' });
            return res.json(msg);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar mensagem', error: err.message });
        }
    }

    async create(req, res) {
        try {
            // const newMsg = await MsgModel.create(req.body);
            console.log('User autenticado:', req.user);
            const { content, groupid } = req.body;

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('avatar_url')
                .eq('id', req.user.id)
                .single();
                
            // const avatarUrl = userData?.avatar_url || 'https://via.placeholder.com/40';
            const avatarUrl = 'https://hawwfnlfgyrrdngwmuef.supabase.co/storage/v1/object/public/profile//photo-final.webp';

            const newMsg = await MsgModel.create({
                userid: req.user.id,
                content,
                groupid,
                user_name: req.user.name,
                user_profile_img: avatarUrl
            });
            return res.status(201).json({ data: newMsg, message: 'Mensagem criada com sucesso!' });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao criar mensagem', error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updatedMsg = await MsgModel.update(req.params.id, req.body);
            return res.json({ data: updatedMsg, message: 'Mensagem atualizada com sucesso!' });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao atualizar mensagem', error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await MsgModel.delete(req.params.id);
            return res.json({ message: 'Mensagem deletada com sucesso!' });
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao deletar mensagem', error: err.message });
        }
    }
}

module.exports = MsgController;