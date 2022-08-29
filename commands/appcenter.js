const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("appcenter")
    .setDescription("Department Application System"),
  execute(interaction) {
    const emergencyDepartmentsMessage = new EmbedBuilder()
      .setColor(0xD63129)
      .setTitle("First Responder Applications")
      .setDescription("Apply for Canada Roleplay emergency departments using the attached buttons below. Applications are usually reviewed within 24 hours of submittal time.")
      .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png")
      .setImage("https://i.ibb.co/yhZJfYX/16f5335fbc741c38cf0618069c7820aec2b56a06.png");

    const serverDepartmentsMessage = new EmbedBuilder()
      .setColor(0xD63129)
      .setTitle("Server Management Applications")
      .setDescription("Apply for Canada Roleplay server departments using the attached buttons below. Applications are usually reviewed within 24 hours of submittal time.")
      .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png");

    /* BUTTONS */

    const emergencyDepartmentButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("tps")
          .setLabel("Toronto Police Service")
          .setEmoji("👮")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("opp")
          .setLabel("Ontario Provincial Police")
          .setEmoji("👮")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("rcmp")
          .setLabel("Royal Canadian Mounted Police")
          .setEmoji("👮")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("tfs")
          .setLabel("Toronto Fire Service")
          .setEmoji("👨‍🚒")
          .setStyle(ButtonStyle.Primary),
      );

    const serverManagementDepartmentButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("staff")
          .setLabel("Staff")
          .setEmoji("⭐")
          .setStyle(ButtonStyle.Primary),
        
        new ButtonBuilder()
          .setCustomId("business")
          .setLabel("Business")
          .setEmoji("💵")
          .setStyle(ButtonStyle.Primary)
      );

    interaction.reply("null");
    interaction.deleteReply();

    interaction.channel.send({ embeds: [emergencyDepartmentsMessage], components: [emergencyDepartmentButtons] });
    interaction.channel.send({ embeds: [serverDepartmentsMessage], components: [serverManagementDepartmentButtons] });
  }
}
