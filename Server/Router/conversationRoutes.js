const express = require("express");

const {
  sendMessage,
  getMessage,
} = require("../controler/conversationController");
const protectRoute = require("../middelware/protectRoute");

const conversationRoute = express.Router();

conversationRoute.get("/:id", protectRoute, getMessage);
conversationRoute.post("/sendmessage/:id", protectRoute, sendMessage);

module.exports = conversationRoute;
