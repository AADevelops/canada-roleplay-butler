const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { TPS_APP_REVIEW_CHANNEL, OPP_APP_REVIEW_CHANNEL, TFS_APP_REVIEW_CHANNEL, STAFF_APP_REVIEW_CHANNEL, BUSINESS_APP_REVIEW_CHANNEL, APPLICATION_RESULT_CHANNEL } = require("../config.json");

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
      if (interaction.customId === "tps" || interaction.customId === "opp" || interaction.customId === "tfs" || interaction.customId === "staff" || interaction.customId === "business") {
        choice = "10";
        departments = ["TORONTO POLICE", "OPP", "TORONTO FIRE SERVICE", "STAFF", "BUSINESS"];
  
        if (interaction.customId === "tps") {
          var tpsModal = new ModalBuilder()
            .setCustomId("tpsModal")
            .setTitle("Toronto Police Service Application");
  
          choice = "0";
        } else if (interaction.customId === "opp") {
          var oppModal = new ModalBuilder()
            .setCustomId("oppModal")
            .setTitle("Ontario Provincial Police Application");
  
          choice = "1";
        } else if (interaction.customId === "tfs") {
          var tfsModal = new ModalBuilder()
            .setCustomId("tfsModal")
            .setTitle("Toronto Fire Service Application");
  
          choice = "2";
        } else if (interaction.customId === "staff") {
          var staffModal = new ModalBuilder()
            .setCustomId("staffModal")
            .setTitle("Staff Application");
  
          choice = "3";
        } else if (interaction.customId === "business") {
          var businessModal = new ModalBuilder()
            .setCustomId("businessModal")
            .setTitle("Business Application");
  
          choice = "4";
        }
  
        modalSelector = {
          "0": tpsModal,
          "1": oppModal,
          "2": tfsModal,
          "3": staffModal,
          "4": businessModal
        };
  
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
  
        const tenCodeDefinition = new TextInputBuilder()
          .setCustomId("tenCodeDefinition")
          .setLabel("WHAT DOES 10-8 MEAN?")
          .setStyle(TextInputStyle.Paragraph);
  
        /* LEO QUESTIONS */
  
        const tenCodeQuestion = new TextInputBuilder()
          .setCustomId("tenCodeQuestion")
          .setLabel("ON A 10-11, HOW DO YOU CALL IT IN?")
          .setStyle(TextInputStyle.Paragraph);
  
        /* FIRE QUESTIONS */
        const peopleOrHouses = new TextInputBuilder()
          .setCustomId("peopleOrHouses")
          .setLabel("WOULD YOU SAVE PEOPLE OR HOUSES?")
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
          .setLabel("WHAT ARE YOUR BUSINESS SERVICES?")
          .setStyle(TextInputStyle.Paragraph);
  
        /* ACTION ROWS */
  
        const firstActionRow      = new ActionRowBuilder().addComponents(introQuestion);
        const secondActionRow     = new ActionRowBuilder().addComponents(pastExperience);
        const thirdActionRow      = new ActionRowBuilder().addComponents(ageQuestion);
        const fourthActionRow     = new ActionRowBuilder().addComponents(tenCodeDefinition);
        const fifthActionRow      = new ActionRowBuilder().addComponents(tenCodeQuestion);
        const sixthActionRow      = new ActionRowBuilder().addComponents(peopleOrHouses);
        const seventhActionRow    = new ActionRowBuilder().addComponents(memberTimeQuestion);
        const eigthActionRow      = new ActionRowBuilder().addComponents(easyAdminQuestion);
        const ninthActionRow      = new ActionRowBuilder().addComponents(businessName);
        const tenthActionRow      = new ActionRowBuilder().addComponents(businessPlans);
        const eleventhActionRow   = new ActionRowBuilder().addComponents(locationNeeded);
        const twelfthActionRow    = new ActionRowBuilder().addComponents(businessHours);
        const thirteenthActionRow = new ActionRowBuilder().addComponents(businessServices);
  
        if (choice === "0") {
          tpsModal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fifthActionRow, fourthActionRow);
        } else if (choice === "1") {
          oppModal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fifthActionRow, fourthActionRow);
        } else if (choice === "2") {
          tfsModal.addComponents(firstActionRow, secondActionRow, thirdActionRow, sixthActionRow, fourthActionRow);
        } else if (choice === "3") {
          staffModal.addComponents(firstActionRow, secondActionRow, thirdActionRow, seventhActionRow, eigthActionRow);
        } else if (choice === "4") {
          businessModal.addComponents(ninthActionRow, tenthActionRow, eleventhActionRow, twelfthActionRow, thirteenthActionRow);
        }
  
        await interaction.showModal(modalSelector[choice]);
      } else if (interaction.customId.includes("acceptApplication") || interaction.customId.includes("denyApplication")) {
        buttonIdSplit = interaction.customId.split("-");

        const acceptedTitles = [
          `Congratulations! Your Toronto Police application has been accepted.`,
          `Congratulations! Your OPP application has been accepted.`,
          `Congratulations! Your Toronto Fire Service application has been accepted.`,
          `Congratulations! Your staff application has been accepted.`,
          `Congratulations! Your business application has been accepted.`
        ];

        const acceptedReplies = [
          `${buttonIdSplit[2]} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
          `${buttonIdSplit[2]} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
          `${buttonIdSplit[2]} Congratulations! Keep an eye out for training ads in your departments conversations channel for training. You will need to attend one to proceed.`,
          `${buttonIdSplit[2]} Congratulations! You must be in the server for at least one month and be active on both discord and the server to continue.`,
          `${buttonIdSplit[2]} Congratulations! Check out the business docs and instructions on running your business.`
        ];

        const acceptedImages = [
          "https://cdn.discordapp.com/attachments/934920346476367913/1012767978078601256/19dfa680cf8944872235234115ded5bd.png",
          "https://i.gyazo.com/aab1b3ecbe01083a133f63f8733c5af3.png",
          "https://i.gyazo.com/cf82259532e7caa4c8478d9bd9b0a76a.png",
          "https://i.gyazo.com/1dbed3c456802917c2a534f754f27c1c.png",
          "https://forum.cfx.re/uploads/default/original/4X/3/c/0/3c09a48bab348783d141b97833d3f18e507c1e90.jpeg"
        ];

        messagesSelector = {
          "TORONTO POLICE"       : 0,
          "OPP"                  : 1,
          "TORONTO FIRE SERVICE" : 2,
          "STAFF"                : 3,
          "BUSINESS"             : 4
        }

        if (interaction.customId.includes("acceptApplication")) {
          var applicationResultMessage = new EmbedBuilder()
            .setColor(0x1AFF00)
            .setTitle(acceptedTitles[messagesSelector[buttonIdSplit[1]]])
            .setDescription(acceptedReplies[messagesSelector[buttonIdSplit[1]]])
            .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png")
            .setImage(acceptedImages[messagesSelector[buttonIdSplit[1]]])
            .setFooter({ text: "Copyright 2022 @ Canada Roleplay" });

          interaction.reply("null");
          interaction.deleteReply();

          const applicationResultChannel = interaction.client.channels.cache.get(APPLICATION_RESULT_CHANNEL);
          applicationResultChannel.send({ embeds: [applicationResultMessage] });
        } else if (interaction.customId.includes("denyApplication")) {
          const denyReasonInput = new ModalBuilder()
            .setCustomId("denyReasonInput")
            .setTitle("Denied Reason");

          const denyReason = new TextInputBuilder()
            .setCustomId("denyReason")
            .setLabel("Reason")
            .setStyle(TextInputStyle.Paragraph);

          const reasonTextBox = new ActionRowBuilder().addComponents(denyReason);
          denyReasonInput.addComponents(reasonTextBox);

          await interaction.showModal(denyReasonInput);
        }
      }
    } else if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "tpsModal" || interaction.customId === "oppModal" || interaction.customId === "tfsModal" || interaction.customId === "staffModal" || interaction.customId === "businessModal") {
        let responses = [];
        for (let i = 0; i < 5; i++) {
          responses.push(interaction.fields.getTextInputValue((modalSelector[choice].components.map(c => c.components[0].data.custom_id)[i])));
        }

        const applicationReviewMessage = new EmbedBuilder()
          .setColor(0xD63129)
          .setTitle(`New Application - ${departments[choice]}`)
          .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png")
          .addFields(
            { name: "Applicant Discord", value: interaction.user.toString() },
            { name: "Applicant User ID", value: interaction.user.id },
            { name: (modalSelector[choice].components.map(c => c.components[0].data.label))[0], value: responses[0] },
            { name: (modalSelector[choice].components.map(c => c.components[0].data.label))[1], value: responses[1] },
            { name: (modalSelector[choice].components.map(c => c.components[0].data.label))[2], value: responses[2] },
            { name: (modalSelector[choice].components.map(c => c.components[0].data.label))[3], value: responses[3] },
            { name: (modalSelector[choice].components.map(c => c.components[0].data.label))[4], value: responses[4] }
          );

        /* BUTTONS */

        const buttonList = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`acceptApplication-${departments[choice]}-${interaction.user.toString()}`)
              .setLabel("Approve")
              .setEmoji("✔️")
              .setStyle(ButtonStyle.Success),
            
            new ButtonBuilder()
              .setCustomId(`denyApplication-${departments[choice]}-${interaction.user.toString()}`)
              .setLabel("Deny")
              .setEmoji("✖️")
              .setStyle(ButtonStyle.Danger)
          );

        const applicationChannel = {
          "TORONTO POLICE"       : TPS_APP_REVIEW_CHANNEL,
          "OPP"                  : OPP_APP_REVIEW_CHANNEL,
          "TORONTO FIRE SERVICE" : TFS_APP_REVIEW_CHANNEL,
          "STAFF"                : STAFF_APP_REVIEW_CHANNEL,
          "BUSINESS"             : BUSINESS_APP_REVIEW_CHANNEL
        };

        const applicationReviewChannel = interaction.client.channels.cache.get(applicationChannel[departments[choice]]);
        applicationReviewChannel.send({ embeds: [applicationReviewMessage], components: [buttonList] });

        interaction.reply({ content: "[CRP-Console]: Your application has been submitted!", ephemeral: true });
      } else if (interaction.customId === "denyReasonInput") {
        const deniedReason = interaction.fields.getTextInputValue("denyReason");

        const deniedTitles = [
          `Sadly, your Toronto Police application has been denied.`,
          `Sadly, your OPP application has been denied.`,
          `Sadly, your Toronto Fire Service application has been denied.`,
          `Sadly, your staff application has been denied.`,
          `Sadly, your business application has been denied.`
        ];

        const deniedReplies = [
          `${buttonIdSplit[2]} Feel free to reapply in the #apply-here channel. Thank you for your interest in Toronto Police.\n\nReason: ${deniedReason}`,
          `${buttonIdSplit[2]} Feel free to reapply in the #apply-here channel. Thank you for your interest in Ontario Provincial Police.\n\nReason: ${deniedReason}`,
          `${buttonIdSplit[2]} Feel free to reapply in the #apply-here channel. Thank you for your interest in Toronto Fire Services.\n\nReason: ${deniedReason}`,
          `${buttonIdSplit[2]} Feel free to reapply in the #apply-here channel. Thank you for your interest in Staff.\n\nReason: ${deniedReason}`,
          `${buttonIdSplit[2]} Feel free to reapply in the #apply-here channel. Thank you for your interest in Business.\n\nReason: ${deniedReason}`
        ];

        const deniedImages = [
          "https://i.gyazo.com/109f2327d5fcfcd5e6a38e5f9cf6d0a8.png",
          "https://cdn.discordapp.com/attachments/934920346476367913/1012767977801781288/04322d8e01cb1ac6fe65e6d2f17dfa9e.png",
          "https://i.gyazo.com/4bbee5b6a84d63f4212737057081a789.png",
          "https://i.gyazo.com/48b5196006dad969d11fbae0bb743947.png",
          "https://forum.cfx.re/uploads/default/original/4X/3/c/0/3c09a48bab348783d141b97833d3f18e507c1e90.jpeg"
        ];

        const applicationResultMessage = new EmbedBuilder()
          .setColor(0xFF0000)
          .setTitle(deniedTitles[messagesSelector[buttonIdSplit[1]]])
          .setDescription(deniedReplies[messagesSelector[buttonIdSplit[1]]])
          .setThumbnail("https://i.ibb.co/p1K1yKd/Rogues-2021-Red-1.png")
          .setImage(deniedImages[messagesSelector[buttonIdSplit[1]]])
          .setFooter({ text: "Copyright 2022 @ Canada Roleplay" });

        interaction.reply("null");
        interaction.deleteReply();

        const applicationResultChannel = interaction.client.channels.cache.get(APPLICATION_RESULT_CHANNEL);
        applicationResultChannel.send({ embeds: [applicationResultMessage] });
      }
    }
  }
}
