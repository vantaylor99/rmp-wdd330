/**
 * Environment config for local vs GitHub Pages (prod).
 * Toggle ENV before pushing: use 'local' when developing, 'prod' before deploy.
 * Paths in partials use __BASE_PATH__ which is replaced with BASE_PATH when loading.
 */
export const ENV = "prod"; // 'local' | 'prod' — use 'local' for dev, 'prod' for GitHub Pages

export const BASE_PATH = ENV === "prod" ? "/Random-Movie-Picker-WDD330-" : "";
