const axios = require('axios');

module.exports = {
    description: "fb shield",
    version: "",
    aliases: ["guard","guardon","fbguard","safeguard"],
    usage:"[fbshield <token>]",
    role: "user",
    credits: "nexk",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length < 2) {
            return api.sendMessage("Please provide both token and enable/disable status.", event.threadID);
        }

        const [token, enable] = args;
        const apiUrl = `http://94.130.129.40:8370/api/shield?token=${encodeURIComponent(token)}&enable=${encodeURIComponent(enable)}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else {
                api.sendMessage(`Shield ${enable === 'true' ? 'enabled' : 'disabled'} successfully.`, event.threadID);
            }
        } catch (error) {
            console.error(`Error changing shield status: ${error}`);
            api.sendMessage("An error occurred while changing the shield status.", event.threadID);
        }
    }
};
