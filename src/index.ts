import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { blink } from "./consoleeffects";
import colors from "ansi-colors";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./socket";
import cors from "cors";
import morgan from "morgan";
import MainRouter from "./routes";

const PORT = process.env.PORT || 8080;
const ISDEV = process.env.NODE_ENV !== "production";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Database
require("./database");

// start listening
const server = app.listen(PORT, () => {
  console.clear();
  console.log(
    `    Server running on PORT: ${blink(
      colors.green.underline(PORT + "")
    )} at ${new Date().toLocaleString()} as ${colors.green(
      ISDEV ? "development" : "production"
    )} mode`
  );
  console.log(colors.redBright("    Press Ctrl+C to quit."));
});

// Routes
app.use(MainRouter);

// make a socket server
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

// listen to sockets on connection
io.on("connection", (socket) => {
  console.log(colors.green("    user connected   : " + socket.id));
  // listen to message event
  socket.on("message", (message: string) => {
    console.log(message);
  });

  // listen to disconnect event
  socket.on("disconnect", () => {
    console.log(colors.redBright("    user disconnected: " + socket.id));
  });
});
