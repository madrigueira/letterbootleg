// Abrir e fechar menu de navegação (Nav) no mobile
function toggleNav() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// Fechar popup de lista de filme
function togglePopupList() {
  document.querySelector(".popupList").classList.toggle("active");
}

// Preencher posters quando não tiver favorito
const favoriteGrid = document.querySelector(".favoriteGrid");
const popupList = document.querySelector(".popupList");
const list = document.querySelector(".list");
function preencherDivs() {
  var currentDivs = favoriteGrid.querySelectorAll(".poster").length;

  for (var i = currentDivs; i < 4; i++) {
    var fakePoster = document.createElement("div");
    fakePoster.className = "poster";
    favoriteGrid.appendChild(fakePoster);

    fakePoster.addEventListener("click", async function () {
      const response = await fetch("http://localhost:3000/filmes");
      const filmes = await response.json();
      const filmesFiltrados = filmes.filter((filme) => filme.favorito != true);
      list.innerHTML = "";
      togglePopupList();

      filmesFiltrados.forEach((filme) => {
        const tituloFilme = document.createElement("p");
        tituloFilme.textContent = filme.titulo;
        tituloFilme.addEventListener(
          "click",
          async function () {
            editFavorito(filme._id, true);
            togglePopupList();
          },
          { once: true }
        );
        list.appendChild(tituloFilme);
      });
    });
  }
}

async function loadFilmes() {
  const response = await fetch("http://localhost:3000/filmes");
  const filmes = await response.json();
  const filmesFiltrados = filmes.filter((filme) => filme.favorito == true);

  filmesFiltrados.forEach((filme) => {
    const poster = document.createElement("div");
    const infoAno = document.createElement("a");
    const infoNota = document.createElement("a");
    const boxButtons = document.createElement("div");
    const buttonEdit = document.createElement("button");
    poster.classList.add("poster");
    poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster})`;
    infoAno.textContent = filme.ano;
    infoNota.textContent = `★ ${filme.nota}`;
    boxButtons.classList.add("boxButtons");
    favoriteGrid.appendChild(poster);
    poster.appendChild(infoAno);
    poster.appendChild(infoNota);
    poster.appendChild(boxButtons);
    boxButtons.appendChild(buttonEdit);

    buttonEdit.addEventListener("click", function () {
      editFavorito(filme._id, false);
    });
  });
}

async function editFavorito(id, favorito) {
  const response = await fetch(`http://localhost:3000/filmes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorito }),
  });

  if (response.ok) {
    favoriteGrid.innerHTML = "";
    executarFuncoes();
  } else {
    alert("Erro ao deletar filme");
  }
}

// Executa as duas funções na ordem
async function executarFuncoes() {
  await loadFilmes();
  preencherDivs();
}
executarFuncoes();
