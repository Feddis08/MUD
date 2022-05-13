const { is } = require("express/lib/request");
const GameServer = require("./GameServer.js");
const IO = require("./IO.js");
commands = {
    ping(player) {
        IO.send("chat", "< pong", player.socketID);
    },
    players_list(player) {
        let list = "< ";
        if (GameServer.online_clients.length <= 10) {
            list = list + "there is/are ";
            GameServer.online_clients.forEach((client) => {
                list = list + "  " + client.player_name + " ";
            })
            list = list + " online!";
        } else {
            list = list + " there is/are " + GameServer.online_clients.length + " player/s online!";
        }
        IO.send("chat", list, player.socketID);
    },
    help(player) {
        IO.send("chat", "The helpsection is COMMING SOON!", player.socketID);
    },
    move_room(player, command) {
        let room = GameServer.map.get_room_by_id(player.room_id);
        let is_link = false;
        let room_id = player.room_id;
        room.ways.forEach((way, index) => {
            if (is_link) {
                is_link = false;
                if (command[1] == way) {
                    room_id = room.ways[index];
                    console.log(way, command[1], room_id, index)
                }
            } else {
                is_link = true;
            }
        })
        player.room_id = room_id;
    },
    look_room(player) {
        let room = GameServer.map.get_room_by_id(player.room_id);
        IO.send("chat", "< " + room.name, player.socketID);
        IO.send("chat", "< " + room.discribtion, player.socketID);
    },
    executer(command, player_id) {
        let player = GameServer.find_player_by_id(player_id);
        IO.send("chat", "> " + command, player.socketID)
        let command2 = command.split(" ");
        let valid_command = false;
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
        if (command2[0] == "move") {
            this.move_room(player, command2);
            valid_command = true;
        }
        if (command2[0] == "look") {
            this.look_room(player);
            valid_command = true;
        }
        if (valid_command == false) {
            IO.send("chat", "> Your command is not listed! Write 'help' for more information.", player.id);
        }

    }
};
module.exports = commands;