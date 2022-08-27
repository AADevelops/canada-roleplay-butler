const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deny-app")
    .setDescription("Used to deny department applications."),
  async execute(interaction) {
    await interaction.reply("In development.");
  }
}
