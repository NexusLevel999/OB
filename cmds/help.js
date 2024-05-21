module.exports = {
    description: "Show Commands and the descriptions",
    role: "user",
    credits: "rejardgwapo",
    cooldown: 16,		
    execute(api, event, args, commands) {
        let helpMessage = 'Available Cmds\n';
        helpMessage += '💮═══════════════💮\n';
        commands.forEach((command, name) => {
            helpMessage += `𝙽𝚊𝚖𝚎: ${name}\n`;
            helpMessage += `𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${command.description}\n`;
            helpMessage += `𝚁𝚘𝚕𝚎: ${command.role}\n`;
            helpMessage += `Credits: ${command.credits}\n`;
        helpMessage += '💮═══════════════💮\n';
        });
        helpMessage += 'https://facebook.com/kaizu.ui';
        api.sendMessage(helpMessage, event.threadID);
    }
};
