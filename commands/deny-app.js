const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { APPLICATION_RESULT_CHANNEL } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deny-app")
    .setDescription("Used to deny department applications.")
    .addUserOption(user =>
      user.setName("member")
          .setDescription("Member that will be denied for the chosen department.")
          .setRequired(true))
    .addStringOption(department =>
      department.setName("department")
                .setDescription("Department that member will be denied for.")
                .addChoices(
                  { name: "TPS", value: "TORONTO POLICE" },
                  { name: "OPP", value: "OPP" },
                  { name: "RCMP", value: "RCMP" },
                  { name: "TFS", value: "TORONTO FIRE SERVICE" },
                  { name: "Staff", value: "STAFF" },
                  { name: "Business", value: "BUSINESS" }
                )
                .setRequired(true))
    .addStringOption(reason =>
      reason.setName("reason")
            .setDescription("Reason for denying member.")
            .setRequired(true)),
  async execute(interaction) {
    const applicant = interaction.options.getUser("member");
    const department = interaction.options.getString("department");
    const reason = interaction.options.getString("reason");

    const deniedTitles = [
      `Sadly, your Toronto Police application has been denied.`,
      `Sadly, your OPP application has been denied.`,
      `Sadly, your RCMP application has been denied.`,
      `Sadly, your Toronto Fire Service application has been denied.`,
      `Sadly, your staff application has been denied.`,
      `Sadly, your business application has been denied.`
    ];

    const deniedReplies = [
      `${applicant} Feel free to reapply in the #apply-here channel. Thank you for your interest in Toronto Police.\n\nReason: ${reason}`,
      `${applicant} Feel free to reapply in the #apply-here channel. Thank you for your interest in Ontario Provincial Police.\n\nReason: ${reason}`,
      `${applicant} Feel free to reapply in the #apply-here channel. Thank you for your interest in Royal Canadian Mounted Police.\n\nReason: ${reason}`,
      `${applicant} Feel free to reapply in the #apply-here channel. Thank you for your interest in Toronto Fire Services.\n\nReason: ${reason}`,
      `${applicant} Feel free to reapply in the #apply-here channel. Thank you for your interest in Staff.\n\nReason: ${reason}`,
      `${applicant} Feel free to reapply in the #apply-here channel. Thank you for your interest in Business.\n\nReason: ${reason}`
    ];

    const deniedImages = [
      "https://i.gyazo.com/109f2327d5fcfcd5e6a38e5f9cf6d0a8.png",
      "https://cdn.discordapp.com/attachments/934920346476367913/1012767977801781288/04322d8e01cb1ac6fe65e6d2f17dfa9e.png",
      "https://cdn.discordapp.com/attachments/934920346476367913/1013809343013081148/e9e3926958a09a4f4f1933bc84ca2abbf81a2068.png",
      "https://i.gyazo.com/4bbee5b6a84d63f4212737057081a789.png",
      "https://i.gyazo.com/48b5196006dad969d11fbae0bb743947.png",
      "https://forum.cfx.re/uploads/default/original/4X/3/c/0/3c09a48bab348783d141b97833d3f18e507c1e90.jpeg"
    ];

    const messagesSelector = {
      "TORONTO POLICE"       : 0,
      "OPP"                  : 1,
      "RCMP"                 : 2,
      "TORONTO FIRE SERVICE" : 3,
      "STAFF"                : 4,
      "BUSINESS"             : 5
    };

    const applicationResultMessage = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle(deniedTitles[messagesSelector[department]])
      .setDescription(deniedReplies[messagesSelector[department]])
      .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png")
      .setImage(deniedImages[messagesSelector[department]])
      .setFooter({ text: "Copyright 2022 @ Canada Roleplay" });

    interaction.reply("null");
    interaction.deleteReply();

    const applicationResultChannel = interaction.client.channels.cache.get(APPLICATION_RESULT_CHANNEL);
    applicationResultChannel.send({ embeds: [applicationResultMessage] });
  }
}
