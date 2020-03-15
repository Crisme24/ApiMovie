window.onload = getMovies('movies');

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('searchForm').addEventListener('submit',(e)=>{
    let searchText = document.getElementById('searchText').value;
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=%27' + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let movie = '';
      const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
      document.querySelector('#movies').innerHTML = '';
      movies.forEach(movie => {
        const image = movie.poster_path ? `<img src="${baseImgUrl}${movie.poster_path}">` : '';
        document.querySelector('#movies').innerHTML += `
            <div class="col-md-3">
            <div class="well text-center movie">
            ${image}
            <h6>${movie.title}</h6>
            <span onclick="movieSelected('${movie.id}')" class="btn btn-danger" href="#">Movie Details</span>
            </div>
          </div>
        `;
      
      });
    })
  
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
   sessionStorage.setItem('movieId', id);
   getMovie()
 }

function getMovie() {
   let movieId = sessionStorage.getItem('movieId');

  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cea68b520beecac6718820e4ac576c3a&append_to_response=credits&language=es-ES`)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      const baseImgUrl = 'https://image.tmdb.org/t/p/w185';

      document.querySelector('#movies').innerHTML = `
      <div class="movie">
        <div class="row">
          <div class="col-md-4">
            <img src="${baseImgUrl}${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-6">
            <h4>${movie.title}</h4>
            <ul class="list-group">
              <li class="list-group-item"><strong>Title:</strong> ${movie.title}</li>
              <li class="list-group-item"><strong>Description:</strong> ${movie.overview}</li>
              <li class="list-group-item"><strong>Popularity:</strong> ${movie.popularity}</li>
              <li class="list-group-item"><strong>Date:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>IMDB Rating</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Vote:</strong> ${movie.vote_count}</li>
            </ul>
          </div>
          </div> 
          </div>
        <div class="column">
         <div class="well">
            <h3>Plot</h3>
            ${movie.tagline}
            <hr>
            <a href="${movie.homepage}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-dark target="_blank"">Home</a>
          </div>
        </div>
            `;
    })

    .catch((err) => {
      console.log(err);
    });
}
if (sessionStorage.removeItem('movieId')) {
  getMovie();
  
}
