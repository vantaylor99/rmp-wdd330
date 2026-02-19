import { getFormEntryObject } from "./form.mjs";
import { getMovieObject } from "./modules/getApiResponse.mjs";
import { qualifyResultsAndGetMovieArray } from "./modules/getRandomMoviesFromPageObject.mjs";
import { setClick } from "./util.mjs";
import { vibeToWithGenres } from "./util.mjs";
import { renderMovieList } from "./movieList.mjs";
import { getRandomMovieIndexes } from "./modules/getRandomMoviesFromPageObject.mjs";
import { getMovieDetails } from "./modules/getApiResponse.mjs";

setClick('#find-movies', async () => {
    const formEntryObject = getFormEntryObject();
    const filters = {};

    filters.startYear = formEntryObject.yearRange.startYear;
    filters.endYear = formEntryObject.yearRange.endYear;

    const allGenreIds = [];
    formEntryObject.vibes.forEach(vibe => {
        const genreString = vibeToWithGenres(vibe);
        const ids = genreString.split('|').filter(Boolean);
        allGenreIds.push(...ids);
    });
    if (allGenreIds.length > 0) {
        const uniqueIds = [...new Set(allGenreIds)];
        filters.genres = uniqueIds.join('|');
    }

    const ratingOrder = ['g', 'pg', 'pg-13', 'r', 'nr'];
    let strictest = null;
    for (const rating of ratingOrder) {
        if (formEntryObject.ratings.includes(rating)) {
            strictest = rating;
        }
    }
    if (strictest) {
        filters.mpaMax = strictest.toUpperCase();
    }

    const movieObject = await getMovieObject(filters);
    const movieArray = await qualifyResultsAndGetMovieArray(filters, movieObject);

    const poolSize = Math.min(25, movieArray.length);
    const poolIndexes = getRandomMovieIndexes(movieArray).slice(0, poolSize);
    const poolMovies = poolIndexes.map(i => movieArray[i]);

    const detailsPromises = poolMovies.map(movie => getMovieDetails(movie.id));
    const detailsResults = await Promise.all(detailsPromises);
    detailsResults.forEach((movie) => {
        const us = movie.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
        const nonEmptyUsCert = us?.release_dates
            ?.map((rd) => (rd.certification || "").toUpperCase().trim())
            .find((cert) => cert.length > 0);
        movie.certification = nonEmptyUsCert ?? "";
    });

    const allowed = detailsResults.filter((movie) => {
        const cert = (movie.certification || "").toUpperCase().trim();
        if (cert === "NR" || cert === "") return strictest === "r";
        return true;
    });

    const pickIndexes = getRandomMovieIndexes(allowed).slice(0, 3);
    const toShow = pickIndexes.map(i => allowed[i]);
    renderMovieList(toShow, ".movie-results");

})