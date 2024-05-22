const axios = require('axios');

module.exports = {
    description: "Search for tracks on Spotify",
    version:"1.0.0",
    aliases:["sptfy","spotify"],
usage: "",
    role: "user",
    credits: "nexk",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length === 0) {
            return api.sendMessage("Please provide a search query.", event.threadID);
        }

        const query = encodeURIComponent(args.join(" "));
        const apiUrl = `http://94.130.129.40:8370/search/spotify?q=${query}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else if (response.data.tracks.length === 0) {
                api.sendMessage("No tracks found.", event.threadID);
            } else {
                const tracks = response.data.tracks.map(track => `${track.name} by ${track.artists.join(", ")}`);
                const message = tracks.join("\n");
                api.sendMessage(message, event.threadID);
            }
        } catch (error) {
            console.error(`Error searching for tracks on Spotify: ${error}`);
            api.sendMessage("An error occurred while searching for tracks on Spotify.", event.threadID);
        }
    }
};
