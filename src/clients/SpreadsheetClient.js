// eslint-disable-next-line no-unused-vars
class SpreadsheetClient {
  constructor() {
    const { spreadsheetId, sheetName } = getConfig();
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    this._sheet = spreadsheet.getSheetByName(sheetName);
  }

  /**
   * Returns set of known codes.
   * @returns {Set<string>}
   */
  fetchKnownCodes() {
    const lastRow = this._sheet.getLastRow();
    const values = this._sheet.getRange(2, 1, lastRow).getValues();
    const codesList = values.map((row) => row[0]);
    const codesSet = new Set(codesList);

    return codesSet;
  }

  /**
   * Inserts new codes the to database.
   * @param { Codes } codes
   */
  registerCodes(codes) {
    const addedAtStr = new Date().toISOString();

    const codesCells = codes.codes.map((str) => [str, addedAtStr, 'NORMAL']);
    const potentialCodesCells = codes.potentialCodes.map((str) => [str, addedAtStr, 'POTENCIAL']);
    const cellsToInsert = [...codesCells, ...potentialCodesCells];

    const lastRow = this._sheet.getLastRow();
    const range = this._sheet.getRange(
      lastRow + 1,
      1,
      cellsToInsert.length,
      cellsToInsert[0].length,
    );

    range.setValues(cellsToInsert);
  }
}
