/**
 * Gets the app config.
 * @returns { Config }
 */
// eslint-disable-next-line no-unused-vars
function getConfig() {
  return {
    spreadsheetId: '',
    sheetName: 'main',

    retryPatternMs: [1000, 2000, 5000],

    botApiKey: '',
    channelId: '@honkai_starrail_promo_codes',
  };
}
