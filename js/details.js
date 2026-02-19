import { qs, getParam, renderWithTemplate, buildMovieDetailViewTemplate } from "./util.mjs";
import renderMovieWithID from "./modules/renderMovieWithID.mjs";

const movieResultsDiv = qs(".movie-details-div");

async function initDetails() {
    const movieID = getParam("movieID");
    if (!movieID) {
        movieResultsDiv.innerHTML = `<p class="center-text">No movies to display.</p>`;
        return;
    }
    const result = await renderMovieWithID(movieID, buildMovieDetailViewTemplate);
    renderWithTemplate(result.html, movieResultsDiv, null, null);

    const gifDiv = qs(".gif-div")

}


initDetails();

