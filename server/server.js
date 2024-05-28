const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/letterbootleg', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o Mongo:'));
db.once('open', () => {
  console.log('Conectado ao Mongo');
});

const letterbootlegSchema = new mongoose.Schema({
  titulo: String,
  ano: Number,
  poster: String,
  nota: Number,
  favorito: Boolean,
});

const letterbootleg = mongoose.model('filme', letterbootlegSchema);

app.get('/filmes', async (req, res) => {
  try {
    const filmes = await letterbootleg.find();
    res.json(filmes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/filmes', async (req, res) => {
  const novoFilme = new letterbootleg(req.body);
  try {
    const filmeSalvo = await novoFilme.save();
    res.status(201).json(filmeSalvo);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/filmes/:id', async (req, res) => {
  try {
    const filme = await letterbootleg.findByIdAndDelete(req.params.id);
    if (!filme) {
      return res.status(404).send('Filme não encontrado');
    }
    res.status(200).send('Filme deletado!');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/filmes/:id', async (req, res) => {
  try {
    const filme = await letterbootleg.findByIdAndUpdate(req.params.id, req.body, {
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
  console.log(`Rodando em http://localhost:${port}`);
});
