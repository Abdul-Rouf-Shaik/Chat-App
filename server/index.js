const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");
require("dotenv").config();

// Validate environment variables
if (!process.env.CORS_ORIGIN || !process.env.MONGO_URL || !process.env.PORT) {
  console.error("One or more required environment variables are missing.");
  process.exit(1);
}

const app = express();

// Middleware for handling CORS and parsing JSON
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// Define routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

// Set up Socket.IO
const io = socket(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
});

// Global map to store online users
global.onlineUsers = new Map();

// Socket.IO connection event
io.on("connection", (socket) => {
  // Store the chat socket globally
  global.chatSocket = socket;

  // Handle "add-user" event
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Handle "send-msg" event
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });

  // Handle Socket.IO errors
  socket.on("error", (err) => {
    console.error("Socket.IO Error:", err);
  });
});
