import { getMovieObject } from "./getApiResponse.mjs";
import { getRandomNumberFromMax } from "../util.mjs";

export function getRandomMovieIndexes(array) {

    const arrayLength = array.length;
    const randomIndexes = [];

    while (randomIndexes.length < arrayLength) {
        const randomNumber = getRandomNumberFromMax(arrayLength)

        if (!randomIndexes.includes(randomNumber)) {
            randomIndexes.push(randomNumber)
        }
    }
    return randomIndexes;
}


export async function qualifyResultsAndGetMovieArray(filters, movieListObject) {
    const totalPages = movieListObject.totalPages;
    const page = movieListObject.page
    let finalMovieList = movieListObject.movies
    const arrayLength = finalMovieList.length;


    if (arrayLength >= 3) {
        return finalMovieList;
    }

    if (arrayLength < 3 && totalPages === 1) {
        return finalMovieList;
    }

    if (arrayLength === 0 && totalPages === 0) {
        console.log("nothing")
        return [];
    }

    if (arrayLength < 3 && totalPages > page) {

        const nextPageFilters = { ...filters, page: page + 1 };

        const secondMovieListObject = await getMovieObject(nextPageFilters);

        if (secondMovieListObject.movies && secondMovieListObject.movies.length > 0) {
            finalMovieList = finalMovieList.concat(secondMovieListObject.movies);
        }
    }

    return finalMovieList;
}
