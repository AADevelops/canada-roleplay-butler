const { SlashCommandBuilder, EmbedBuilder, DiscordAPIError } = require("discord.js");
const { APPLICATION_RESULT_CHANNEL, TPS_ROLE, TPS_CADET, OPP_ROLE, OPP_CADET, RCMP_ROLE, RCMP_CADET, TFS_ROLE, TFS_CANDIDATE, STAFF_ROLE, STAFF_NI_ROLE, BUSINESS_ROLE, BUSINESS_RANK } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("approve-app")
    .setDescription("Used to approve department applications.")
    .addUserOption(user =>
      user.setName("member")
          .setDescription("Member that will be approved for the chosen department.")
          .setRequired(true))
    .addStringOption(department =>
      department.setName("department")
                .setDescription("Department that member will be approved for.")
                .addChoices(
                  { name: "TPS", value: "TORONTO POLICE" },
                  { name: "OPP", value: "OPP" },
                  { name: "RCMP", value: "RCMP" },
                  { name: "TFS", value: "TORONTO FIRE SERVICE" },
                  { name: "Staff", value: "STAFF" },
                  { name: "Business", value: "BUSINESS" }
                )
                .setRequired(true)),
  async execute(interaction) {
    const applicant = interaction.options.getUser("member");
    const department = interaction.options.getString("department");

    const acceptedTitles = [
      `Congratulations! Your Toronto Police application has been accepted.`,
      `Congratulations! Your OPP application has been accepted.`,
      `Congratulations! Your RCMP application has been accepted.`,
      `Congratulations! Your Toronto Fire Service application has been accepted.`,
      `Congratulations! Your staff application has been accepted.`,
      `Congratulations! Your business application has been accepted.`
    ];

    const acceptedReplies = [
      `${applicant} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
      `${applicant} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
      `${applicant} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
      `${applicant} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
      `${applicant} Congratulations! You must be in the server for at least one month and be active on both discord and the server to continue.`,
      `${applicant} Congratulations! Check out the business docs and instructions on running your business.`
    ];

    const acceptedImages = [
      "https://cdn.discordapp.com/attachments/934920346476367913/1012767978078601256/19dfa680cf8944872235234115ded5bd.png",
      "https://i.gyazo.com/aab1b3ecbe01083a133f63f8733c5af3.png",
      "https://cdn.discordapp.com/attachments/934920346476367913/1013809343411527772/e9e3926958a09a4f4f1933bc84ca2abbf81a20681.png",
      "https://i.gyazo.com/cf82259532e7caa4c8478d9bd9b0a76a.png",
      "https://i.gyazo.com/1dbed3c456802917c2a534f754f27c1c.png",
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
      .setColor(0x1AFF00)
      .setTitle(acceptedTitles[messagesSelector[department]])
      .setDescription(acceptedReplies[messagesSelector[department]])
      .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png")
      .setImage(acceptedImages[messagesSelector[department]])
      .setFooter({ text: "Copyright 2022 @ Canada Roleplay" });

    const roleGiver = {
      "TORONTO POLICE"       : `${TPS_ROLE},${TPS_CADET}`,
      "OPP"                  : `${OPP_ROLE},${OPP_CADET}`,
      "RCMP"                 : `${RCMP_ROLE},${RCMP_CADET}`,
      "TORONTO FIRE SERVICE" : `${TFS_ROLE},${TFS_CANDIDATE}`,
      "STAFF"                : `${STAFF_ROLE},${STAFF_NI_ROLE}`,
      "BUSINESS"             : `${BUSINESS_ROLE},${BUSINESS_RANK}`
    };

    try {
      const acceptedMember = await interaction.guild.members.fetch(applicant.id);
      for (let key in roleGiver) {
        if (key === department) {
          const roles = roleGiver[key].split(",");
          acceptedMember.roles.add(roles[0]);
          acceptedMember.roles.add(roles[1]);
        }
      }

      interaction.reply({ content: "[CRP-Console]: Successfully approved applicant.", ephemeral: true });

      const applicationResultChannel = interaction.client.channels.cache.get(APPLICATION_RESULT_CHANNEL);
      applicationResultChannel.send({ embeds: [applicationResultMessage] });
    } catch (error) {
      if (error instanceof DiscordAPIError) {
        interaction.reply({ content: "[CRP-Console]: Unable to approve application: user left the server.", ephemeral: true });
        console.log(`[CRP-Console]: DiscordAPIError error caught. Error Message: \n\n${error}\n\n`);
      }
    }
  }
}
