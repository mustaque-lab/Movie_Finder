//http://www.omdbapi.com/?apikey=77bc07c9&s=mummy

document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const movieResults = document.getElementById('movieResults');

    movieForm.addEventListener('submit', async (e) => {
        const movieName = document.getElementById('movieInput').value;
        //prevent the browser default
        e.preventDefault();
        await searchMovies(movieName);
    });

    //search for movies
    async function searchMovies(movieName) {
        try {
            //loading
            movieResults.innerHTML = '<div class="loading">Searching movies...</div>';
            const response = await fetch(`http://www.omdbapi.com/?apikey=77bc07c9&s=${movieName}`);
            const data = await response.json();
            if (data.response === 'false') {
                throw new Error(data.Error || 'No movies found');
            }
            displayMovies(data.Search);
        } catch (error) {
            movieResults.innerHTML = `
            <div class="error-message">
                ${error.message ||
                "Error searching movies. Please try again."
                } again.'
            </div>`;
        }
    }

    //display all the movies
    function displayMovies(movies) {
        movieResults.innerHTML = `
            <div class='movies-grid'>
                ${movies.map((movie) => `
                    <div class="movie-card">
                        <img 
                            src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}"
                            alt='${movie.Title}'
                            class='movie-poster'
                        />
                        <div class='movie-info'>
                            <h3 class='movie-title'>${movie.Title}</h3>
                            <div class='movie-year'>${movie.Year}</div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }
});


















