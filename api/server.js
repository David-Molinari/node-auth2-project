const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/users-router.js");
const registerRouter = require("../auth/register-router.js");
const loginRouter = require("../auth/login-router.js")
const authenticator = require("../auth/authenticator.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/users", authenticator, usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;