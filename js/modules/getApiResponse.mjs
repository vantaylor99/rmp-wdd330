import { getRandomNumberFromMax } from "../util.mjs";

export async function getMovieObject(filters) {
    const myApiKey = window.__APP_CONFIG__.TMDB_API_KEY;

    const baseParams = {
        api_key: myApiKey,
        sort_by: "popularity.desc",
        language: "en-US",
        include_adult: "false",
        "primary_release_date.gte": `${filters.startYear}-01-01`,
        "primary_release_date.lte": `${filters.endYear}-12-31`,
    }

    if (filters.genres) {
        baseParams.with_genres = filters.genres;
    }

    if (filters.mpaMax) {
        baseParams.certification_country = "US";
        baseParams["certification.lte"] = filters.mpaMax;
    }



    const firstUrl = generateUrlFromQueryString(baseParams)
    const firstData = await getDataFromUrl(firstUrl)
    const total_pages = firstData.total_pages;
    const randomPage = getRandomNumberFromMax(total_pages)


    baseParams.page = randomPage + 1


    const finalUrl = generateUrlFromQueryString(baseParams)
    const finalData = await getDataFromUrl(finalUrl)

    return {
        movies: finalData.results,
        totalPages: total_pages,
        page: baseParams.page
    };
}

export async function getMovieDetails(movieId) {
    const DETAILS_URL = "https://api.themoviedb.org/3";
    const myApiKey = window.__APP_CONFIG__.TMDB_API_KEY;
    const url = `${DETAILS_URL}/movie/${movieId}?api_key=${myApiKey}&append_to_response=release_dates`;
    const data = await getDataFromUrl(url);
    return (data);
}




export function generateUrlFromQueryString(baseParams) {
    const baseURL = "https://api.themoviedb.org/3/discover/movie";
    const query = new URLSearchParams(baseParams).toString();

    return `${baseURL}?${query}`
}


export async function getDataFromUrl(url) {
    const results = await fetch(url);
    if (!results.ok) throw new Error(results.status);
    const data = await results.json();

    return data;
}