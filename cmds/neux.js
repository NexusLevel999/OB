module.exports = {
  config: {
    name: "neux",
    description: "Talk to GPT (conversational)",
    prefix: false,
    usage: "[ask]",
    accessableby: 0
  },
  start: async function ({ text, message_reply, react, event }) {
    const axios = require('axios');
    const uid = event.senderID;
    const prompt = text.join(' ');

    if (!prompt) return message_reply('Please enter a prompt.');
    react('✨');

    try {
      const response = await axios.get(`https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=${prompt}&uid=${uid}`);
      const result = response.data.gpt4;
      return message_reply(result);
    } catch (error) {
      return message_reply(`Error: ${error.message}`);
    }
  }
}
