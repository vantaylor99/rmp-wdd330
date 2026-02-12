export default function calculateRating(vote_average) {
    const rating = Math.round(Number(vote_average / 2));
    let stars = "";
    if (rating === 5) {
        stars = `⭐⭐⭐⭐⭐`
    }
    else if (rating === 4) {
        stars = `⭐⭐⭐⭐<span style="opacity: 50%">⭐</span>`
    }
    else if (rating === 3) {
        stars = `⭐⭐⭐<span style="opacity: 50%">⭐⭐</span>`
    }
    else if (rating === 2) {
        stars = `⭐⭐<span style="opacity: 50%">⭐⭐⭐</span>`
    }
    else if (rating === 1) {
        stars = `⭐<span style="opacity: 50%">⭐⭐⭐⭐</span>`
    }
    else if (rating === 0) {
        stars = `<span style="opacity: 50%">⭐⭐⭐⭐⭐</span>`
    }
    return stars;
}