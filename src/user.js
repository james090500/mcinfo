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
                if(data == null || data.id == null) return null;
                uuid = data.id
            }
        } else {
            //Was neither a valid username or UUID
            return null;
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
        if(profile === null) return null;

        if(JSON.parse(profile).textures.SKIN == null) return null;
        let skin = await fetch(JSON.parse(profile).textures.SKIN.url)

        let skinBlob = await skin.blob();
        return skinBlob;
    },
    async getCape(value, capeType) {
        let profile = JSON.parse(await this.getUserData(value));
        if(profile === null) return null;

        //Set the default cape source as official
        let capeSrc;
        if(profile.textures.CAPE != null) {
            capeSrc = profile.textures.CAPE.url
        }

        //Try the other endpoints
        if(capeType != null) {
            if(capeType == "minecraftcapes") {
                capeSrc = `https://minecraftcapes.net/profile/${profile.uuid}/cape`
            }

            if(capeType == "labymod") {
                capeSrc = `https://dl.labymod.net/capes/${await this.getHashedUuid(profile.uuid)}`
            }

            if(capeType == "optifine") {
                capeSrc = `http://s.optifine.net/capes/${profile.username}.png`
            }

            if(capeType == "mantle") {
                capeSrc = `https://capes.mantle.gg/capes/${profile.username}.png`
            }
        }

        //If no cape, lets return nothing
        if(capeSrc == null) return null;

        let cape = await fetch(capeSrc)
        if(!cape.ok) return null;
        let capeBlob = await cape.blob();
        return capeBlob;
    },
    async getUserFromUsername(username) {
        let response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if(!response.ok || response.status == 204) return null;
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
    async getHashedUuid(uuid) {
        return uuid.substr(0,8) + "-" + uuid.substr(8,4) + "-" + uuid.substr(12,4) + "-" + uuid.substr(16,4) + "-" + uuid.substr(20);
    }
}