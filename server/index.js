const { createServer } = require("http");
const express = require("express");
const path = require('path');
const cors = require("cors");
const socketIo = require("socket.io");
const {
    createNewSession,
    welcomeUser,
    joinUserToSession,
    setUserVote,
    clearUserVotes,
    showUserVotes,
} = require("./services");

const config = require("./config");
const routes = require("./routes");

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

if (config.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}

const server = createServer(app);
const io = socketIo(server, {
    cors: {
        origin: [config.CLIENT_URL],
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use((req, res, next) => {
    res.io = io;
    next();
});

io.on("connection", socket => {
    console.info("Client connected");

    socket.on("CREATE_SESSION_EVENT", () => {
        createNewSession(socket);
    })

    socket.on("USER_OPENED_PAGE_EVENT", () => {
        welcomeUser(socket);
    });

    socket.on("JOIN_USER_TO_SESSION_EVENT", (data) => {
        joinUserToSession(data, io);
    });

    socket.on("SET_USER_VOTE_EVENT", (data) => {
        setUserVote(data, io);
    });

    socket.on("CLEAR_USER_VOTES_EVENT", () => {
        clearUserVotes(io);
    });

    socket.on("SHOW_USER_VOTES_EVENT", () => {
        showUserVotes(io);
    });

    socket.on("disconnect", () => {
        console.info("Client was disconnected!");
    });
});

server.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});
