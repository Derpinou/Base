const config = require("./config.json");
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js');

manager.spawn(config.shards.count);
