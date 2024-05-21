module.exports = {
    description: "Show Commands and the descriptions",
    role: "user",
    credits: "rejard",
    cooldown: 16,		
    execute(api, event, args, commands) {
        let helpMessage = 'Available Cmds\n';
        commands.forEach((command, name) => {
            helpMessage += `Name: ${name}\n`;
            helpMessage += `Description: ${command.description}\n`;
            helpMessage += `Role: ${command.role}\n`;
            helpMessage += `Credits: ${command.credits}\n`;
        });
        api.sendMessage(helpMessage, event.threadID);
    }
};
