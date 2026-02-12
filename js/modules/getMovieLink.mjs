export default function getMovieLink(homepage, imdb_id, title) {
    if (homepage && homepage !== "") {
        return homepage
    }
    else if (imdb_id && imdb_id !== "") {
        return `https://imdb.com/title/${imdb_id}/`
    }
    else {
        const query = encodeURIComponent(title + " movie")
        return `https://www.google.com/search?q=${query}`
    }
}