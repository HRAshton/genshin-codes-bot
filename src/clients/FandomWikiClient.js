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
    const rawResponse = UrlFetchApp.fetch('https://genshin-impact.fandom.com/wiki/Promotional_Code');
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
    const codeRegex = /https:\/\/genshin\.hoyoverse\.com\/en\/gift\?code=([A-Z0-9]{5,})/g;
    const rowRegex = /<tr(.*?)tr>/gi;

    const flattenHtml = rawHtml.replaceAll(/\s/g, '');
    const tableRowParts = this._matchAllAsStrings(flattenHtml, rowRegex);
    const codesPerRow = tableRowParts.map(htmlPart => this._matchAllAsStrings(htmlPart, codeRegex));

    const codes = codesPerRow.flatMap(x => x.slice(0, 1));
    const possibleCodes = codesPerRow.flatMap(x => x.slice(1));

    return {
      codes,
      possibleCodes,
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
