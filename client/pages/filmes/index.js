// Abrir e fechar menu de navegação (Nav) no mobile
function toggleNav() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// Abrir e fechar popup de alerta
function togglePopupAlert(popup, action) {
  const popupAlert = document.querySelector(`.${popup}`);
  if (action == "close") {
    popupAlert.classList.remove("active");
  } else {
    popupAlert.classList.add("active");
  }
}

// Fechar popup de cadastro de filme
function closePopupMovie() {
  document.querySelector(".popupMovie").classList.remove("active");
}

// API --------------------------------------------------------------------

// Div grid onde vão aparecer os filmes
const gridMovies = document.querySelector(".gridMovies");

// Função para carregar os filmes cadastrados
async function loadFilmes() {
  const response = await fetch("http://localhost:3000/filmes");
  const filmes = await response.json();
  filmes.forEach((filme) => {
    const poster = document.createElement("div");
    const infoAno = document.createElement("a");
    const infoNota = document.createElement("a");
    const boxButtons = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");
    poster.classList.add("poster");
    poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster})`;
    infoAno.textContent = filme.ano;
    infoNota.textContent = `★ ${filme.nota}`;
    boxButtons.classList.add("boxButtons")
    gridMovies.appendChild(poster);
    poster.appendChild(infoAno);
    poster.appendChild(infoNota);
    poster.appendChild(boxButtons);
    boxButtons.appendChild(buttonDelete);
    boxButtons.appendChild(buttonEdit);

    buttonDelete.addEventListener("click", function () {
      deleteFilme(filme._id);
    });

    buttonEdit.addEventListener("click", function () {
      document.querySelector(".popupMovie").classList.add("active");
      editFilme(filme);
    });
  });
}

// Função para deletar um filme
async function deleteFilme(id) {
  const response = await fetch(`http://localhost:3000/filmes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    togglePopupAlert("popupDeletar", "open");
    gridMovies.innerHTML = "";
    loadFilmes();
  } else {
    alert("Erro ao deletar filme");
  }
}

// Função para editar a nota de um filme
function editFilme(filme) {
  document.querySelector("#titulo").value = filme.titulo;
  document.querySelector("#ano").value = filme.ano;
  document.querySelector(
    `input[name="nota"][value="${filme.nota}"]`
  ).checked = true;
  document.querySelector(".posterPopup").style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster})`;

  const formMovie = document.getElementById("formMovie");

  formMovie.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();
      const nota = document.querySelector('input[name="nota"]:checked').value;

      const response = await fetch(
        `http://localhost:3000/filmes/${filme._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nota }),
        }
      );

      if (response.ok) {
        togglePopupAlert('popupEditar', 'open')
        gridMovies.innerHTML = "";
        loadFilmes();
        closePopupMovie();
      } else {
        alert("Erro ao editar filme");
      }
    },
    { once: true }
  );
}

loadFilmes();