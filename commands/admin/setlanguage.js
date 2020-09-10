const Discord = require("discord.js");
const db = require("../../utils/mysql.js");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args, logs_id, prefixes, footer, premium, language, data) => {

  if (args.length < 1) return errors.noArgs(message, prefixes + "setlanguage <en / fr>", footer, language);
  let langue = args[0];
  if (language == "fr") {
    if (langue != "en") return errors.noArgs(message, prefixes + "setlanguage <en / fr>", footer, language);
  }
  if (language == "en") {
    if (langue != "fr") return errors.noArgs(message, prefixes + "setlanguage <en / fr>", footer, language);
  }
  if (langue == language) return errors.noArgs(message, prefixes + "setlanguage <en / fr>", footer, language);

  data.language = langue;
  data.save();
  let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 1024
    }))
    .setColor("RANDOM");
  if (langue == "fr") {
    embed.setTitle('__**» Changement de la langue**__')
      .addField("La langue est désormais en", "Français");
  }
  if (langue == "en") {
    embed.setTitle('__**» Change language**__')
      .addField("The language is ​​now in", "English");
  }
  embed.setTimestamp()
    .setFooter(footer)
  message.channel.send(":white_check_mark:").then(msg => {
    msg.delete({
      timeout: 2500,
      reason: ''
    })
  });;

  let logs = bot.channels.cache.get(logs_id);
  if (!logs) return errors.noLogChannel(message, prefixes, footer, language);
  logs.send(embed);
}

module.exports.help = {
  name: "setlanguage",
  descriptionfr: "Permets de définir la langue du robot",
  descriptionen: "Define the language of the bot",
  usagefr: "<fr / en>",
  usageen: "<fr / en>",
  botPermissions: [],
  userPermissions: ["ADMINISTRATOR"],
  staffOnly: false,
  ownerOnly: false,
  requirePremium: false,
  disabled: false
}
