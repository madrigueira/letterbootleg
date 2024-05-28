
![Letterbootleg](./client/assets/logo.png)

## 🎞️ Descrição
Projeto de site para cadastro e classificação dos seus filmes assistidos utilizando a API do <a href="https://www.themoviedb.org/?language=pt-BR">The Movie Data Base</a>.


## 📝 Conteúdo
- [Features](#features)
- [Pré-requisitos](#pre-requisitos)
- [Tecnologias](#tecnologias)
- [Mapa do Projeto](#mapa-do-projeto)


## 💡 Features <a id="features"></a>
- ✅ Exibição e Pesquisa de filmes
- ✅ Cadastro de filmes no perfil
- ✅ Avaliação de filmes assistidos
- ✅ Lista de Favoritos
- ✅ Adicionar os 4 favoritos no perfil


## 💻 Pré-requisitos <a id="pre-requisitos"></a>
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/), [Node](https://nodejs.org/en), [npm](https://www.npmjs.com/) e [MongoDB](https://www.mongodb.com/try/download/community) (Community Server). *Vericiar se o MongoDB Database Server está rodando no gerenciador de tarefas*.

Para rodar o projeto você deve clonar o repositório e iniciar o server.js
```bash
# Clone este repositório
$ git clone https://github.com/madrigueira/letterbootleg.git

# Acesse a pasta client e instale os pacotes necessários
$ cd letterbootleg/client
$ npm i

# Acesse a pasta server e instale os pacotes necessários
$ cd ../server
$ npm i

# Rode o servidor Express para fazer conexão com o MongoDB e configurar os endpoints
$ node server.js

# Rodando em http://localhost:3000
# Conectado ao Mongo
```
Agora basta abrir o arquivo client/index.html e cadastrar seus filmes :)

## ⚙️ Tecnologias <a id="tecnologias"></a>
- HTML
- [Sass](https://sass-lang.com/)
- Javascript
- [Node](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) 
- [MongoDB](https://www.mongodb.com/try/download/community)


## 📂 Mapa do Projeto <a id="mapa-do-projeto"></a>
```bash
├───client  #Front do projeto
│   ├───assets
│   ├───node_modules
│   ├───pages
│   │   ├───filmes
│   │   ├───log
│   │   └───perfil
│   └───style
└───server  #Back do projeto
    └───node_modules
```