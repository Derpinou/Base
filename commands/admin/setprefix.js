const Discord = require("discord.js");
const db = require("../../utils/mysql.js");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args, logs_id, prefixes, footer, premium, language, data) => {

  if (args.length < 1) return errors.noArgs(message, prefixes + "setprefix <prefix>", footer, language);
  let prefix = args[0];

  var regex = /^[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1}$/igm;
  var isValid = regex.test(prefix);
  if (language == "fr") {
    if (!isValid) return errors.noArgs(message, prefixes + "utilise les prefix suivant :``!‎``, ``@``, ``# ‎``, ``$ ‎``, ``% ‎``, ``^ ‎``, ``& ‎``, ``* ‎``, ``( ‎``, ``) ‎``, ``_ ‎``, ``+ ‎``, ``\\ ‎``, ``- ‎``, ``= ‎``, ``{ ‎``, ``} ‎``, ``; ‎``, ``' ‎``, ``: ‎``, ``\" ‎``, ``| ‎``, ``, ‎``, ``. ‎``, ``< ‎``, ``> ‎``, ``\/ ‎``, ``?``", footer, language);
  }
  if (language == "en") {
    if (!isValid) return errors.noArgs(message, prefixes + "uses the following prefixes:``!``, ``@``, ``#``, ``$``, ``%``, ``^``, ``&``, ``*``, ``(``, ``)``, ``_``, ``+``, ``\\``, ``-``, ``=``, ``{``, ``}``, ``;``, ``'``, ``:``, ``\"``, ``|``, ``, ``, ``.``, ``<``, ``>``, ``\/``, ``?``", footer, language);
  }

  data.prefix = prefix;
  data.save();
  
  let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 1024
    }))
    .setColor("RANDOM");
  if (language == "fr") {
    embed.setTitle('__**» Changement de préfix**__')
      .addField("Le préfix est désormais", prefix);
  }
  if (language == "en") {
    embed.setTitle('__**» Change prefix**__')
      .addField("The prefix is ​​now", prefix);
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
  name: "setprefix",
  descriptionfr: "Permets de définir le préfix du robot",
  descriptionen: "Define the prefix of the bot",
  usagefr: "<préfix>",
  usageen: "<prefix>",
  botPermissions: ["ADMINISTRATOR"],
  userPermissions: ["ADMINISTRATOR"],
  staffOnly: false,
  ownerOnly: false,
  requirePremium: false,
  disabled: false
}