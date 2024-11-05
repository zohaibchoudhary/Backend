import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// open the database file
const db = await open({
    filename: "chat.db",
    driver: sqlite3.Database,
});

await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
        );
    `);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    connectionStateRecovery: {},
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
    res.sendFile("/public/index.html");
});

// Now starts the socket.io
io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("chat message", async (message) => {
        let result;
        try {
            // store the message in the database
            result = await db.run(
                "INSERT INTO messages (content) VALUES (?)",
                message
            );
        } catch (e) {
            console.error(e);
            return;
        }
        // include the offset with the message
        io.emit("chat message", message, result.lastID);
        socket.on("connect", async () => {
            if (socket.recovered) {
                // if the connection state recovery was not successful
                try {
                    await db.each(
                        "SELECT id, content FROM messages WHERE id > ?",
                        [socket.handshake.auth.serverOffset || 0],
                        (_err, row) => {
                            socket.emit("chat message", row.content, row.id);
                        }
                    );
                } catch (e) {
                    console.error(e);
                }
            }
        });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

httpServer.listen(3000, () => {
    console.log("Server running on port 3000");
});

