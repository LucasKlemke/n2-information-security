const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitize = require('../utils');
require('dotenv').config();


exports.createUser = async (req, res) => {
  const { name, email, password } = req.body; 
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(
      query,
      [sanitize(name), sanitize(email), hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao registrar' });
        res.status(201).json({ id: result.insertId, name, email });
      }
    );
  } catch (err) {
    console.error('Erro ao registrar usuário:', err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [sanitize(email)], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.getAllUsers = (req, res) => {
  connection.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) return res.status(500).send('Erro ao buscar usuários');
    res.status(200).json(results);
  });
};

exports.getUserById = (req, res) => {
  const query = 'SELECT id, name, email FROM users WHERE id = ?';
  connection.query(query, [sanitize(req.params.id)], (err, results) => {
    if (err) return res.status(500).send('Erro ao buscar usuário');
    if (results.length === 0) return res.status(404).send('Usuário não encontrado');
    res.status(200).json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  connection.query(query, [sanitize(name), sanitize(email), sanitize(req.params.id)], (err, result) => {
    if (err) return res.status(500).send('Erro ao atualizar');
    if (result.affectedRows === 0) return res.status(404).send('Usuário não encontrado');
    res.status(200).json({ id: req.params.id, name, email });
  });
};

exports.deleteUser = (req, res) => {
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [sanitize(req.params.id)], (err, result) => {
    if (err) return res.status(500).send('Erro ao deletar');
    if (result.affectedRows === 0) return res.status(404).send('Usuário não encontrado');
    res.status(204).send();
  });
};