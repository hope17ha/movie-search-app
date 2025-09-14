const APIkey = "3f5611f0";
const baseURL = "http://www.omdbapi.com/";

const form = document.getElementById("movie-form");
const movieTitleInput = document.getElementById("movie-input");
const movieTitle = document.getElementById("movie-title");
const year = document.getElementById("movie-year");
const genre = document.getElementById("movie-genre");
const description = document.getElementById("movie-plot");
const rating = document.getElementById("movie-rating");
const image = document.getElementById("movie-poster");
const movieDiv = document.getElementById("movie-result");

const moreBtn = document.getElementById("more-btn");
const movieDirector = document.getElementById('movie-director');
const movieCast = document.getElementById('movie-cast');
const movieAwards = document.getElementById('movie-awards');
const movieRuntime = document.getElementById('movie-runtime');
const moreInfoDiv = document.getElementById('more-info')

const spinner = document.getElementById('loading-spinner');

const historyContainer = document.getElementById('search-history');


function saveHistory(movieTitle) {
    let history = JSON.parse(localStorage.getItem('movieSearchItem')) || [];

    history = history.filter(m => m.toLowerCase() !== movieTitle.toLowerCase());

    history.unshift(movieTitle);

    if (history.length > 7) {
        history.pop();
    }

    localStorage.setItem('movieSearchItem', JSON.stringify(history));

}


function renderSearchHistory() {
    let history = JSON.parse(localStorage.getItem('movieSearchItem')) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>No recent searches.</p>';
        return;
    }

    historyContainer.innerHTML = '<h3>Recent Searches:</h3>';

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    

    history.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie;
        li.style.cursor = 'pointer';
        li.style.color = '#e50914';
        li.style.margin = '5px'


        li.addEventListener('click', () => {
            movieTitleInput.value = movie;
            form.dispatchEvent(new Event('submit')); 
        });

        list.appendChild(li);
    });

    historyContainer.appendChild(list);
}

document.addEventListener('DOMContentLoaded', () => {
    renderSearchHistory();
  });


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movie = movieTitleInput.value.trim();

    if (!movie) {
        alert("You must enter a movie!");
    }

    const url = `${baseURL}?t=${movie}&apikey=${APIkey}`;

    try {
        spinner.classList.remove('hidden');
        const response = await fetch(url);
        const data = await response.json();

        spinner.classList.add('hidden');

        if (data.Response === "False") {
            movieDiv.classList.add("hidden");
            alert(data.Error || "Movie not found!");

            return;
        }

        saveHistory(data.Title);
        renderSearchHistory();

        movieTitle.textContent = data.Title;
        image.src = data.Poster !== "N/A" ? data.Poster : null;
        image.alt = data.Title;
        year.textContent = `Year: ${data.Year}`;
        genre.textContent = `Genre: ${data.Genre}`;
        description.textContent = `Movie plot: ${data.Plot}`;
        rating.textContent = `IMDB rating: ${data.imdbRating}`;


        movieDiv.classList.remove("hidden");

        movieDirector.textContent = `Director: ${data.Director}`;
        movieCast.textContent = `Cast: ${data.Actors}`;
        movieAwards.textContent = `Awards and nominations: ${data.Awards}`;
        movieRuntime.textContent = `Runtime: ${data.Runtime}`;

        moreInfoDiv.classList.add('hidden');
        moreBtn.textContent = 'Show more';
        moreBtn.classList.remove('hidden');





    } catch (error) {
        spinner.classList.add('hidden');
        alert("There is something wrong:" + error.message);
    }



});

moreBtn.addEventListener('click', () => {
    if (moreInfoDiv.classList.contains('hidden')) {
        moreInfoDiv.classList.remove('hidden');
        moreBtn.textContent = 'Show less';
    } else {
        moreInfoDiv.classList.add('hidden');
        moreBtn.textContent = 'More info';
    }

});


