export default {
    async getUserData(value) {
        let uuid;
        if(/^[a-fA-F0-9]{32}$/.test(value)) {
            uuid = value
        } else if(/^[a-zA-Z0-9_]{1,16}$/.test(value)) {
            let data = await this.getUserFromUsername(value);
            if(data.id == null) this.returnInvalid();
            uuid = data.id
        } else {
            this.returnInvalid();
        }

        let userSession = await this.getUserSessionProfile(uuid)
        let usernameHistory = await this.getUserUsernameHistory(uuid);

        return JSON.stringify({
            uuid: userSession.id,
            username: userSession.name,
            history: usernameHistory,
            textures: JSON.parse(atob(userSession.properties[0].value)).textures
        })
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