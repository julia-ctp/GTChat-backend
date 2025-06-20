const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET || 'chave_secreta_muito_segura';

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, password: hashedPassword }])
        .select();

      if (error) throw error;

      const user = data[0];
      const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: '7d' });

      return res.status(201).json({ token, user });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) return res.status(401).json({ message: 'Usuário não encontrado' });

      const match = await bcrypt.compare(password, data.password);
      if (!match) return res.status(401).json({ message: 'Senha inválida' });

      const token = jwt.sign({ id: data.id, name: data.name }, SECRET, { expiresIn: '7d' });

      return res.json({ token, user: { id: data.id, name: data.name } });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
    }
  }
}

module.exports = AuthController;
