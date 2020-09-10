'use strict';

const request = require('request');

class MojangAPI {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static async fetchProfile(string) { // TODO: finish
        if (string.length > 36) return;

        let trimmedUUID = undefined;

        if (string.length <= 16) {
            try {
                const response = await this.usernameToUUID(string);
    
                trimmedUUID = response.id;
            } catch (error) {
                return;
            }
        } else if (string.length === 36) {
            /**
             * TODO:
             * - charactère en minuscules
             * - 4 tirets
             */

            trimmedUUID = string.replace(/-/g, '');
        } else if (string.length === 32) {
            /**
             * TODO:
             * - charactère en majuscule
             */

            trimmedUUID = string; 
        } else {
            return;
        }

        let usernames = undefined;

        try {
            const response = await this.uuidToUsernames(trimmedUUID);

            usernames = [];

            for (let index = response.length - 1; index >= 0; --index) {
                usernames.push({ value: response[index].name, changedToAt: response[index].changedToAt })
            }
        } catch (error) {
            return;
        }

        return { 
            trimmedUUID: trimmedUUID, 
            uuid: this._createUUID(trimmedUUID), 
            usernames: usernames 
        };
    }

    static _createUUID(trimmedUUID) {
        return trimmedUUID.substr(0, 8) + '-' + trimmedUUID.substr(8, 4) + '-' + trimmedUUID.substr(12, 4) + '-' + trimmedUUID.substr(16, 4) + '-' + trimmedUUID.substr(20);
    }

    static usernameToUUID(username) {
        return this._promise(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`);
    }

    static uuidToUsernames(uuid) {
        return this._promise(`https://api.mojang.com/user/profiles/${encodeURIComponent(uuid)}/names`);
    }

    static _promise(url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, function(error, response, body) {
                if (body === undefined) return reject(new Error());
        
                if (body.error) return reject(new Error(`${body.error}: ${body.errorMessage}`));
        
                resolve(body);
            });
        });
    }
}

module.exports = MojangAPI;