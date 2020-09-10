const chalk = require('chalk');

module.exports = async (Sequelize, volt) => {
    try {
        volt.database.define('logs', {

            type: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            guild: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            channel: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            author: {
                type: Sequelize.STRING(25),
                allowNull: true,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            tts: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            error: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            timeout: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            shard: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }

        }, {
            timestamps: true
        });
        return volt.database.models;
    } catch (error) {
        console.log(error)
    }
}
