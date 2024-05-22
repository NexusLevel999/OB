module.exports = {
    description: "Restart the server",
    aliases: ["reset","rest"],
    role: "admin",
    cooldown: 50,
    execute(api, event, args, commands) {
        api.sendMessage("Restarting the server...", event.threadID);
        setTimeout(() => {
            process.exit(1);
        }, 4000);
    }
};
