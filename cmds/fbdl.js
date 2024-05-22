const axios = require('axios');

module.exports = {
    description: "Fbdown",
    version: "1.0.3",
    aliases: ["fbdl","fbdown"],
    usage: "[fbdl <url>",
    role: "user",
    credits: "nexk",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length === 0) {
            return api.sendMessage("Please provide a URL.", event.threadID);
        }

        const url = encodeURIComponent(args.join(" "));
        const apiUrl = `http://94.130.129.40:8370/facebook?url=${url}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else if (!response.data.data) {
                api.sendMessage("No Facebook data found.", event.threadID);
            } else {
                api.sendMessage(response.data.data, event.threadID);
            }
        } catch (error) {
            console.error(`Error fetching Facebook data: ${error}`);
            api.sendMessage("An error occurred while fetching Facebook data.", event.threadID);
        }
    }
};
