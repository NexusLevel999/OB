module.exports = {
    description: "Talk to sim",
    role: "user",
    credits: "jerome",
    cooldown: 0,
    execute: async function(api, event, args, commands) {
        const axios = require("axios");
        const { messageID, threadID, senderID } = event;

        const repliedMessage = event.messageReply && event.messageReply.senderID === api.getCurrentUserID();
        
        if (repliedMessage || args.length > 0) {
            try {
                const content = repliedMessage ? event.messageReply.body : args.join(" ");
                const res = await axios.get(`https://sim-api-ctqz.onrender.com/sim?query=${encodeURIComponent(content)}`);
                const respond = res.data.respond;

                if (res.data.error) {
                    api.sendMessage(`Error: ${res.data.error}`, threadID, messageID);
                } else {
                    api.sendMessage(respond, threadID, messageID);
                }
            } catch (error) {
                console.error(error);
                api.sendMessage("An error occurred while fetching the data.", threadID, messageID);
            }
        }
    }
};
