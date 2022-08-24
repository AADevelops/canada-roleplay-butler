const { GUILD_ID } = require("../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`[CRP-Console]: ${client.user.tag} ready.`);

    const guildCommands = await client.guilds.cache.get(GUILD_ID).commands.fetch();
    console.log(guildCommands);
  }
}
