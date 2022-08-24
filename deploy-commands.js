const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { TOKEN, BOT_ID, GUILD_ID } = require("./config.json");
const fs = require("fs");
const path = require("path");

const commands = [];

const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, `commands/${file}`));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("[CRP-Console]: Refreshing all bot commands.");

    await rest.put(
      Routes.applicationGuildCommands(BOT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("[CRP-Console]: Bot commands have been refreshed.");
  } catch (error) {
    console.error(error);
  }
})();
