const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/filme_cadastro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

const filmeSchema = new mongoose.Schema({
  titulo: String,
  poster: String,
  ano: Number,
});

const Filme = mongoose.model('Filme', filmeSchema);

app.get('/filmes', async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/filmes', async (req, res) => {
  const novoFilme = new Filme(req.body);
  try {
    const filmeSalvo = await novoFilme.save();
    res.status(201).json(filmeSalvo);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
