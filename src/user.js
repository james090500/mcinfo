export default {
    async getUserData(value) {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${value}`);
        const data = await response.json();
        return JSON.stringify(data);
    }
}