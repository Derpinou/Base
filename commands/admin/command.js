const Discord = require("discord.js");
const errors = require("../../utils/errors.js");
const fs = require("fs");
var config = require("../../config.json");

module.exports.run = async (bot, message, args, logs_id, prefixes, footer, premium, language, data) => {

    if (args[0] == 'add') {

        if (!args[1]) return errors.noArgs(message, language == "en" ? `${prefixes}command add <command name> <command answer>` : `${prefixes} commande add <nom de la commande> <réponse de la commande>`, footer, language)
        if (!args[2]) return errors.noArgs(message, language == "en" ? `${prefixes}command add <command name> <command answer>` : `${prefixes} commande add <nom de la commande> <réponse de la commande>`, footer, language)
        if (bot.commands.get(args[1]) || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[1])) || data.customCommands.commands.find(x => x.name == args[1])) return errors.globalError(message, `${language  == "fr" ? "Cette commande existe déjà." : "This command already exists."}`, footer, language);

        var regex = /[^A-Za-z0-9_-]/;

        if (args[1].toLowerCase().match(regex)) {
            return errors.globalError(message, `${language  == "fr" ? "Une commande ne peut pas contenir de caractères spéciaux." : "A command cannot contain special characters."}`, footer, language);
        }

        let tempdata = data.customCommands
        tempdata.commands.push({
            name: args[1].toLowerCase(),
            answer: encodeURI(args.slice(2).join(" ")),
            date: Date.now(),
            creator: message.author.id
        })
        data.customCommands = tempdata
        data.save().then(async () => {
            let embed = new Discord.MessageEmbed()
                .setDescription(`${language ==  "fr"  ?  `**Commande ajoutée !**\n\nNom de la commande: ${args[1].toLowerCase()}` : `**Command added !** \n\nCommand name: ${args[1]}`}\n${language == "fr" ? `Réponse de la commande: \n${args.slice(2).join(" ")}` : `Command answer: \n${args.slice(2).join(" ")}`}`)
                .setFooter(footer)
                .setAuthor(message.author.username, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: true,
                    length: 1024
                }))
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send(embed).then(async (msg) => {
                msg.delete({
                    timeout: 15000
                })
            })
        })
    } else if (args[0] == "remove") {
        if (!args[1]) errors.noArgs(message, language == "en" ? `${prefixes}command remove <command name>` : `${prefixes} commande add <nom de la commande>`, footer, language)

const r = data.customCommands.commands.find(x => x.name = args[1].toLowerCase())
        if (r) {
            let tempdata = data.customCommands

tempdata.commands.splice(data.customCommands.commands.indexOf(r))

            data.customCommands = tempdata
            data.save().then(async () => {
                let embed = new Discord.MessageEmbed()
                    .setDescription(`${language ==  "fr"  ?  `**Commande supprimée !**` : `**Command deleted !**`}`)
                    .setFooter(footer)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        length: 1024
                    }))
                    .setColor("RANDOM")
                    .setTimestamp()
                message.channel.send(embed).then(async (msg) => {
                    msg.delete({
                        timeout: 15000
                    })
                })
            })
        } else {
            return errors.noArgs(message, language == "en" ? `${prefixes}command remove <command name>` : `${prefixes} commande add <nom de la commande>`, footer, language)
        }
    } else if (args[0] == "list") {
        try {

            let string;
            if (language == "fr") {
                string = `Veuillez patienter ${bot.config.emojis.loading}`
            }
            if (language == "en") {
                string = `Please wait ${bot.config.emojis.loading}`
            }

            let tdata = await message.channel.send(string)

            let p0 = 0;
            let p1 = 10;
            let page = 1;

            let embed = new Discord.MessageEmbed()

            if (language == "fr") {
                console.log(data.customCommands.commands)
                embed.setTitle(`__**» Liste des commandes personnalisées (${data.customCommands.commands.length})**__`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        length: 1024
                    }))
                    .setColor("RANDOM")
                    .setDescription(data.customCommands.commands
                        .map(r => r)
                        .map((c, i) => `${i + 1}・Nom de la commande: **${c.name}**\nRéponse de la commande: **${decodeURI(c.answer)}**\nCréateur de la commande: **${message.guild.members.cache.get(c.creator).user.tag}**\nDate de création: **${bot.timeConverter(new Date(c.date))}**`)
                        .slice(0, 10)
                        .join('\n\n') + `\n\nPage ${page} / ${Math.ceil(data.customCommands.commands.length / 10)}`)
                    .setTimestamp()
                    .setFooter(footer);
            }

            if (language == "en") {
                embed.setTitle(`__**» Custom commands list (${data.customCommands.commands.length})**__`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        length: 1024
                    }))
                    .setColor("RANDOM")
                    .setDescription(data.customCommands.commands
                        .map(r => r)
                        .map((c, i) => `${i + 1}・Command name: **${c.name}**\nCommand answer: **${decodeURI(c.answer)}**\nCommand creator: **${message.guild.members.cache.get(c.creator).user.tag}**\nCreation date: **${bot.compileDate (new Date (c.date))}**`)
                        .slice(0, 10)
                        .join('\n\n') + `\n\nPage ${page} / ${Math.ceil(data.customCommands.commands.length / 10)}`)
                    .setTimestamp()
                    .setFooter(footer);
            }

            let reac1
            let reac2
            let reac3

            if (data.customCommands.commands.length > 10) {
                reac1 = await tdata.react("⬅");
                reac2 = await tdata.react("❌");
                reac3 = await tdata.react("➡");
            }

            tdata.edit(" ", embed);

            const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

            data_res.on("collect", async (reaction) => {

                if (reaction.emoji.name === "⬅") {

                    p0 = p0 - 10;
                    p1 = p1 - 10;
                    page = page - 1

                    if (p0 < 0) {
                        return
                    }
                    if (p0 === undefined || p1 === undefined) {
                        return
                    }

                    if (language == "en") {
                        embed.setDescription(data.customCommands.commands
                            .map(r => r)
                            .map((c, i) => `${i + 1}・Command name: **${c.name}**\nCommand answer: **${decodeURI(c.answer)}**\nCommand creator: **${message.guild.members.cache.get(c.creator).user.tag}**\nCreation date: **${bot.compileDate (new Date (c.date))}**`)
                            .slice(p0, p1)
                            .join('\n\n') + `\n\nPage ${page} / ${Math.ceil(data.customCommands.commands.length / 10)}`)
                    }


                    if (language == "fr") {
                        embed.setDescription(data.customCommands.commands
                            .map(r => r)
                            .map((c, i) => `${i + 1}・Nom de la commande: **${c.name}**\nRéponse de la commande: **${decodeURI(c.answer)}**\nCréateur de la commande: **${message.guild.members.cache.get(c.creator).user.tag}**\nDate de création: **${bot.timeConverter(new Date(c.date))}**`)
                            .slice(p0, p1)
                            .join('\n\n') + `\n\nPage ${page} / ${Math.ceil(data.customCommands.commands.length / 10)}`)
                    }
                    tdata.edit(embed);

                }

                if (reaction.emoji.name === "➡") {

                    p0 = p0 + 10;
                    p1 = p1 + 10;

                    page++;

                    if (p1 > data.customCommands.commands.length + 10) {
                        return
                    }
                    if (p0 === undefined || p1 === undefined) {
                        return
                    }
                    if (language == "en") {
                        embed.setDescription(data.customCommands.commands
                            .map(r => r)
                            .map((c, i) => `${i + 1}・Command name: **${c.name}**\nCommand answer: **${decodeURI(c.answer)}**\nCommand creator: **${message.guild.members.cache.get(c.creator).user.tag}**\nCreation date: **${bot.compileDate (new Date (c.date))}**`)
                            .slice(p0, p1)
                            .join('\n\n') + `\n\nPage ${page} / ${Math.ceil(data.customCommands.commands.length / 10)}`)
                    }


                    if (language == "fr") {
                        embed.setDescription(data.customCommands.commands
                            .map(r => r)
                            .map((c, i) => `${i + 1}・Nom de la commande: **${c.name}**\nRéponse de la commande: **${decodeURI(c.answer)}**\nCréateur de la commande: **${message.guild.members.cache.get(c.creator).user.tag}**\nDate de création: **${bot.timeConverter(new Date(c.date))}**`)
                            .slice(p0, p1)
                            .join('\n\n') + `\n\nPage ${page} / ${Math.ceil(data.customCommands.commands.length / 10)}`)
                    }
                    tdata.edit(embed);

                }

                if (reaction.emoji.name === "❌") {
                    data_res.stop()
                    reac1.remove()
                    reac2.remove()
                    return reac3.remove()
                }

                await reaction.users.remove(message.author.id);

            })

        } catch (error) {
            console.log(error)
        }

    } else {
        errors.noArgs(message, `${prefixes}command <remove / add / list> <user>`, footer, language)
    }
}
module.exports.help = {
    name: "command",
    descriptionfr: "Gérer les commandes personnalisé sur le serveur.",
    descriptionen: "Manage custom commands on the server",
    botPermissions: [],
    userPermissions: ["ADMINISTRATOR"],
    staffOnly: false,
    ownerOnly: false,
    requirePremium: false,
    disabled: false,
}
