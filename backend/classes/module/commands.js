const { is } = require("express/lib/request");
const GameServer = require("./GameServer.js");
const IO = require("./IO.js");
commands = {
    ping(player) {
        IO.send("chat", "pong", player.socketID, true);
    },
    players_list(player) {
        let list = "";
        if (GameServer.online_clients.length <= 10) {
            list = list + "there is/are ";
            GameServer.online_clients.forEach((client) => {
                list = list + "  " + client.player_name + " ";
            })
            list = list + " online!";
        } else {
            list = list + " there is/are " + GameServer.online_clients.length + " player/s online!";
        }
        IO.send("chat", list, player.socketID, true);
    },
    help(player) {
        IO.send("chat", "The helpsection is COMMING SOON!", player.socketID, true);
    },
    look_room(player) {
        let room = GameServer.map.get_room_by_id(player.room_id);
        IO.send("chat", "" + room.discribtion, player.socketID, true);
    },
    executer(command, player_id) {
        let player = GameServer.find_player_by_id(player_id);
        IO.send("chat", "> " + command, player.socketID, false)
        let command2 = command.split(" ");
        let valid_command = false;
        let room = GameServer.map.get_room_by_id(player.room_id);
        room.commands(player, command2);
        if (command2[0] == "ping") {
            this.ping(player);
            valid_command = true;
        }
        if (command2[0] == "players_list") {
            this.players_list(player);
            valid_command = true;
        }
        if (command2[0] == "help") {
            this.help(player);
            valid_command = true;
        }
        if (command2[0] == "look") {
            this.look_room(player);
            valid_command = true;
        }
    }
};
module.exports = commands;