import { qs } from "./util.mjs";
import calculateRating from "./modules/calculateRating.mjs";
import { convertRuntime } from "./util.mjs";


function buildMovieTemplate(imgSrc, movieTitle, movieDescription, movieRating, vote_average, runTime, movieID) {

    const stars = calculateRating(vote_average);

    const template = `
    <div class="home-movie-div">
        <div class="home-movie-col1">
            <a href="detailed_view/index.html?movieID=${movieID}">
                <img src="${imgSrc}" alt="Poster image of ${movieTitle}">
            </a>
            <a href="detailed_view/index.html?movieID=${movieID}">
                <h3>${movieTitle}</h3>
            </a>
            <p>${movieRating}</p>
        </div>
        <div class="home-movie-col2">
            <p><strong><a href="detailed_view/index.html?movieID=${movieID}">${movieTitle}: </a></strong>${movieDescription}</p>
            <a href="detailed_view/index.html?movieID=${movieID}">
                <span class="stars">${stars}</span>
            </a>
            <p><strong>Runtime: </strong>${runTime}</p>
        </div>
    </div>
        `
    return template;
}



export function renderMovieList(movieArray, parentDiv) {
    const movieResultsDiv = qs(parentDiv);
    movieResultsDiv.innerHTML = ``
    movieArray.forEach(movie => {
        const imgSrc = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
        const movieTitle = movie.title;
        const movieDescription = movie.overview;
        const movieRating = movie.certification;
        const vote_average = movie.vote_average;
        const runTime = convertRuntime(movie.runtime);
        const movieID = movie.id;

        const movieTemplate = buildMovieTemplate(imgSrc ?? "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png", movieTitle, movieDescription, movieRating, vote_average, runTime, movieID)
        movieResultsDiv.insertAdjacentHTML('beforeend', movieTemplate);
    });


}
