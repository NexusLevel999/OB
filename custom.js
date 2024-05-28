function init(api) {
    const message = "if this message comes, means the bot is alive, thank you for using.";

    sendHourlyMessage(api, message);
    
    let lastRequestTime = 0; // Variable to store the timestamp of the last friend request
    
    setInterval(() => {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastRequestTime;
        
        // Check if at least 1 minute has passed since the last friend request
        if (timeDifference >= 60000) {
            api.getPendingFriendRequests((err, requests) => {
                if (err) {
                    console.error('Error fetching friend requests:', err);
                    return;
                }
                if (requests.length > 0) {
                    const userToAccept = requests[0].userID; // Accept the first pending request
                    api.handleFriendRequest(userToAccept, true, (err) => {
                        if (err) {
                            console.error(`Error handling friend request from user ${userToAccept}:`, err);
                        } else {
                            console.log(`Friend request from user ${userToAccept} handled.`);
                        }
                    });
                }
            });
            
            lastRequestTime = currentTime; // Update the last request time
        }
    }, 1000); // Check every second
}
