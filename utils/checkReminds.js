module.exports = async (bot) => {
    let dateNow = Date.now()
    bot.users.cache.forEach(async (u) => {
        await bot.database.models.users.findAll({
            where: {
                userID: u.id
            }
        }).then(datas => {
            datas.forEach(async(result) => {
                result.reminds.get().forEach(async(r) => {
                    if(r.date >= Date.now()) {
                        bot.users.cache.get(r.userID).send(`Your reminds: ${r.text}`)
                    }
                })
            });
        }).catch(e => {
            return;
        });
    })
}