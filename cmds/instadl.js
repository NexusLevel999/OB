const axios = require('axios');

module.exports = {
    description: "instagram reel dl",
    role: "user",
    credits: "nexk",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length === 0) {
            return api.sendMessage("Please provide url reel.", event.threadID);
        }

        const userUrl = encodeURIComponent(args.join(" "));
        const apiUrl = `http://94.130.129.40:8370/api/instadl?userUrl=${userUrl}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else if (!response.data.download_link) {
                api.sendMessage("No download link found.", event.threadID);
            } else {
                api.sendMessage(response.data.download_link, event.threadID);
            }
        } catch (error) {
            console.error(`Error downloading Instagram content: ${error}`);
            api.sendMessage("An error occurred while downloading Instagram content.", event.threadID);
        }
    }
};
