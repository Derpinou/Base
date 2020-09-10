const chalk = require('chalk');

module.exports = async (Sequelize, volt) => {
    try {
        volt.database.define('guilds', {

            // CONFIGURATION
            guildID: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            prefix: {
                type: Sequelize.STRING(1),
                defaultValue: volt.config.settings.prefix,
                allowNull: false
            },
            language: {
                type: Sequelize.STRING(2),
                defaultValue: volt.config.settings.language
            },
            interserver: {
                type: Sequelize.STRING(25),
                allowNull: true
            },
            commandsMade: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            footer: {
                type: Sequelize.TEXT,
                defaultValue: `VoltBot`,
                allowNull: false
            },
            premium: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            whitelist: {
                type: Sequelize.TEXT,
                defaultValue: "",
                get() {
                    return this.getDataValue('whitelist').split('=%;')
                },
                set(val) {
                    this.setDataValue('whitelist', val.join('=%;'));
                },
            },
            announcement: {
                type: Sequelize.STRING(25),
                allowNull: true
            },
            chatbot: {
                type: Sequelize.STRING(25),
                allowNull: true
            },
            poll: {
                type: Sequelize.STRING(25),
                allowNull: true
            },
            antibadwords: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"customWords":[]}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('antibadwords'));
                },
                set: function (plugins) {
                    this.setDataValue('antibadwords', JSON.stringify(plugins));
                },
            },
            antibot: {
                type: Sequelize.BOOLEAN
            },
            antilink: {
                type: Sequelize.BOOLEAN
            },
            antimessage: {
                type: Sequelize.TEXT,
                defaultValue: "",
                get() {
                    return this.getDataValue('antimessage').split('=%;')
                },
                set(val) {
                    this.setDataValue('antimessage', val.join('=%;'));
                },
            },
            antipub: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            antiraid: {
                type: Sequelize.TEXT,
                defaultValue: "off",
                allowNull: false
            },
            antispam: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            autorole: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"roles":[]}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('autorole'));
                },
                set: function (plugins) {
                    this.setDataValue('autorole', JSON.stringify(plugins));
                },
            },
            levels: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"channel":"default","roles":[]}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('levels'));
                },
                set: function (plugins) {
                    this.setDataValue('levels', JSON.stringify(plugins));
                },
            },
            ticket: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"category":null,"tickets":[]}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('ticket'));
                },
                set: function (plugins) {
                    this.setDataValue('ticket', JSON.stringify(plugins));
                },
            },
            welcome: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"message":null,"channel":null}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('welcome'));
                },
                set: function (plugins) {
                    this.setDataValue('welcome', JSON.stringify(plugins));
                },
            },
            goodbye: {
                type: Sequelize.TEXT,
                defaultValue: `{"enabled":false,"message":null,"channel":null}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('goodbye'));
                },
                set: function (plugins) {
                    this.setDataValue('goodbye', JSON.stringify(plugins));
                },
            },
            logs: {
                type: Sequelize.TEXT,
                defaultValue: `{"mod":null,"voice":null,"tickets":null,"users":null,"messages":null,"server":null,"bot":null,"all":null}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('logs'));
                },
                set: function (plugins) {
                    this.setDataValue('logs', JSON.stringify(plugins));
                },
            },
            deleteCommandMessage: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            ignoredChannels: {
                type: Sequelize.TEXT,
                defaultValue: "",
                get() {
                    return this.getDataValue('ignoredChannels').split('=%;')
                },
                set(val) {
                    this.setDataValue('ignoredChannels', val.join('=%;'));
                },
            },
            customCommands: {
                type: Sequelize.TEXT,
                defaultValue: `{"commands":[]}`,
                allowNull: false,
                get: function () {
                    return JSON.parse(this.getDataValue('customCommands'));
                },
                set: function (plugins) {
                    this.setDataValue('customCommands', JSON.stringify(plugins));
                },
            },
            disabledCategories: {
                type: Sequelize.TEXT,
                defaultValue: "",
                get() {
                    return this.getDataValue('disabledCategories').split('=%;')
                },
                set(val) {
                    this.setDataValue('disabledCategories', val.join('=%;'));
                },
            },
            tickets: {
                type: Sequelize.TEXT,
                defaultValue: "",
                get() {
                    return this.getDataValue('tickets').split('=%;')
                },
                set(val) {
                    this.setDataValue('tickets', val.join('=%;'));
                },
            },
            botBlacklisted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        }, {
            timestamps: false
        });
        return volt.database.models;
    } catch (error) {
        console.log(error)
    }
}