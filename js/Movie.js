import axios from "axios";

export default class Movie {
  constructor(movie, holder) {
    this._movie = movie;
    this._holder = holder;
    this._movieRef = this.generateHtml();
    this.setEvents();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-md-2">
        <div class="well text-center">
            <img class="img-fluid" src="${this._movie.Poster}">
            <h5>${this._movie.Title}</h5>
            <button "type="button" id="btn" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Detail
          </button>
        </div>      
      </div>
      `
    );
    return [...this._holder.querySelectorAll(".col-md-2")].reverse()[0];
  }
  setEvents() {
    this._movieRef.querySelectorAll(".btn").forEach(el =>
      el.addEventListener(
        "click",
        function(e) {
          sessionStorage.setItem("movieId", this._movie.imdbID);
          $("#my-modal").modal("show");
          let movieId = sessionStorage.getItem("movieId");
          axios
            .get("http://www.omdbapi.com/?apikey=e066762a&i=" + movieId)
            .then(response => {
              let movie = response.data;
              console.log(movie);
              document
                .querySelector(".modal-body .container #movie")
                .insertAdjacentHTML(
                  "beforeend",
                  `
              <div class="row">
                <div class="col-md-4">
                  <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                  <h2>${movie.Title}</h2>
                  <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${
                      movie.Genre
                    }</li>
                    <li class="list-group-item"><strong>Released:</strong> ${
                      movie.Released
                    }</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${
                      movie.Rated
                    }</li>
                    <li class="list-group-item"><strong>IMDB:</strong> ${
                      movie.imdbRating
                    }</li>
                    <li class="list-group-item"><strong>Director:</strong> ${
                      movie.Director
                    }</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${
                      movie.Writer
                    }</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${
                      movie.Actors
                    }</li>
                  </ul>  
                </div>
              </div>
              <div class="row">
                <div class"well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${
                      movie.imdbID
                    }" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    <a href="https://www.imdb.com/video/imdb/vi2477195545?playlistId=${
                      movie.imdbID
                    }&ref_=tt_ov_vi" class="btn btn-primary">Watch trailer</a>
                </div>
              </div>
              `
                );
            })
            .catch(error => {
              return "An error occured.." + error;
            });
        }.bind(this)
      )
    );
  }
}
