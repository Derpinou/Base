module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }

  async run() {
    let startAt = Date.now()
    const bot = this.bot

    let logs = bot.database.models.logs.create({
      type: "READY",
      shard: bot.shard.id,
      timeout: Date.now() - startAt,
  });

    var interval;
    clearInterval(interval);
    var statuses = [
      "online",
      "idle",
      "dnd"
    ];
    interval = setInterval(() => {
      const promises = [
          bot.shard.fetchClientValues('guilds.cache.size'),
          bot.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
      ];
      
      Promise.all(promises)
          .then(async results => {
              const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
              const totalUsers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
      var activities = [
        "🇫🇷 • A french discord bot",
        "💻 • https://voltbot.xyz",
        "🤖 • " + bot.config.shards.count + " shards",
        totalUsers + " users 👥 • " + totalGuilds + " guilds 🎈"
      ];
      
      const activityname = activities[Math.floor(Math.random() * activities.length)];
      const statusstring = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setPresence({
        activity: {
          name: activityname,
          type: "WATCHING"
        },
        status: statusstring
      });
      });
    }, 14400);
  }
}
