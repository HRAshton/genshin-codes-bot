// eslint-disable-next-line no-unused-vars
function main() {
  const executionTime = new Date().toISOString();
  console.info('Main', 'Started', executionTime);

  const bot = new GenshinCodesBot();
  bot.run();

  console.info('Main', 'Completed', executionTime);
}
