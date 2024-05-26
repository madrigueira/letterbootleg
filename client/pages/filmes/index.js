// Linkando os components via load JQuery 
$("#header").load("/client/components/header/index.html");

const filmeList = document.querySelector('.gridMovies');

async function loadFilmes() {
  const response = await fetch('http://localhost:3000/filmes');
  const filmes = await response.json();
  filmes.forEach(filme => {
      const div = document.createElement('div');
      const a1 = document.createElement('a');
      const a2 = document.createElement('a');
      const button = document.createElement('button');
      const button2 = document.createElement('button');
      div.classList.add("poster")
      div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${filme.poster})`;
      a1.textContent = filme.ano
      a2.textContent = `★ ${filme.nota}`
      filmeList.appendChild(div);
      div.appendChild(a1);
      div.appendChild(a2);
      div.appendChild(button);
      div.appendChild(button2);

      button.addEventListener("click", function() {
        deleteFilme(filme._id);
      })

      button2.addEventListener("click", function() {
        document.querySelector(".popupMovieLog").classList.add("active")
        editFilme(filme);      
      })
  });
}

async function deleteFilme(id) {
  const response = await fetch(`http://localhost:3000/filmes/${id}`, {
      method: 'DELETE'
  });

  if (response.ok) {
      filmeList.innerHTML = ''
      loadFilmes();
  } else {
      alert('Erro ao deletar filme');
  }
}

function editFilme(filme) {
  document.querySelector("#titulo").value = filme.titulo;
  document.querySelector("#ano").value = filme.ano;
  document.querySelector(`input[name="nota"][value="${filme.nota}"]`).checked = true;

  const formLogMovie = document.getElementById('formLogMovie');

  formLogMovie.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nota = document.querySelector('input[name="nota"]:checked').value;
  
      const response = await fetch(`http://localhost:3000/filmes/${filme._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nota })
      });
  
      console.log(nota)
      alert("filme cadastrado!")
  });

  if (response.ok) {
    filmeList.innerHTML = ''
    loadFilmes();
} else {
    alert('Erro ao deletar filme');
}
}

function closePopup(){
  document.querySelector(".popupMovieLog").classList.remove("active")
}



loadFilmes();