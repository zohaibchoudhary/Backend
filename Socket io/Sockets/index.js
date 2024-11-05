import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 5000;

const server = createServer(app);

const io = new Server(server);

app.use(express.static("./public"));
app.get("/", (req, res) => {
    res.sendFile("/public/index.html");
});

// sockets

io.on("connection", (socket) => {
    console.log("a user connected", socket);
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
