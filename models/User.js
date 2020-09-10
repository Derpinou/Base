const chalk = require('chalk');

module.exports = async (Sequelize, volt) => {
    try {
        volt.database.define('users', {

            //CONFIGURATION
            userID: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            pastUsernames: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: "[]"
            },
            pastAvatars: {
                type: Sequelize.STRING(10000),
                allowNull: false,
                defaultValue: "[]"
            },
            botBlacklisted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            afk: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"reason":"","date":""}`,
                get: function () {
                    return JSON.parse(this.getDataValue('afk'));
                },
                set: function (plugins) {
                    this.setDataValue('afk', JSON.stringify(plugins));
                },
            },
            reminds: {
                type: Sequelize.TEXT,
                defaultValue: "[]",
                get: function() {
                    return JSON.parse(this.getDataValue('reminds'));
                },
                set: function(r) {
                    this.setDataValue('reminds', JSON.stringify(foodHabits));
                }
            },
        }, {
            timestamps: true
        });
        return volt.database.models;
    } catch (error) {
        console.log(error)
    }
}