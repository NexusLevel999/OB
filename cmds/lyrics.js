const axios = require('axios');

module.exports = {
    description: "Search for lyrics",
    role: "user",
    credits: "nexk",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length === 0) {
            return api.sendMessage("Please provide a search query.", event.threadID);
        }

        const query = encodeURIComponent(args.join(" "));
        const apiUrl = `http://94.130.129.40:8370/search/lyrics?q=${query}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else if (!response.data.lyrics) {
                api.sendMessage("No lyrics found.", event.threadID);
            } else {
                api.sendMessage(response.data.lyrics, event.threadID);
            }
        } catch (error) {
            console.error(`Error searching for lyrics: ${error}`);
            api.sendMessage("An error occurred while searching for lyrics.", event.threadID);
        }
    }
};
