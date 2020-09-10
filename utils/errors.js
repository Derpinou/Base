const Discord = require("discord.js");
let config = require("../config.json");

module.exports.DoNotEveryone = (message, language, footer) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Mentions générales**__`)
        embed.setDescription("Les mentions générales dans une commande sont intérdites dans ce Discord.")
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» General mentions**__`)
        embed.setDescription("General mentions in an order are prohibited in this Discord.")
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.disabledCat = (message, cat, language, footer) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Catégorie désactivé**__`)
        embed.setDescription(`La catégorie \`${cat}\` est désactivé sur ce serveur.`)
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Disabled category**__`)
        embed.setDescription(`The \`${cat}\` category is disabled on this server.`)
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 10000
    }));
}

module.exports.disabledBot = (message, language, footer) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Bot désactivé**__`)
        embed.setDescription("Le bot est actuellement désactivé pour des raisons de maintenance,\npour continuer à utiliser le bot, payer les fonctions premiums ou utilisez le VoltBot Canary disponible [ici](https://discord.com/oauth2/authorize?client_id=723882059504025651&scope=bot&permissions=1006108159)")
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Bot disabled**__`)
        embed.setDescription("The bot is currently disabled for maintenance reasons,\nto continue using the bot, pay for premium features or use the VoltBot Canary available [here](https://discord.com/oauth2/authorize?client_id=723882059504025651&scope=bot&permissions=1006108159)")
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 10000
    }));
}

