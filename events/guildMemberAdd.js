const { WELCOME_CHANNEL } = require("../config.json");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const welcomeChannel = member.client.channels.cache.get(WELCOME_CHANNEL);
    welcomeChannel.send(`Hey ${member}, welcome to Canada Roleplay!`);
  }
}
