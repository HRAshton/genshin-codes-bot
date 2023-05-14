/**
 * Retries callback by a pattern.
 * Throws exception if all retries are failed.
 * @template T
 * @param { () => T } callback
 * @returns { T }
 */
// eslint-disable-next-line no-unused-vars
function runWithRetries(callback) {
  const { retryPatternMs } = getConfig();

  let lastError;
  for (let attempt = 0; attempt <= retryPatternMs.length; attempt += 1) {
    try {
      return callback();
    } catch (e) {
      lastError = e;
      console.warn('Retry failed', e);

      const timeoutMs = retryPatternMs[attempt];
      if (timeoutMs !== undefined) {
        Utilities.sleep(timeoutMs);
      }
    }
  }

  throw lastError;
}
