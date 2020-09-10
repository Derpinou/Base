const Discord = require("discord.js");;
const errors = require("../../utils/errors.js");
var config = require("../../config.json");

module.exports.run = async (bot, message, args, logs_id, prefixes, footer, premium, language, data) => {

  const content = message.content.split(" ").slice(1).join(" ");
  const result = new Promise(async (resolve) => resolve(eval(content)));

  return result.then(async (output) => {
    if (typeof output !== "string") {
      output = require("util").inspect(output, {
        depth: 0
      });
    }
    if (output.includes(bot.token)) {
      output = output.replace(bot.token, "T0K3N");
    }
    message.channel.send(output, {
      code: "js"
    });
  }).catch((err) => {
    err = err.toString();
    if (err.includes(bot.token)) {
      err = err.replace(bot.token, "T0K3N");
    }
    message.channel.send(err, {
      code: "js"
    });
    console.log(err)
  });

}

module.exports.help = {
  name: "eval",
  descriptionfr: "Permets d'exécuter des fonctions JavaScript.",
  descriptionen: "Execute JavaScript functions",
  usagefr: "<eval>",
  usageen: "<eval>",
  staffOnly: false,
  ownerOnly: true,
  requirePremium: false,
  userPermissions: [],
  botPermissions: [],
}