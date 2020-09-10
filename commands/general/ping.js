const Discord = require("discord.js");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args, logs_id, prefixes, footer, premium, language) => {

	let embed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({
			format: 'png',
			dynamic: true,
			size: 1024
		}))
		.setColor("RANDOM")
		.setTitle('__**» Ping...**__');
	if (language == "fr") {
		embed.addField("Latence du bot", "Chargement...", true)
			.addField("Latence de l'API", "Chargement...", true)
	}
	if (language == "en") {
		embed.addField("Latence du bot", "Loading...", true)
			.addField("Latence de l'API", "Loading...", true)
	}
	embed.setTimestamp()
		.setFooter(footer);

	message.channel.send(embed).then(msg => {
		let ping = msg.createdAt - message.createdAt + "ms"
		let pingapi = Math.round(bot.ws.ping) + "ms"

		let embed2 = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({
				format: 'png',
				dynamic: true,
				size: 1024
			}))
			.setColor("RANDOM")
			.setTitle('__**» Pong !**__');
		if (language == "fr") {
			embed2.addField("Latence avec les serveurs", ping, true);
			embed2.addField("Latence avec l'API", pingapi, true);
		}
		if (language == "en") {
			embed2.addField("Latency with servers", ping, true);
			embed2.addField("Latency with API", pingapi, true);
		}
		embed2.setTimestamp()
			.setFooter(footer);
		msg.edit(embed2);
	});
}

module.exports.help = {
	name: "ping",
	aliases: ['latency'],
	descriptionfr: "Permets d'avoir la latence du robot",
	descriptionen: "Have the bot latency",
	botPermissions: [],
	userPermissions: [],
	staffOnly: false,
	ownerOnly: false,
	requirePremium: false,
	disabled: false
}