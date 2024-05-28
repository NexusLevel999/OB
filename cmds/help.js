module.exports = {
    description: "Show Commands and the descriptions",
    role: "user",
    credits: "rejardgwapo",
    cooldown: 16,
    execute(api, event, args, commands) {
        let senderName = event.senderName; // Assuming event has senderName property

        if (args.length > 0) {
            // If a specific command is requested
            const commandName = args[0];
            const command = commands.get(commandName);

            if (command) {
                let specificHelpMessage = `Command: ${commandName}\n`;
                specificHelpMessage += `Description: ${command.description}\n`;
                specificHelpMessage += `Role: ${command.role}\n`;
                specificHelpMessage += `Credits: ${command.credits}\n`;
                specificHelpMessage += `Cooldown: ${command.cooldown} seconds\n`;

                api.sendMessage(specificHelpMessage, event.threadID);
            } else {
                api.sendMessage(`Command "${commandName}" not found.`, event.threadID);
            }
        } else {
            // General help message
            let helpMessage = `Hello, ${senderName}, here's my available commands\n\n`;

            commands.forEach((command, name) => {
                helpMessage += `${name}\n`;
            });

            helpMessage += '\nType "help [command name]" for full information on a specific command.';

            api.sendMessage(helpMessage, event.threadID);
        }
    }
};
