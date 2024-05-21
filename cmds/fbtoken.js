const axios = require('axios');

module.exports = {
    description: "Get FB Token",
    role: "user",
    credits: "nexk",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length < 2) {
            return api.sendMessage("Please provide both username and password.\n\nexample: ${prefix}fbtoken [username] [password]", event.threadID);
        }

        const [username, password] = args;
        const apiUrl = `http://94.130.129.40:8370/fb/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else {
                api.sendMessage(`Facebook Token: ${response.data.token}`, event.threadID);
            }
        } catch (error) {
            console.error(`Error fetching Facebook token: ${error}`);
            api.sendMessage("An error occurred while fetching the Facebook token.", event.threadID);
        }
    }
};
