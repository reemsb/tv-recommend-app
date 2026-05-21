/**
 * Template for src/environments/environment.ts.
 *
 * Copy this to `environment.ts` and fill in `tmdbApiKey` with your own
 * TMDB v3 API key (https://www.themoviedb.org/settings/api). The runtime file
 * is git-ignored so your key never leaves your machine.
 */
export const environment = {
  production: false,
  tmdb: {
    apiBaseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',
    apiKey: 'PASTE_YOUR_TMDB_V3_API_KEY_HERE',
  },
};
