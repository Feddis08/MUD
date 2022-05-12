"use strict";
const GameServer = require("./classes/module/GameServer.js");
const IO = require("./classes/module/IO.js");
const commands = require("./classes/module/commands.js");
var express = require("express");
var app = express();
var port = 3030;
var socket = require("socket.io");
var server = app.listen(port, function () {
    console.log("[INIT][WEB_SERVER]: starting at port: " + port + " ...");
});
app.use(express.static("../frontend"));
var io = socket(server);
IO.socketIO = io;
io.on("connection", (socket) => {
    let id = socket.id;
    console.log("[I/O][SOCKET_STREAM_CONNECTION]: User started a stream: ", id);
    socket.on("join", (data) => {
        GameServer.add_player_by_socketID(id, data.player_name);
    })
    socket.on("chat", (message) => {
        commands.executer(message, id);
    })
})