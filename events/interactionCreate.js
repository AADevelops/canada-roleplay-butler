const { ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        interaction.reply({ content: "[CRP-Console]: Command not found.", ephemeral: true });
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        return interaction.reply({ content: "[CRP-Console]: Command error, unable to execute.", ephemeral: true });
      }
    } else if (interaction.isButton()) {
      let choice = 10;
      const departments = ["TORONTO POLICE", "OPP", "TORONTO FIRE SERVICE", "STAFF"];

      if (interaction.customId === "tps") {
        const tpsModal = new ModalBuilder()
          .setCustomId("tpsModal")
          .setTitle("Toronto Police Service Application");

        choice = 0;
      } else if (interaction.customId === "opp") {
        const oppModal = new ModalBuilder()
          .setCustomId("oppModal")
          .setTitle("Ontario Provincial Police Application");

        choice = 1;
      } else if (interaction.customId === "tfs") {
        const tfsModal = new ModalBuilder()
          .setCustomId("tfsModal")
          .setTitle("Toronto Fire Service Application");

        choice = 2;
      } else if (interaction.customId === "staff") {
        const staffModal = new ModalBuilder()
          .setCustomId("staffModal")
          .setTitle("Staff Application");

        choice = 3;
      } else if (interaction.customId === "business") {
        const businessModal = new ModalBuilder()
          .setCustomId("businessModal")
          .setTitle("Business Application");

        choice = 4;
      }

      modalSelector = {
        0: tpsModal,
        1: oppModal,
        2: tfsModal,
        3: staffModal,
        4: businessModal
      };

      /* LEO */
      // WHAT DOES TORONTO POLICE DO?
      // DO YOU HAVE ANY PAST EXPERIENCE?
      // WHAT IS YOUR CURRENT AGE?
      // ON A 10-11, HOW DO YOU CALL IT IN?
      // WHAT DOES 10-8 MEAN?

      /* FIRE */
      // WHAT DOES TORONTO FIRE SERVICE DO?
      // DO YOU HAVE ANY PAST EXPERIENCE?
      // WHAT IS YOUR CURRENT AGE?
      // WOULD YOU SAVE PEOPLE OR HOUSES?
      // WHAT DOES 10-8 MEAN?

      /* STAFF */
      // WHAT DOES STAFF DO?
      // DO YOU HAVE ANY PAST EXPERIENCE?
      // WHAT IS YOUR CURRENT AGE?
      // HOW LONG HAVE YOU BEEN IN CANADA ROLEPLAY?
      // DO YOU KNOW HOW TO USE EASY ADMIN?

      /* GENERAL QUESTIONS */

      const introQuestion = new TextInputBuilder()
        .setCustomId("introQuestion")
        .setLabel(`WHAT DOES ${departments[choice]} DO?`)
        .setStyle(TextInputStyle.Paragraph);

      const pastExperience = new TextInputBuilder()
        .setCustomId("pastExperience")
        .setLabel("DO YOU HAVE ANY PAST EXPERIENCE?")
        .setStyle(TextInputStyle.Paragraph);

      const ageQuestion = new TextInputBuilder()
        .setCustomId("ageQuestion")
        .setLabel("WHAT IS YOUR CURRENT AGE?")
        .setStyle(TextInputStyle.Short);

      const tenCodeQuestion = new TextInputBuilder()
        .setCustomId("tenCodeQuestion")
        .setLabel("WHAT DOES 10-8 MEAN?")
        .setStyle(TextInputStyle.Paragraph);

      /* LEO QUESTIONS */

      const tenCodeDefinition = new TextInputBuilder()
        .setCustomId("tenCodeDefinition")
        .setLabel("ON A 10-11, HOW DO YOU CALL IT IN?")
        .setStyle(TextInputStyle.Paragraph);

      /* STAFF QUESTIONS */

      const memberTimeQuestion = new TextInputBuilder()
        .setCustomId("memberTimeQuestion")
        .setLabel("HOW LONG HAVE YOU BEEN IN CANADA ROLEPLAY?")
        .setStyle(TextInputStyle.Paragraph);

      const easyAdminQuestion = new TextInputBuilder()
        .setCustomId("easyAdminQuestion")
        .setLabel("DO YOU KNOW HOW TO USE EASY ADMIN?")
        .setStyle(TextInputStyle.Paragraph);

      /* BUSINESS QUESTIONS */

      const businessName = new TextInputBuilder()
        .setCustomId("businessName")
        .setLabel("BUSINESS NAME")
        .setStyle(TextInputStyle.Short);

      const businessPlans = new TextInputBuilder()
        .setCustomId("businessPlans")
        .setLabel("WHAT ARE YOUR BUSINESS PLANS?")
        .setStyle(TextInputStyle.Paragraph);

      const locationNeeded = new TextInputBuilder()
        .setCustomId("locationNeeded")
        .setLabel("WHAT LOCATION DO YOU NEED?")
        .setStyle(TextInputStyle.Paragraph);

      const businessHours = new TextInputBuilder()
        .setCustomId("businessHours")
        .setLabel("WHAT ARE YOUR BUSINESS HOURS?")
        .setStyle(TextInputStyle.Paragraph);

      const businessServices = new TextInputBuilder()
        .setCustomId("businessServices")
        .setLabel("WHAT ARE YOU BUSINESS SERVICES?")
        .setStyle(TextInputStyle.Paragraph);

      switch (choice) {
        case 0:
          //
        case 1:
          //
        case 2:
          //
        case 3:
          //
        case 4:
          //
      }
    }
  }
}
