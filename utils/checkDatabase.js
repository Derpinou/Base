module.exports = async (bot) => {
    bot.guilds.cache.forEach(async g => {

        let data = await bot.database.models.guilds.findOne({
            where: {
                guildID: g.id
            }
        })

        if(!data) data = await bot.database.models.guilds.create({
            guildID: g.id
        })

        require("system-sleep")(5000)
      })
}