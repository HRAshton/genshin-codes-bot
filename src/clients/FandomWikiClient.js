// eslint-disable-next-line no-unused-vars
class FandomWikiClient {
  /**
   * Returns codes and possible codes.
   * @returns { FetchedCodes }
   */
  fetchCodes() {
    const rawHtml = this._fetchPageContent();
    const result = this._getCodes(rawHtml);

    console.info('FandomWikiClient', 'Codes found', result);

    return result;
  }

  _fetchPageContent() {
    const rawResponse = UrlFetchApp.fetch('https://honkaiimpact3.fandom.com/wiki/Exchange_Rewards');
    const rawHtml = rawResponse.getContentText();
    console.log('FandomWikiClient', 'Page content', rawHtml);

    return rawHtml;
  }

  /**
   * Returns a list of codes.
   * Only one code from a row can be redeemed.
   * @param { string } rawHtml
   * @returns { FetchedCodes } */
  _getCodes(rawHtml) {
    const codeRegex = /<tr>\s*<td>\s*<b>([A-Z0-9]+)<\/b>/g;

    const flattenHtml = rawHtml.replaceAll(/\s/g, '');
    const codesPerRow = this._matchAllAsStrings(flattenHtml, codeRegex);

    return {
      codes: codesPerRow,
      possibleCodes: [],
    };
  }

  /**
   * Returns a list of substrings found by the regex.
   * @param { string } str
   * @param { RegExp } regex
   * @returns { string[] }
   */
  _matchAllAsStrings(str, regex) {
    return [...str.matchAll(regex)].map(match => match[1]);
  }
}
