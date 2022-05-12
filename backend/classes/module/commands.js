const GameServer = require("./GameServer.js");
const IO = require("./IO.js");
commands = {
    ping(player) {
        IO.send("chat", "< pong", player.id);
    },
    players_list(player) {
        let list = "< ";
        if (GameServer.online_clients.length <= 10) {
            list = list + "there is/are ";
            GameServer.online_clients.forEach((client) => {
                list = list + " " + client.player_name;
            })
            list = list + " online!";
        } else {
            list = list + " there is/are " + GameServer.online_clients.length + " player/s online!";
        }
        IO.send("chat", list, player.id);
    },
    help(player) {
        IO.send("chat", "The helpsection is COMMING SOON!", player.id);
    },
    executer(command, player_id) {
        IO.send("chat", "> " + command, player_id)
        let player = GameServer.find_player_by_id(player_id);
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
        if (valid_command == false) {
            IO.send("chat", "> Your command is not listed! Write 'help' for more information.", player.id);
        }

    }
};
module.exports = commands;