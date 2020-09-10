const Discord = require("discord.js");
const errors = require("../../utils/errors.js");
const { exec } = require("child_process");
const config = require("../../config.json");



module.exports.run = async (bot, message, logs_id, prefixes, footer, premium, language) => {

    let messageArray = message.content.split(" ");
        let args = messageArray.slice(1); 
        let command = args.join(" ")
        exec(`${command}`, (error, stdout, stderr) => {
            if (error) {
                message.channel.send(`error: ${error.message}`);
                console.log(`\`ERROR!\` \n \`\`${error.message}\`\``);
                return;
            }
            if (stderr) {
                message.channel.send(`\`\`\`${stderr}\`\`\``);
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            message.channel.send(`\`\`\`${stdout}\`\`\``);
        });
}

module.exports.help = {
  name:"exec",
  aliases:['exec', 'execute'],
  descriptionfr:"Executer des commandes Linux depuis le bot",
  descriptionen:"Execute Linux commands from the bot",
  staffOnly: false,
  ownerOnly: true,
}
