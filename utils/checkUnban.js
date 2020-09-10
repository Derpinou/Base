module.exports = async (bot) => {
        await bot.database.models.members.findAll()
        .then(datas => {
            datas.forEach(async(result) => {
                let g = bot.guilds.cache.get(result.guildID)

                if(!g) return
                if (result.banreason != "") {
                    //if (!g.me.hasPermission("BAN_MEMBERS") && !g.me.hasPermission("MANAGE_GUILD")) return;
                    //const banList = await g.fetchBans();
                    //const bannedUser = banList.find(user => user.id === result.userID);
                    //if (!bannedUser) return

                    if (Date.now() > result.bantime) {
                        g.members.unban(result.userID, "The ban hammer has resolved!");
                        result.banreason = "";
                        result.bantime = "";
                        result.save();
                    }
                }
            });
        }).catch(e => {
            return console.log(e)
        });
}