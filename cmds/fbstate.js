const axios = require('axios');

module.exports = {
    description: "Get fbstate",
    version: "1.0.0",
    aliases: ["appstate","getstate","get"],
    usage: "[fbstate <username> <password>]",
    role: "user",
    credits: "Mark",
    cooldown: 10,
    execute: async function(api, event, args, commands) {
        if (args.length < 2) {
            return api.sendMessage("Please provide both email and password.\n\nexample: ${prefix}fbstate [email/username/uid] [password].", event.threadID);
        }

        const [email, password] = args;
        const apiUrl = `http://94.130.129.40:8370/api/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.error) {
                api.sendMessage(`Error: ${response.data.error}`, event.threadID);
            } else {
                api.sendMessage(`App State: ${JSON.stringify(response.data)}`, event.threadID);
            }
        } catch (error) {
            console.error(`Error fetching app state: ${error}`);
            api.sendMessage("An error occurred while fetching the app state.", event.threadID);
        }
    }
};
