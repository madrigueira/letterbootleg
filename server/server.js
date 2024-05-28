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
  nota: Number,
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

app.delete('/filmes/:id', async (req, res) => {
  try {
    const filme = await Filme.findByIdAndDelete(req.params.id);
    if (!filme) {
      return res.status(404).send('Filme não encontrado');
    }
    res.status(200).send('Filme deletado com sucesso');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/filmes/:id', async (req, res) => {
  try {
    const filme = await Filme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!filme) {
      return res.status(404).send('Filme não encontrado');
    }
    res.status(200).json(filme);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
