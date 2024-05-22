module.exports = {
    description: "Show available commands or details of a specific command",
    role: "user",
    credits: "rejard | nexk",
    cooldown: 10,
    execute(api, event, args, commands) {
        const commandNames = Array.from(commands.keys());

        if (args.length === 0 || args[0] === "1") {
            // Show first page (default) or specified page
            const page = args.length === 0 ? 1 : parseInt(args[0]);
            const perPage = 5;
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const totalPages = Math.ceil(commandNames.length / perPage);
            
            if (startIndex >= commandNames.length) {
                api.sendMessage(`Page ${page} is out of range.`, event.threadID);
            } else {
                const pageCommands = commandNames.slice(startIndex, endIndex);
                const commandList = pageCommands.join(', ');
                api.sendMessage(`Available commands (Page ${page}/${totalPages}):\n${commandList}`, event.threadID);
            }
        } else {
            // Show details of a specific command
            const commandName = args[0];
            const command = commands[commandName];
            if (!command) {
                api.sendMessage(`Command '${commandName}' not found.`, event.threadID);
            } else {
                let message = `Name: ${commandName}\n`;
                message += `Description: ${command.description}\n`;
                message += `Role: ${command.role}\n`;
                message += `Credits: ${command.credits}\n`;
                message += `Usage: /${commandName}\n`;
                api.sendMessage(message, event.threadID);
            }
        }
    }
};
