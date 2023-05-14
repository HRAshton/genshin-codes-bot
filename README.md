# genshin-codes-bot

GAS app that resends Genshin Impact promo codes from HoYoLaB to a Telegram channel.

## How to use

You don't really need to use this bot.
Just join the [Telegram channel @genshin_impact_promo_codes](https://t.me/genshin_impact_promo_codes) and you'll be fine.

## Installation

But if you really want to use it, you'll need to:

1. Create a Telegram bot and a channel.
2. Create a Google Apps Script project.
3. Create a Google Spreadsheet with a clean sheet named 'main'.
4. Copy the channel ID and the bot token to the `src/config.js` file.
5. Log in to the GAS project with `clasp login`.
6. Push the project with `clasp push`.
7. Create a trigger for the `main` function (once per a hour, for example).
