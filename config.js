/**
 * Default app config (committed). Used when config.local.js is absent (e.g. on GitHub Pages).
 * For local dev, config.local.js loads first and sets window.__APP_CONFIG__; this file then leaves it unchanged.
 * For GitHub Pages, inject real keys via repo Secrets + a build step, or use placeholders (API calls will fail until then).
 */
window.__APP_CONFIG__ = window.__APP_CONFIG__ || {
    TMDB_API_KEY: "b135f0032906e2c0d800df46ced31b8b",
    TMDB_READ_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTM1ZjAwMzI5MDZlMmMwZDgwMGRmNDZjZWQzMWI4YiIsIm5iZiI6MTc3MDI2MjQ0OS41MzcsInN1YiI6IjY5ODQwZmIxYjY5MmMxODdkNzZlNzM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RhmAVWuNF0T4_Fz9wE0RM9p1wlMeqQMSYvWMCjnjLD0",
    GIPHY_API_KEY: "nauK1Rgm3JxK3jK7yElmvKf7nLZlRk6a",
};