module.exports.disabledCommand = (message, command, language, footer) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Commande désactivée**__`)
        embed.setDescription("La commande ``" + command + "`` est temporairement désactivé.")
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Command disabled**__`)
        embed.setDescription("The command ``" + command + "`` is temporarily disabled.")
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.InsufficientAuthorisationLevel = (message, authorization, language, footer) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Niveau d'autorisation insuffisant**__`)
            .addField("Cette commande nécessite le niveau d'autorisation : ", authorization)
            .setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Insufficient authorization level**__`)
            .addField("This command requires the authorization level : ", authorization)
            .setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}


module.exports.noPerms = (message, perm, footer, language) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Permission insuffisante**__`)
        embed.addField("Vous avez besoin de la permission suivante : ", perm)
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Insufficient permission**__`)
        embed.addField("You must have this permission : ", perm)
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));

}

module.exports.noMultiPerms = (message, perm, footer, language) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Permissions insuffisantes**__`)
        embed.addField("Vous avez besoin des permissions suivantes : ", perm)
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Insufficients permissions**__`)
        embed.addField("You must have these following permissions : ", perm)
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));

}



module.exports.botPerms = (message, perm, footer, language) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Permission insuffisante**__`)
        embed.addField("J'ai besoin de la permission suivante : ", perm)
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Insufficient permission**__`)
        embed.addField("I must have this following permission : ", perm)
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));

}

module.exports.botMultiPerms = (message, perm, footer, language) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Permission insuffisante**__`)
        embed.addField("J'ai besoin des permissions suivantes : ", perm)
        embed.setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Insufficient permission**__`)
        embed.addField("I must have these following permissions : ", perm)
        embed.setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));

}

module.exports.globalError = (message, text, footer, language) => {
    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(text)
            .setFooter(footer);

    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(text)
            .setFooter(footer);
    }
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));

}



module.exports.nopermsend = (message, language) => {
    if (language == "fr") {
        message.channel.send("__**Permission insufissante : `EMBED_LINKS` <a:no:692785214367334534>**__\n\nAllez sur https://add.voltbot.xyz ou ajoutez lui la permission d'attacher des liens embed.");
    }

    if (language == "en") {
        message.channel.send("__**Insufficient permission : `EMBED_LINKS` <a:no:692785214367334534>**__\n\nPlease re-invite him under this invitation (https://add.voltbot.xyz) or add the permission \"Embed links\".");
    }
}

module.exports.notpremium = (message, footer, language) => {
    if (language == "fr") {
        let embed = new Discord.MessageEmbed()
            .setTitle(`__**» Erreur**__`)
            .setDescription("__**Le serveur n'est pas premium !**__\nContactez Freiik#0001 sur le [serveur discord](https://discord.gg/aB8gEud) pour acheter cette fonctionnalité.")
            .setColor(config.color.red)
            .addField('\u200b', '\u200b')
            .setTimestamp()
            .setFooter(footer);

        message.channel.send(embed);
    }
    if (language == "en") {
        let embed = new Discord.MessageEmbed()
            .setTitle(`__**» Error**__`)
            .setDescription("__**The server is not premium !**__\nPlease contact Freiik#0001 on the [support server](https://discord.gg/aB8gEud) to buy this fonctionality.")
            .setColor(config.color.red)
            .addBlankField()
            .setTimestamp()
            .setFooter(footer);

        message.channel.send(embed);
    }
}

module.exports.equalyou = (user, footer, language) => {
    if (language == "fr") {
        let embed = new Discord.MessageEmbed()
            .setTitle(`__**» Erreur**__`)
            .setDescription("Évite d'utiliser une commande sur toi")
            .setColor(config.color.red)
            .addField('\u200b', '\u200b')
            .setTimestamp()
            .setFooter(footer);

        user.send(embed);
    }
    if (language == "en") {
        let embed = new Discord.MessageEmbed()
            .setTitle(`__**» Error**__`)
            .setDescription("Avoid using a command on you")
            .setColor(config.color.red)
            .addBlankField()
            .setTimestamp()
            .setFooter(footer);

        user.send(embed);
    }
}

module.exports.equalPerms = (message, user, perms, footer, language) => {

    let embed = new Discord.MessageEmbed()
        .setColor(config.color.red);
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .addField(`**${user.user.tag}** a la permission`, perms);
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .addField(`**${user.user.tag}** has the permission`, perms);
    }
    embed.addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed);

}

module.exports.botuser = (message, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Tu ne peux pas effectuer des actions contre le bot`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(`You cannot perform actions against the bot`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.noNSFWChannel = (message, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Tu ne peux pas effectuer cette commande dans un salon non NSFW !`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(`You can only use this command in a NSFW channel !`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}


module.exports.roleNotExist = (message, role, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Tu doit créer le rôle ${role}`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .addField(`You must create the role ${role}`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);
    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.cantfindUser = (message, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Cet utilisateur n'existe pas sur le serveur`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(`This user doesn't exist on the server`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.noReason = (channel, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Mettez une raison`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(`Put a reason`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.noArgs = async (message, arg, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Veuillez utiliser ce format : ${arg}`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(`Please use this format : ${arg}`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}
module.exports.noGuildOwner = async (message, footer, language) => {
    let embed = new Discord.MessageEmbed();
    if (language == "fr") {
        embed.setTitle(`__**» Erreur**__`)
            .setDescription(`Seulement le créateur du serveur peut éxecuter cette commande !`)
    }
    if (language == "en") {
        embed.setTitle(`__**» Error**__`)
            .setDescription(`Only the owner of the server can execute this command !`)
    }
    embed.setColor(config.color.red)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}

module.exports.noLogChannel = async (message, prefixes, footer, language) => {

    let embed = new Discord.MessageEmbed()
    if (language == "fr") {
        embed.setTitle(`__**» Attention !**__`)
            .setDescription(`__Il n'y a pas de salon logs, pour cela, rien n'a été enrengistré.__\nPour ajouter ce salon, veuillez effectuer **${prefixes}setlogs** *(id ou mention de votre salon textuel)*.`)
    }
    if (language == "en") {

        embed.setTitle(`__**» Warning!**__`)
            .setDescription(`__There is no lounge logs, nothing has been registered for this.__ \n To add this lounge, please make **${prefixes}setlogs** *(id or mention of your lounge textual)*.`)
    }
    embed.setColor(config.color.orange)
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter(footer);

    message.channel.send(embed).then(m => m.delete({
        timeout: 5000
    }));
}
