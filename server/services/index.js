const { v4: uuidv4 } = require('uuid');

const sessions = [];
const users = [];

const createNewSession = (socket) => {
    const sessionId = uuidv4();
    const startDate = new Date().toISOString();
    
    sessions.push({
        sessionId,
        startDate,
    });

    socket.emit("SESSION_CREATED_EVENT", sessionId);
};

const welcomeUser = (socket) => {
    console.log("user open the home page");
    socket.emit("WELCOME_USER_EVENT", users);
};

const joinUserToSession = ({ sessionId, userName, userId }, io) => {
    console.log("user wants join to session");
    const joinAt = new Date().toISOString();
    
    const newUser = {
        sessionId,
        userId,
        userName: userName.toUpperCase(),
        joinAt,
    };
    users.push(newUser);

    io.emit("USER_JOINED_TO_SESSION_EVENT", newUser);
};

const setUserVote = ({ userId, valueToVote }, io) => {
    console.log(`UserId: ${userId} votes ${valueToVote}`);
    const userIndex = users.findIndex(user => user.userId === userId);
    const user = users[userIndex];
    console.log(user);
    user.vote = valueToVote;
    console.log(user);
    users.splice(userIndex, 1, user);
    console.log(users)
    io.emit("REFRESH_USER_VOTES_EVENT", users);
};

const clearUserVotes = (io) => {
    const userWithoutVotes = users.map(user => {
        user.vote = null;
        return user;
    });

    io.emit("CLEARED_USER_VOTES_EVENT", userWithoutVotes);
};

const showUserVotes = (io) => {
    io.emit("SHOW_USER_VOTES_EVENT", users);
};

module.exports = {
    createNewSession,
    welcomeUser,
    joinUserToSession,
    setUserVote,
    clearUserVotes,
    showUserVotes,
};
