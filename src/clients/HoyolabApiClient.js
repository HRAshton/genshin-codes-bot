// eslint-disable-next-line no-unused-vars
class HoyolabApiClient {
  /**
   * Returns codes and possible codes.
   * @returns { Codes }
   */
  fetchCodes() {
    const searchResult = this._fetchSearchResult();

    const codes = this._getCodes(searchResult);
    const possibleCodes = this._getPossibleCodes(searchResult);

    const result = { codes, possibleCodes };
    console.log('HoyolabApiClient', 'Codes found', result);

    return result;
  }

  _fetchSearchResult() {
    const options = {
      async: true,
      crossDomain: true,
      method: 'GET',
      headers: {
        'x-rpc-client_type': '4',
      },
    };

    const rawResponse = UrlFetchApp.fetch('https://bbs-api-os.hoyolab.com/community/painter/wapi/search?game_id=2&keyword=Redeem Code', options);
    const jsonResponse = rawResponse.getContentText();

    return jsonResponse;
  }

  /**
   * Returns a list of codes.
   * @param {string} searchResult
   * @returns {string[]} */
  _getCodes(searchResult) {
    const objSearchResult = JSON.parse(searchResult);
    const codes = unique(objSearchResult?.data?.special_cards
      ?.find(() => true)?.special?.tool?.detail?.map((card) => card.title) ?? []);
    console.info('HoyolabApiClient', 'Codes found', codes);

    return codes;
  }

  /**
   * Returns a list of possible codes.
   * A possible code is a substring longer than 7 characters,
   * consisting of uppercase letters or digits.
   * @param {string} searchResult
   * @returns {string[]} */
  _getPossibleCodes(searchResult) {
    const regex = /[A-Z0-9]{8,}/g;
    const regexResult = searchResult.match(regex);
    console.log('HoyolabApiClient', 'Possible codes', 'Substrings', regexResult);

    const uppercaseRegex = /[A-Z]+/;
    const possibleCodes = regexResult.filter((str) => uppercaseRegex.exec(str));
    console.log('HoyolabApiClient', 'Possible codes', 'Result', possibleCodes);

    return possibleCodes;
  }
}
