// eslint-disable-next-line no-unused-vars
class GenshinCodesBot {
  constructor() {
    this._hoyolabClient = new HoyolabApiClient();
    this._spreadsheetClient = new SpreadsheetClient();
    this._telegramClient = new TelegramClient();
  }

  /**
   * Fetches codes and sends a message.
   */
  run() {
    const newCodes = runWithRetries(() => this._getAndRegisterNewCodes());

    if (!newCodes.found) {
      console.info('No new codes found');
      return;
    }

    const message = this._buildTelegramMessage(newCodes);
    runWithRetries(() => this._telegramClient.sendMessageToChannel(message));
  }

  /**
   * Gets and registers new codes.
   * @returns { Codes }
   */
  _getAndRegisterNewCodes() {
    const rawCodes = this._hoyolabClient.fetchCodes();
    const knownCodes = this._spreadsheetClient.fetchKnownCodes();

    const codes = unique(rawCodes.codes.filter((code) => !knownCodes.has(code)));
    const possibleCodes = unique(rawCodes.possibleCodes
      .filter((code) => !knownCodes.has(code))
      .filter((code) => !rawCodes.codes.includes(code)));
    const newCodes = {
      codes,
      possibleCodes,
      found: codes.length > 0 || possibleCodes.length > 0,
    };

    if (newCodes.found) {
      this._spreadsheetClient.registerCodes(newCodes);
    }

    return newCodes;
  }

  /**
   * Builds a message.
   * @param { Codes } newCodes
   * @returns { string }
   */
  _buildTelegramMessage(newCodes) {
    const { codes, possibleCodes } = newCodes;

    if (!newCodes.codes.length && !newCodes.possibleCodes.length) {
      throw Error('Empty codes passed.');
    }

    const messageLines = ['Hi! I found the new codes!'];

    if (codes.length > 0) {
      messageLines.push('', '*Found codes*');

      for (let i = 0; i < codes.length; i += 1) {
        const code = codes[i];
        const line = `${i + 1}. \`${code}\` [Redeem online](https://genshin.hoyoverse.com/en/gift?code=${code})`;
        messageLines.push(line);
      }
    }

    if (possibleCodes.length > 0) {
      messageLines.push('', '*Possible codes*');
      messageLines.push('_These codes are derived automatically, and some of them may not work. '
        + 'Or they may just be nicknames. Or service values. But it\'s worth a try, right?_');

      // Codes that have a high probability of being correct should be at the beginning of the list.
      const sortedPossibleCodes = possibleCodes.sort(
        (a, b) => this._getProbability(a) - this._getProbability(b),
      );
      for (let i = 0; i < sortedPossibleCodes.length; i += 1) {
        const code = sortedPossibleCodes[i];
        const line = `${i + 1}. \`${code}\` [Redeem online](https://genshin.hoyoverse.com/en/gift?code=${code})`;
        messageLines.push(line);
      }
    }

    messageLines.push('', '_Have a good game!_');

    return messageLines.join('\n');
  }

  /**
   * Returns the conditional probability that the passed string is a promo code.
   * Promo codes usually have a random distribution
   * of characters and contain both letters and numbers.
   * @param { string } code
   * @returns { number }
   */
  _getProbability(code) {
    const priority = code.match(/[0-9]/) ? -100 : 100;

    return priority + (-shannonEntropy(code));
  }
}
