import { getMovieDetails } from "./getApiResponse.mjs";
import { convertRuntime } from "../util.mjs";
import getMovieLink from "./getMovieLink.mjs";

export default async function renderMovieWithID(movieID, templateFn) {

    const IMAGE_BASE = "https://image.tmdb.org/t/p";
    const POSTER_SIZE = "/w342";
    const BACKDROP_SIZE = "/w780";

    const movie = await getMovieDetails(movieID);
    const us = movie.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
    movie.certification = us?.release_dates?.[0]?.certification ?? "";

    const posterPath = movie.poster_path ? `${IMAGE_BASE}${POSTER_SIZE}${movie.poster_path}` : "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png";
    const backdropPath = movie.backdrop_path ? `${IMAGE_BASE}${BACKDROP_SIZE}${movie.backdrop_path}` : posterPath;
    const movieRating = movie.certification || "—";
    const runTime = movie.runtime ? convertRuntime(movie.runtime) : "—";
    const movieLink = getMovieLink(movie.homepage, movie.imdb_id, movie.title);
    const genres = movie.genres;

    console.log(movie);

    const html = templateFn(
        backdropPath,
        movie.title,
        movie.overview || "",
        movieRating,
        movie.vote_average ?? 0,
        runTime,
        posterPath,
        movieLink,
        movie.id
    );
    return { html, movie };
}