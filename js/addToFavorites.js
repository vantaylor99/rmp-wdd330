import { setClick, getParam, getLocalStorage, setLocalStorage } from "./util.mjs";

setClick("#add-favorites", addFavorites);

function addFavorites() {
    const movieID = getParam("movieID");
    if (!movieID) {
        window.alert('No movie selected')
        return;
    }
    const currentFavorites = getLocalStorage("favorites")

    if (!currentFavorites.includes(movieID)) {
        currentFavorites.push(movieID);
        setLocalStorage("favorites", currentFavorites);
    }
}