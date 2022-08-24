const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { TOKEN } = require("./config.json");
const fs = require("fs");
const path = require("path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
for (const eventFile of eventFiles) {
  const event = require(path.join(__dirname, `events/${eventFile}`));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));
for (const commandFile of commandFiles) {
  const command = require(path.join(__dirname, `commands/${commandFile}`));
  client.commands.set(command.data.name, command);
  console.log(`[CRP-Console]: ${command.data.name} has been loaded.`);
}

client.login(TOKEN);
