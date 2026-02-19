import { buildMovieCardTemplate, getLocalStorage, qs } from "./util.mjs";
import renderMovieWithID from "./modules/renderMovieWithID.mjs";



const CONTAINER_SELECTOR = ".favorite-movies-div";

document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
})


async function renderFavorites() {
    const container = qs(CONTAINER_SELECTOR);
    if (!container) return;

    const favoriteIds = getLocalStorage("favorites");
    if (!favoriteIds || favoriteIds.length === 0) {
        container.innerHTML = `<p>No favorites yet.</p>`
        return
    }

    const results = await Promise.all(
        favoriteIds.map(id => renderMovieWithID(id, buildMovieCardTemplate))
    );
    container.innerHTML = results.map(r => r.html).join("");
}

