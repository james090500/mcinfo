export default {
    async getUserData(value) {
        //Check if the provided data is a UUID or a valid minecraft username
        let uuid;
        if(/^[a-fA-F0-9]{32}$/.test(value)) {
            //UUID is a UUID perfect!
            uuid = value
        } else if(/^[a-zA-Z0-9_]{1,16}$/.test(value)) {
            //Try get the UUID from the cache otherwise from the API
            uuid = await NAMES.get(value);
            if(uuid === null) {
                let data = await this.getUserFromUsername(value);
                if(data.id == null) this.returnInvalid();
                uuid = data.id
            }
        } else {
            //Was neither a valid username or UUID
            this.returnInvalid();
        }

        //Return cache if it exsits
        let profile = await PROFILES.get(uuid);
        if(profile !== null) return profile;

        //Get data about the user from various endpoints
        let userSession = await this.getUserSessionProfile(uuid)
        let usernameHistory = await this.getUserUsernameHistory(uuid);

        //Build a response object
        profile = JSON.stringify({
            uuid: userSession.id,
            username: userSession.name,
            history: usernameHistory,
            textures: JSON.parse(atob(userSession.properties[0].value)).textures
        })

        //Inset the data in to the profiles
        NAMES.put(userSession.name, userSession.id, { expirationTtl: 86400 })
        PROFILES.put(userSession.id, profile, { expirationTtl: 300 })

        //Return response as a JSON
        return profile
    },
    async getSkin(value) {
        let profile = await this.getUserData(value);
        let skin = await fetch(JSON.parse(profile).textures.SKIN.url)
        let skinBlob = await skin.blob();
        return skinBlob;
    },
    async getCape(value) {
        let profile = await this.getUserData(value);
        let cape = await fetch(JSON.parse(profile).textures.CAPE.url)
        let capeBlob = await cape.blob();
        return capeBlob;
    },
    async getUserFromUsername(username) {
        let response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        let data = await response.json();
        return data;
    },
    async getUserSessionProfile(uuid) {
        let response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        let data = await response.json();
        return data;
    },
    async getUserUsernameHistory(uuid) {
        let response = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
        let data = await response.json();
        return data;
    },
    returnInvalid() {
        return JSON.stringify({
            success: false,
            message: "The data provided was invalid"
        })
    }
}