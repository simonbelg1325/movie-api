import "../css/style.scss";
import axios from "axios";
import Movie from "./Movie";

const bodyRef = document.querySelector("#movies");
const input = document.querySelector("#searchText");
document.querySelector("#searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let searchText = input.value;
  getMovies(searchText);
});

function getMovies(searchText) {
  axiosGet("http://www.omdbapi.com/?apikey=e066762a&s=", searchText);
}

function axiosGet(url, value) {
  return axios
    .get(url + value)
    .then(response => {
      response.data.Search.forEach(el => {
        new Movie(el, bodyRef);
      });
    })
    .catch(error => {
      return "An error occured.." + error;
    });
}
