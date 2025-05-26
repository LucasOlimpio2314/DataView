// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'serve.test',
  password: '@Olimpio123773',
  database: 'DataView'
});

// Listar pessoas
app.get('/api/pessoas', (req, res) => {
  db.query('SELECT * FROM pessoas', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Cadastrar pessoa
app.post('/api/pessoas', (req, res) => {
  const pessoa = req.body;
  console.log('Recebido no cadastro:', pessoa);
  db.query('INSERT INTO pessoas SET ?', pessoa, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId });
  });
});

// Listar antecedentes de uma pessoa
app.get('/api/pessoas/:id/antecedentes', (req, res) => {
  db.query('SELECT * FROM antecedentes WHERE pessoa_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Cadastrar antecedente
app.post('/api/antecedentes', (req, res) => {
  const antecedente = req.body;
  db.query('INSERT INTO antecedentes SET ?', antecedente, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId });
  });
});

// Listar todos os antecedentes
app.get('/api/antecedentes', (req, res) => {
  db.query('SELECT * FROM antecedentes', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Atualizar antecedente
app.put('/api/antecedentes/:id', (req, res) => {
  const id = req.params.id;
  const antecedente = req.body;
  db.query('UPDATE antecedentes SET ? WHERE id = ?', [antecedente, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// Excluir antecedente
app.delete('/api/antecedentes/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM antecedentes WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// Obter pessoa por ID
app.get('/api/pessoas/:id', (req, res) => {
  db.query('SELECT * FROM pessoas WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0] || null); // Retorna só o objeto
  });
});

// Excluir pessoa
app.delete('/api/pessoas/:id', (req, res) => {
  const id = req.params.id;
  // Primeiro, exclua os antecedentes relacionados (para não violar FK)
  db.query('DELETE FROM antecedentes WHERE pessoa_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    // Depois, exclua a pessoa
    db.query('DELETE FROM pessoas WHERE id = ?', [id], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ success: true });
    });
  });
});

// Atualizar pessoa
app.put('/api/pessoas/:id', (req, res) => {
  const id = req.params.id;
  const pessoa = req.body;
  db.query('UPDATE pessoas SET ? WHERE id = ?', [pessoa, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.listen(3000, () => console.log('API rodando na porta 3000'));