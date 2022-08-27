const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("approve-app")
    .setDescription("Used to approve department applications."),
  async execute(interaction) {
    await interaction.reply("In development.");
  }
}
