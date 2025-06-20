const express = require('express');
const supabase = require('../config/supabase');

const RoomRouter = express.Router();

RoomRouter.get('/salas', async (req, res) => {
  const { data, error } = await supabase.from('rooms').select('*');
  if (error) return res.status(500).json({ message: 'Erro ao buscar salas', error: error.message });
  res.json(data);
});

module.exports = RoomRouter;