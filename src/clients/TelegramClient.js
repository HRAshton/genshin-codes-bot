// eslint-disable-next-line no-unused-vars
class TelegramClient {
  /**
   * Sends a message to the predifined channel.
   * @param { string } body
   */
  sendMessageToChannel(body) {
    const { botApiKey, channelId } = getConfig();

    const payload = {
      chat_id: channelId,
      text: body,
      parse_mode: 'Markdown',
      disable_web_page_preview: 'true',
    };

    const options = {
      method: 'post',
      payload,
    };

    console.log('TelegramClient', 'Options', options);

    const url = `https://api.telegram.org/bot${botApiKey}/sendMessage`;

    const response = UrlFetchApp.fetch(url, options);

    if (response.getResponseCode() === 200) {
      console.log(response.getContentText());
    } else {
      console.warn(response.getContentText());
    }
  }
}
